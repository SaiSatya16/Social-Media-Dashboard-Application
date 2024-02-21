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


#==========================Validation========================================================
class NotFoundError(HTTPException):
    def __init__(self,status_code):
        message = {"error_code":"BE1009","error_message":"Not Found"}
        self.response = make_response(json.dumps(message), status_code)

class BusinessValidationError(HTTPException):
    def __init__(self, status_code, error_code, error_message):
        message = {"error_code":error_code,"error_message":error_message}
        self.response = make_response(json.dumps(message), status_code)


#==============================output fields========================================
post_fields = {
    'id': fields.Integer,
    'title': fields.String,
    'content': fields.String,
    'user_id': fields.Integer,
    'created_at': fields.String,
    'updated_at': fields.String,
    'image': fields.String
}

analytics_fields = {
    'id': fields.Integer,
    'post_id': fields.Integer,
    'likes': fields.Integer,
    'dislikes': fields.Integer,
    'comment': fields.String,
    'shares': fields.Integer,
    'created_at': fields.String,
    'updated_at': fields.String,
    'user_id': fields.Integer
}

#====================Create request pares=======================================

create_post_parser = reqparse.RequestParser()
create_post_parser.add_argument('title')
create_post_parser.add_argument('content')
create_post_parser.add_argument('user_id')
create_post_parser.add_argument('created_at')
create_post_parser.add_argument('updated_at')
create_post_parser.add_argument('image')

create_analytics_parser = reqparse.RequestParser()
create_analytics_parser.add_argument('post_id')
create_analytics_parser.add_argument('like')
create_analytics_parser.add_argument('comment')
create_analytics_parser.add_argument('shares')
create_analytics_parser.add_argument('created_at')
create_analytics_parser.add_argument('updated_at')
create_analytics_parser.add_argument('user_id')
#====================Update request pares=======================================
update_post_parser = reqparse.RequestParser()
update_post_parser.add_argument('title')
update_post_parser.add_argument('content')
update_post_parser.add_argument('user_id')
update_post_parser.add_argument('created_at')
update_post_parser.add_argument('updated_at')
update_post_parser.add_argument('image')

update_analytics_parser = reqparse.RequestParser()
update_analytics_parser.add_argument('post_id')
update_analytics_parser.add_argument('like')
update_analytics_parser.add_argument('comment')
update_analytics_parser.add_argument('shares')
update_analytics_parser.add_argument('created_at')
update_analytics_parser.add_argument('updated_at')
update_analytics_parser.add_argument('user_id')


#==============================API========================================
class UserAPI(Resource):
    def get(self):
        data = []
        users = User.query.all()
        if users is None:
            raise NotFoundError(status_code=404)
        for user in users:
            posts = []
            for post in user.posts:
                posts.append({"id":post.id,"title":post.title,"content":post.content,"user_id":post.user_id,"created_at":post.created_at,"updated_at":post.updated_at})
            data.append({"id":user.id,"username":user.username,"email":user.email,"active":user.active,"posts":posts})
        return data



class PostAPI(Resource):
    @marshal_with(post_fields)
    def get(self):
        data = []
        posts = Post.query.all()
        if posts is None:
            raise NotFoundError(status_code=404)
        for post in posts:
            analytics = []
            for analytic in post.analytics:
                analytics.append({"id":analytic.id,"post_id":analytic.post_id,"likes":analytic.likes,"dislikes":analytic.dislikes,"comment":analytic.comment,"shares":analytic.shares,"created_at":analytic.created_at,"updated_at":analytic.updated_at,"user_id":analytic.user_id})
            data.append({"id":post.id,"title":post.title,"content":post.content,"user_id":post.user_id,"created_at":post.created_at,"updated_at":post.updated_at, "analytics":analytics})
        return data
            

    @marshal_with(post_fields)
    def post(self):
        args = create_post_parser.parse_args()
        title = args.get('title', None)
        content = args.get('content', None)
        user_id =   args.get('user_id', None)
        created_at = args.get('created_at', None)
        updated_at = args.get('updated_at', None)
        if title is None:
            raise BusinessValidationError(status_code=400, error_code="BE1001", error_message="Title is required")
        if content is None:
            raise BusinessValidationError(status_code=400, error_code="BE1002", error_message="Content is required")
        
        post = Post(title=title, content=content, user_id=user_id, created_at=created_at, updated_at=updated_at)
        db.session.add(post)
        db.session.commit()
        p = Post.query.filter_by(title=title, content=content, user_id=user_id, created_at=created_at, updated_at=updated_at).first()
        pid = p.id
        asso = user_post_association(user_id=user_id, post_id=pid)
        db.session.add(asso)
        db.session.commit()
        return post, 201
    
    @marshal_with(post_fields)
    def put(self, id):
        args = update_post_parser.parse_args()
        title = args.get('title', None)
        content = args.get('content', None)
        user_id =   args.get('user_id', None)
        created_at = args.get('created_at', None)
        updated_at = args.get('updated_at', None)
        if title is None:
            raise BusinessValidationError(status_code=400, error_code="BE1001", error_message="Title is required")
        if content is None:
            raise BusinessValidationError(status_code=400, error_code="BE1002", error_message="Content is required")
        
        post = Post.query.filter_by(id=id).first()
        if post is None:
            raise NotFoundError(status_code=404)
        Post.query.filter_by(id=id).update({"title":title, "content":content, "user_id":user_id, "created_at":created_at, "updated_at":updated_at})
        db.session.commit()
        return post, 201
    
    @marshal_with(post_fields)
    def delete(self, id):
        post = Post.query.filter_by(id=id)
        if post:
            db.session.query(post_analytics_association).filter_by(post_id=id).delete()
            db.session.query(Analytics).filter_by(post_id=id).delete()
            db.session.delete(post)
            db.session.commit()

            return "Post deleted successfully", 204
        else:
            raise NotFoundError(status_code=404)
    
class AnalyticsAPI(Resource):
    @marshal_with(analytics_fields)
    def get(self):
        data = []
        analytics = Analytics.query.all()
        if analytics is None:
            raise NotFoundError(status_code=404)
        for analytic in analytics:
            data.append({"id":analytic.id,"post_id":analytic.post_id,"likes":analytic.likes,"dislikes":analytic.dislikes,"comment":analytic.comment,"shares":analytic.shares,"created_at":analytic.created_at,"updated_at":analytic.updated_at,"user_id":analytic.user_id})
        return data

    @marshal_with(analytics_fields)
    def post(self, id):
        args = create_analytics_parser.parse_args()
        post_id = id
        like = args.get('like', None)
        comment = args.get('comment', None)
        shares = args.get('shares', None)
        created_at = args.get('created_at', None)
        updated_at = args.get('updated_at', None)
        user_id = args.get('user_id', None)

        
        analytic = Analytics(post_id=post_id, like=like, comment=comment, shares=shares, created_at=created_at, updated_at=updated_at, user_id=user_id)
        db.session.add(analytic)
        db.session.commit()
        a = Analytics.query.filter_by(post_id=post_id, like=like, comment=comment, shares=shares, created_at=created_at, updated_at=updated_at, user_id=user_id).first()
        aid = a.id
        asso = post_analytics_association(post_id=post_id, analytics_id=aid)
        db.session.add(asso)
        db.session.commit()
        return analytic, 201
    
    @marshal_with(analytics_fields)
    def put(self, id):
        args = update_analytics_parser.parse_args()
        post_id = id
        like = args.get('like', None)
        comment = args.get('comment', None)
        shares = args.get('shares', None)
        created_at = args.get('created_at', None)
        updated_at = args.get('updated_at', None)
        user_id = args.get('user_id', None)

        analytic = Analytics.query.filter_by(post_id=post_id).first()
        if analytic is None:
            raise NotFoundError(status_code=404)
        Analytics.query.filter_by(post_id=post_id).update({"like":like, "comment":comment, "shares":shares, "created_at":created_at, "updated_at":updated_at, "user_id":user_id})
        db.session.commit()
        return analytic, 201
    



api.add_resource(UserAPI, '/users')
api.add_resource(PostAPI, '/posts', '/posts/<int:id>')
api.add_resource(AnalyticsAPI, '/analytics', '/analytics/<int:id>')


       

        
    










