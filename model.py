from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()


class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)
    roles = db.relationship('Role', secondary='roles_users',
                            backref=db.backref('users', lazy='dynamic'))
    posts = db.relationship('Post', backref='author', secondary='user_post_association')


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.String(100), nullable=False)
    updated_at = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100))
    analytics = db.relationship('Analytics', backref='post', secondary='post_analytics_association')

class Analytics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    comment = db.Column(db.Text)
    shares = db.Column(db.Integer)
    created_at = db.Column(db.String(100), nullable=False)
    updated_at = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class user_post_association(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),primary_key = True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'),primary_key = True, nullable=False)

class post_analytics_association(db.Model):
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'),primary_key = True, nullable=False)
    analytics_id = db.Column(db.Integer, db.ForeignKey('analytics.id'),primary_key = True, nullable=False)


   

