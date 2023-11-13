from flask import Blueprint, jsonify, request
from app import db, bcrypt
from app.models import User, Task
from flask_login import login_user, current_user, logout_user, login_required

main = Blueprint("main", __name__)


@main.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"message": "Username already taken"}), 409

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


@main.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.check_password_hash(user.get_password(), password):
        return jsonify({"message": "Invalid username or password"}), 401

    login_user(user)
    return jsonify({"id": user.id, "username": user.username}), 200

@main.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return "Successfully logged out!", 200


@main.route("/")
def home():
    return jsonify({"message": "Welcome to EasyTasker!"})


@main.route("/users")
def users():
    users_list = [
        {"id": user.id, "username": user.username}
        for user in User.query.all()
    ]
    return jsonify(users_list)

@main.route("/all-tasks", methods=["GET"])
def get_all_tasks():
    tasks = Task.query.all()
    tasks_list = [
        {"id": task.id, "title": task.title, "description": task.description, "is_completed": task.is_completed}
        for task in tasks
    ]
    return jsonify(tasks_list)


def get_all_tasks_and_subtasks(user_id):
    tasks = Task.query.filter_by(user_id=user_id, parent_id=None).all()
    tasks_with_subtasks = []

    for task in tasks:
        task_data = {
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'date_created': task.date_created,
            'is_completed': task.is_completed,
            'sub_tasks': get_subtasks(task)
        }
        tasks_with_subtasks.append(task_data)

    return tasks_with_subtasks

# Define a recursive function to get subtasks of a task
def get_subtasks(task):
    subtasks = task.sub_tasks
    subtask_data = []

    for subtask in subtasks:
        subtask_data.append({
            'id': subtask.id,
            'title': subtask.title,
            'description': subtask.description,
            'date_created': subtask.date_created,
            'is_completed': subtask.is_completed,
            'sub_tasks': get_subtasks(subtask)
        })

    return subtask_data


@main.route("/tasks", methods=["GET"])
@login_required
def get_tasks():
    tasks = get_all_tasks_and_subtasks(current_user.id)
    return jsonify(tasks)

@main.route("/tasks", methods=["POST"])
@login_required
def create_task():
    data = request.json
    new_task = Task(
        title=data["title"],
        description=data["description"],
        user_id=current_user.id,
        parent_id=data.get('parentId', None),
    )
    db.session.add(new_task)
    db.session.commit()
    return (
        jsonify(
            {
                "id": new_task.id,
                "title": new_task.title,
                "description": new_task.description,
                "is_completed": new_task.is_completed,
            }
        ),
        201,
    )


@main.route("/tasks/<int:task_id>", methods=["PUT"])
@login_required
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    if task.user_id != current_user.id:
        return jsonify({"message": "Permission denied"}), 403
    data = request.get_json()
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.is_completed = data.get("is_completed", task.is_completed)
    db.session.commit()
    return jsonify(
        {"id": task.id, "title": task.title, "description": task.description, "is_completed": task.is_completed}
    )


@main.route("/tasks/<int:task_id>", methods=["DELETE"])
@login_required
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    if task.user_id != current_user.id:
        return jsonify({"message": "Permission denied"}), 403
    db.session.delete(task)
    db.session.commit()
    return "", 204


@main.route("/get-current-user", methods=["GET"])
@login_required
def get_current_user():
    return jsonify({"user": {"id": current_user.id, "username": current_user.username}})
