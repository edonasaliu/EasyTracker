import unittest
from app import create_app, db
from app.models import User, Task


class TestModels(unittest.TestCase):
    def setUp(self):
        self.app = create_app("testing")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()
            user = User(username="testuser", email="testuser@example.com")
            db.session.add(user)
            db.session.commit()
            task1 = Task(
                title="Task 1",
                description="Description 1",
                is_completed=False,
                user_id=user.id,
            )
            task2 = Task(
                title="Task 2",
                description="Description 2",
                is_completed=True,
                user_id=user.id,
            )
            task3 = Task(
                title="Task 3",
                description="Description 3",
                is_completed=False,
                user_id=user.id,
                parent_id=task1.id,
            )
            db.session.add_all([task1, task2, task3])
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_task_repr(self):
        task = Task(title="Test Task", date_created=datetime.utcnow())
        self.assertEqual(str(task), "Task('Test Task', 'datetime.datetime(...)')")

    def test_task_sub_tasks(self):
        task1 = Task.query.filter_by(title="Task 1").first()
        task3 = Task.query.filter_by(title="Task 3").first()
        self.assertEqual(task1.sub_tasks, [task3])
        self.assertEqual(task3.parent, task1)def test_task_creation(self):
    task = Task(
        title="New Task",
        description="New Description",
        is_completed=False,
        user_id=1,
    )
    db.session.add(task)
    db.session.commit()
    self.assertEqual(task.title, "New Task")
    self.assertEqual(task.description, "New Description")
    self.assertFalse(task.is_completed)
    self.assertEqual(task.user_id, 1)

def test_task_update(self):
    task = Task.query.filter_by(title="Task 1").first()
    task.title = "Updated Task"
    task.description = "Updated Description"
    task.is_completed = True
    db.session.commit()
    updated_task = Task.query.filter_by(title="Updated Task").first()
    self.assertEqual(updated_task.title, "Updated Task")
    self.assertEqual(updated_task.description, "Updated Description")
    self.assertTrue(updated_task.is_completed)

def test_task_deletion(self):
    task = Task.query.filter_by(title="Task 2").first()
    db.session.delete(task)
    db.session.commit()
    deleted_task = Task.query.filter_by(title="Task 2").first()
    self.assertIsNone(deleted_task)

def test_task_parent(self):
    task1 = Task.query.filter_by(title="Task 1").first()
    task2 = Task.query.filter_by(title="Task 2").first()
    task3 = Task.query.filter_by(title="Task 3").first()
    self.assertIsNone(task1.parent)
    self.assertIsNone(task2.parent)
    self.assertEqual(task3.parent, task1)
    self.assertEqual(task1.sub_tasks, [task3])