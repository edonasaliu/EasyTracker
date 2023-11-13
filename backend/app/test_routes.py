import unittest
from app import create_app, db
from app.models import User, Task


class TestRoutes(unittest.TestCase):
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

    def test_get_tasks(self):
        response = self.client.get("/tasks")
        self.assertEqual(response.status_code, 200)
        tasks = response.json
        self.assertEqual(len(tasks), 2)
        self.assertEqual(tasks[0]["id"], 1)
        self.assertEqual(tasks[0]["title"], "Task 1")
        self.assertEqual(tasks[0]["description"], "Description 1")
        self.assertEqual(tasks[0]["is_completed"], False)
        self.assertEqual(len(tasks[0]["sub_tasks"]), 1)
        self.assertEqual(tasks[0]["sub_tasks"][0]["id"], 3)
        self.assertEqual(tasks[0]["sub_tasks"][0]["title"], "Task 3")
        self.assertEqual(tasks[0]["sub_tasks"][0]["description"], "Description 3")
        self.assertEqual(tasks[0]["sub_tasks"][0]["is_completed"], False)
        self.assertEqual(tasks[0]["sub_tasks"][0]["parent_id"], 1)
        self.assertEqual(tasks[1]["id"], 2)
        self.assertEqual(tasks[1]["title"], "Task 2")
        self.assertEqual(tasks[1]["description"], "Description 2")
        self.assertEqual(tasks[1]["is_completed"], True)
        self.assertEqual(len(tasks[1]["sub_tasks"]), 0)
