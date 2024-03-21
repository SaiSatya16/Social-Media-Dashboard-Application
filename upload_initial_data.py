# from app import app
# from sec import datastore
# from model import db, User, Role
# from flask_security import hash_password
# from werkzeug.security import generate_password_hash


# with app.app_context():
#     db.create_all()
#     datastore.find_or_create_role(name="Admin", description="user is Admin")
#     datastore.find_or_create_role(name="Creator", description="user is Creator")
#     db.session.commit()
#     if not datastore.find_user(email="admin@gmail.com"):
#         datastore.create_user(
#             username="admin",
#             email="admin@gmail.com",
#             password= generate_password_hash("admin"),
#             roles=["Admin"])
#     if not datastore.find_user(email="Creator@gmail.com"):
#         datastore.create_user(
#             username="Creator",
#             email="Creator@gmail.com",
#             password=generate_password_hash("Creator"),
#             roles=["Creator"])
    
#     db.session.commit()

from app import app
from sec import datastore
from model import db, User, Role, Post
from flask_security import hash_password
from werkzeug.security import generate_password_hash
from datetime import datetime

with app.app_context():
    # Create tables if they don't exist
    db.create_all()

    # Create roles if they don't exist
    datastore.find_or_create_role(name="Admin", description="user is Admin")
    datastore.find_or_create_role(name="Creator", description="user is Creator")

    db.session.commit()

    if not datastore.find_user(email="admin@gmail.com"):
        datastore.create_user(
            username="admin",
            email="admin@gmail.com",
            password= generate_password_hash("admin"),
            roles=["Admin"])

    # Real-world user data
    users_data = [
        {"username": "Sai", "email": "sai@mail.com", "password": "sai", "description": "Full Stack Developer", "image": "/static/uploads/2_user_image.jpeg"},

        # Add more users as needed
    ]

    for user_data in users_data:
        username = user_data["username"]
        email = user_data["email"]
        password = generate_password_hash(user_data["password"])
        description = user_data["description"]
        image = user_data["image"]

        # Check if the user already exists
        if not datastore.find_user(email=email):
            # Create the user with the role "Creator"
            user = datastore.create_user(
                username=username,
                email=email,
                password=password,
                roles=["Creator"],
                description=description,
                image=image
            )

            # Real-world posts data
            posts_data = [
                {"title": "Introduction", "content": "Hello, this is my first post! I'm excited to start blogging. I will be sharing my thoughts on technology, my hobbies, and travel adventures. I hope you enjoy reading my posts!", "image": "/static/uploads/1_post_image.jpeg"},
                {"title": " My Portfolio", "content": "I'm a software engineer with a passion for web development. I have experience working with Python, Flask, JavaScript, React, and more. I'm currently looking for new opportunities. Feel free to reach out to me if you have any questions or would like to collaborate.", "image": "/static/uploads/2_post_image.jpeg"},
                {"title": "My Hobbies", "content": "I enjoy playing the guitar, reading books, and going for long walks. I find these activities to be relaxing and a great way to unwind after a long day of work. I'm always looking for new books to read and songs to learn on the guitar. If you have any recommendations, let me know!", "image": "/static/uploads/3_post_image.jpeg"},
                # Add more posts as needed
            ]

            # Create posts for each user
            for post_data in posts_data:
                title = post_data["title"]
                content = post_data["content"]
                created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                image = post_data["image"]

                post = Post(
                    title=title,
                    content=content,
                    user_id= User.query.filter_by(email=email).first().id,
                    created_at=created_at,
                    image=image
                )

                db.session.add(post)

    db.session.commit()
