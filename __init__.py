from . import views
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY", default="dev"),
        SQLALCHEMY_DATABASE_URI=os.environ.get("DATABASE_URL", default="sqlite:///db.sqlite3"),
    )

    db.init_app(app)
    with app.app_context():
        db.create_all()

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(test_config)
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(views.views, url_prefix="/")

    return app
