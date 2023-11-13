from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt  # Import Bcrypt
from flask_login import LoginManager
from flask_migrate import Migrate
import os

db = SQLAlchemy()
bcrypt = Bcrypt()  # Initialize Bcrypt

login_manager = LoginManager()


def create_app():
    app = Flask(__name__)

    CORS(app, supports_credentials=True)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "123456"  # Replace with your actual secret key
    db.init_app(app)

    # Initialize Bcrypt with the app
    bcrypt.init_app(app)

    login_manager.init_app(app)

    from .routes import main

    app.register_blueprint(main)

    with app.app_context():
        db.create_all()

    return app
