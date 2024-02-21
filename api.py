from flask_restful import Resource, Api, fields, marshal_with, reqparse
from model import *
from werkzeug.exceptions import HTTPException
from flask_cors import CORS
import json
from flask import make_response
from flask_security import auth_required, roles_required
import os
from functools import wraps
from flask import abort
from flask_security import roles_accepted

api = Api()

def any_role_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            if not roles_accepted(*roles):
                abort(403, description="Insufficient permissions")
            return fn(*args, **kwargs)
        return decorator
    return wrapper


#==============================output fields========================================


#====================Create request pares=======================================





#====================Update request pares=======================================






