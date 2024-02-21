from app import app
from sec import datastore
from model import db, User, Role
from flask_security import hash_password
from werkzeug.security import generate_password_hash


with app.app_context():
    db.create_all()
    datastore.find_or_create_role(name="Admin", description="user is Admin")
    datastore.find_or_create_role(name="Creator", description="user is Creator")
    db.session.commit()
    if not datastore.find_user(email="admin@gmail.com"):
        datastore.create_user(
            username="admin",
            email="admin@gmail.com",
            password= generate_password_hash("admin"),
            roles=["Admin"])
    if not datastore.find_user(email="Creator@gmail.com"):
        datastore.create_user(
            username="Creator",
            email="Creator@gmail.com",
            password=generate_password_hash("Creator"),
            roles=["Creator"])
    db.session.commit()


