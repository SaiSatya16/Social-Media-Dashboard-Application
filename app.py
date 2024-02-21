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


#==============================configuration===============================
app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
api.init_app(app)
db.init_app(app)
app.security = Security(app, datastore)
app.app_context().push()


if __name__ == "__main__":
    app.run(debug=True)
