from datetime import datetime
from app import db, login_manager, bcrypt
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    tasks = db.relationship("Task", backref="author", lazy=True)

    # Method to set the user's password securely
    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

    # Method to retrieve the user's password hash
    def get_password(self):
        return self.password



@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    is_completed = db.Column(db.Boolean, default=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("task.id"), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    sub_tasks = db.relationship(
        "Task", backref=db.backref("parent", remote_side=[id]), lazy=True
    )

    def __repr__(self):
        return f"Task('{self.title}', '{self.date_created}')"
