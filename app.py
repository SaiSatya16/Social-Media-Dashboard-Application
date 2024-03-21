from flask import Flask, render_template ,request,redirect, url_for, jsonify
from model import *
import os
from api import *
from flask_cors import CORS
from config import DevelopmentConfig
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_security import auth_required, roles_required, current_user
from werkzeug.security import check_password_hash, generate_password_hash
from flask_restful import marshal, fields
from sec import datastore
from PIL import Image
from sqlalchemy.orm.exc import NoResultFound
from flask_socketio import SocketIO, emit


#==============================configuration===============================
app = Flask(__name__)
socketio = SocketIO(app)
app.config.from_object(DevelopmentConfig)
api.init_app(app)
db.init_app(app)
CORS(app, resources={r"/socket.io/*": {"origins": "*"}})
app.security = Security(app, datastore)
app.app_context().push()

def get_user_roles():
    if current_user.is_authenticated:
        return [role.name for role in current_user.roles]  # Assuming roles have a 'name' attribute
    else:
        return []  # Return an empty list if the user is not authenticated or roles are not available

@app.route('/')
def index():
    return render_template('index.html')

@app.post('/user-login')
def user_login():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({"message": "email not provided"}), 400

    user = datastore.find_user(email=email)

    if not user:
        return jsonify({"message": "User Not Found"}), 404
    
    if not user.active:
        return jsonify({"message": "User Not Activated"}), 400
    

    if check_password_hash(user.password, data.get("password")):
        return jsonify({"token": user.get_auth_token(), "email": user.email, "role": user.roles[0].name, "username": user.username, "id": user.id})
    else:
        return jsonify({"message": "Wrong Password"}), 400
    
@app.post('/user-registration')
def user_registration():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    if not email:
        return jsonify({"message": "email not provided"}), 400
    if not password:
        return jsonify({"message": "password not provided"}), 400
    if not username:
        return jsonify({"message": "username not provided"}), 400
    if datastore.find_user(email=email):
        return jsonify({"message": "User Already Exists"}), 400
    else:
        datastore.create_user(
            username=username,
            email=email,
            password=generate_password_hash(password),
            roles=["Creator"])
        db.session.commit()
        return jsonify({"message": "User Created"}), 201


post_fields = {
    'id': fields.Integer,
    'title': fields.String,
    'content': fields.String,
    'user_id': fields.Integer,
    'created_at': fields.String,
    'updated_at': fields.String,
    'image': fields.String
}



@app.post('/posts')
@roles_required('Creator')
@auth_required('token')
def create_post():
    data = request.get_json()
    title = data.get('title', None)
    content = data.get('content', None)
    user_id = data.get('user_id', None)
    created_at = data.get('created_at', None)
    updated_at = data.get('updated_at', None)
    if not title:
        return jsonify({"message": "title not provided"}), 400
    if not content:
        return jsonify({"message": "content not provided"}), 400
    post = Post(title=title, content=content, user_id=user_id, created_at=created_at, updated_at=updated_at)
    db.session.add(post)
    db.session.commit()
    socketio.emit('newPostEntry', namespace='/Posts')

    data = marshal(post, post_fields)

    return jsonify(data), 201


@socketio.on('connect', namespace='/Posts')
def test_connect():
    print('Client connected')

@socketio.on('disconnect', namespace='/Posts')
def test_disconnect():
    print('Client disconnected')

if __name__ == "__main__":
    socketio.run(app, debug=True)
