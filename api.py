from flask_restful import Resource, Api, fields, marshal_with, reqparse
from model import *
from werkzeug.exceptions import HTTPException
from flask_cors import CORS
import json
from flask import make_response
from flask_security import auth_required, roles_required
import os
from functools import wraps
from flask import abort, request
from flask_security import roles_accepted
from sqlalchemy.exc import IntegrityError
from PIL import Image
import io

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

def resize_image(input_path, output_path, scale_percent=20, quality=90, dpi=72):
    # Open the image
    original_image = Image.open(input_path)

    # Calculate new dimensions
    width, height = original_image.size
    new_width = int(width * scale_percent / 100)
    new_height = int(height * scale_percent / 100)

    # Resize the image
    resized_image = original_image.resize((new_width, new_height), Image.ANTIALIAS)

    # Set the DPI
    resized_image.info['dpi'] = (dpi, dpi)

    # Save the resized image with the specified quality
    resized_image.save(output_path, quality=quality)


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
    'like': fields.Integer,
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

like_parser = reqparse.RequestParser()
like_parser.add_argument('like')
like_parser.add_argument('user_id')
like_parser.add_argument('created_at')

comment_parser = reqparse.RequestParser()
comment_parser.add_argument('comment')
comment_parser.add_argument('user_id')
comment_parser.add_argument('created_at')

update_user_parser = reqparse.RequestParser()
update_user_parser.add_argument('username')
update_user_parser.add_argument('description')






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
    
    @roles_required('Creator')
    @auth_required('token')
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user is None:
            raise NotFoundError(status_code=404)
        return {"id": user.id, "name": user.username, "description": user.description, "image": user.image}

    @roles_required('Creator')
    @auth_required('token')
    def put(self, id):
        args = update_user_parser.parse_args()
        username = args.get('username', None)
        description = args.get('description', None)
        if username is None:
            raise BusinessValidationError(status_code=400, error_code="BE1001", error_message="Username is required")
        if description is None:
            raise BusinessValidationError(status_code=400, error_code="BE1002", error_message="Description is required")
        
        user = User.query.filter_by(id=id).first()
        if user is None:
            raise NotFoundError(status_code=404)
        User.query.filter_by(id=id).update({"username":username, "description":description})
        db.session.commit()
        return {"id": user.id, "username": user.username, "description": user.description}, 201
    

class UserProfileAPI(Resource):
    @roles_required('Creator')
    @auth_required('token')
    def get(self, id):
        data = []
        user = User.query.filter_by(id=id).first()
        if user is None:
            raise NotFoundError(status_code=404)
        posts = Post.query.filter_by(user_id=id).order_by(Post.id.desc()).all()
        if not posts:
            return data
        for post in posts:
            analytics = []
            for analytic in post.analytics:
                user = User.query.filter_by(id=analytic.user_id).first()
                analytics.append({
                    "id": analytic.id,
                    "post_id": analytic.post_id,
                    "like": analytic.like,
                    "comment": analytic.comment,
                    "shares": analytic.shares,
                    "created_at": analytic.created_at,
                    "updated_at": analytic.updated_at,
                    "user_id": analytic.user_id,
                    "username": user.username
                    
                })
            
            data.append({
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "user_id": post.user_id,
                "created_at": post.created_at,
                "updated_at": post.updated_at,
                "analytics": analytics,
                "username": post.author.username,
                "image": post.image,
                "user_description": post.author.description,
                "user_image": post.author.image

            })

        return data

    @roles_required('Creator')
    @auth_required('token')    
    def post(self, id):
        if 'image' not in request.files:
            return {'error': 'No image uploaded'}, 400

        image_file = request.files['image']
        if image_file.filename == '':
            return {'error': 'No selected file'}, 400

        if image_file and allowed_file(image_file.filename):
            # Ensure the path exists
            upload_path = f'static/uploads/'
            if not os.path.exists(upload_path):
                os.makedirs(upload_path)

            image = Image.open(image_file)

            image_path = os.path.join(upload_path, f'{id}_user_image.{image.format.lower()}')

            image_buffer = io.BytesIO()
            image.save(image_buffer, format='JPEG')
            image_bytes = image_buffer.getvalue()

            if len(image_bytes) > 1000 * 1024:
                resize_image(image_file, image_path) 
                resized_image = Image.open(image_path)
            else:
                resized_image = image
            quality = 95  # Start with high quality
            while quality >= 70:  # Don't go below 10
                buffer = io.BytesIO()
                resized_image.save(buffer, format="JPEG", quality=quality)
                img_byte_arr = buffer.getvalue()
                if len(img_byte_arr) < 50 * 1024:  # Check if the size is less than 50KB
                    break
                quality -= 5 
            
            resized_image.save(image_path, quality=quality)


            
           
            user = User.query.filter_by(id=id).first()
            if user:
                user.image = image_path
                db.session.commit()
                return {'message': 'Image uploaded successfully'}, 200
            else:
                return {'error': 'User not found'}, 404
        else:
            return {'error': 'Invalid file format'}, 400
        
class AlluserAPI(Resource):
    @roles_required('Creator')
    @auth_required('token')
    def get(self):
        data = []
        #query only role of creator
        users = User.query.join(RolesUsers).join(Role).filter(Role.name == 'Creator').all()
        if not users:
            raise NotFoundError(status_code=404)
        for user in users:
            data.append({"id":user.id,"username":user.username,"email":user.email,"active":user.active,"description":user.description,"image":user.image})
        return data




class PostAPI(Resource):
    @auth_required('token')
    @roles_required("Creator")
    def get(self):
        data = []

        #query all posts order by id in descending order
        posts = Post.query.order_by(Post.id.desc()).all()
        if not posts:
            # Return an empty list if there are no posts
            return data

        for post in posts:
            analytics = []
            for analytic in post.analytics:
                user = User.query.filter_by(id=analytic.user_id).first()
                analytics.append({
                    "id": analytic.id,
                    "post_id": analytic.post_id,
                    "like": analytic.like,
                    "comment": analytic.comment,
                    "shares": analytic.shares,
                    "created_at": analytic.created_at,
                    "updated_at": analytic.updated_at,
                    "user_id": analytic.user_id,
                    "username": user.username,
                })
            
            
            

            data.append({
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "user_id": post.user_id,
                "created_at": post.created_at,
                "updated_at": post.updated_at,
                "analytics": analytics,
                "username": post.author.username,
                "image": post.image,
                "user_description": post.author.description,
                "user_image": post.author.image

            })

        return data
            

    # @marshal_with(post_fields)
    # @roles_required('Creator')
    # @auth_required('token')
    # def post(self):
    #     args = create_post_parser.parse_args()
    #     title = args.get('title', None)
    #     content = args.get('content', None)
    #     user_id =   args.get('user_id', None)
    #     created_at = args.get('created_at', None)
    #     updated_at = args.get('updated_at', None)
    #     if title is None:
    #         raise BusinessValidationError(status_code=400, error_code="BE1001", error_message="Title is required")
    #     if content is None:
    #         raise BusinessValidationError(status_code=400, error_code="BE1002", error_message="Content is required")
        
    #     post = Post(title=title, content=content, user_id=user_id, created_at=created_at, updated_at=updated_at)
    #     db.session.add(post)
    #     db.session.commit()
    #     return post, 201
    
    @marshal_with(post_fields)
    @roles_required('Creator')
    @auth_required('token')
    def put(self, id):
        args = update_post_parser.parse_args()
        title = args.get('title', None)
        content = args.get('content', None)
        if title is None:
            raise BusinessValidationError(status_code=400, error_code="BE1001", error_message="Title is required")
        if content is None:
            raise BusinessValidationError(status_code=400, error_code="BE1002", error_message="Content is required")
        
        post = Post.query.filter_by(id=id).first()
        if post is None:
            raise NotFoundError(status_code=404)
        Post.query.filter_by(id=id).update({"title":title, "content":content})
        db.session.commit()
        return post, 201
    
    @marshal_with(post_fields)
    @roles_required('Creator')
    @auth_required('token')
    def delete(self, id):
        ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif']  # Add more formats as needed
        deleted_formats = []
        for img_format in ALLOWED_IMAGE_FORMATS:
            img_path = f'static/uploads/{id}_post_image.{img_format}'
            if os.path.exists(img_path):
                os.remove(img_path)
                deleted_formats.append(img_format)
        if deleted_formats:
            post = Post.query.get(id)
            if post:
                db.session.query(post_analytics_association).filter_by(post_id=id).delete()
                db.session.query(Analytics).filter_by(post_id=id).delete()
                db.session.delete(post)
                db.session.commit()

                return "Post deleted successfully", 204
            else:
                raise NotFoundError(status_code=404)
        post = Post.query.get(id)
        if post:
            db.session.query(post_analytics_association).filter_by(post_id=id).delete()
            db.session.query(Analytics).filter_by(post_id=id).delete()
            db.session.delete(post)
            db.session.commit()

            return "Post deleted successfully", 204
        else:
            raise NotFoundError(status_code=404)
        

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
        
class PostimageAPI(Resource):
    @roles_required('Creator')
    @auth_required('token')
    def post(self, id):
        if 'image' not in request.files:
            return {'error': 'No image uploaded'}, 400

        image_file = request.files['image']
        if image_file.filename == '':
            return {'error': 'No selected file'}, 400

        if image_file and allowed_file(image_file.filename):
            # Ensure the path exists
            upload_path = f'static/uploads/'
            if not os.path.exists(upload_path):
                os.makedirs(upload_path)

            image = Image.open(image_file)
            # Save the image with the category ID as the name and in the correct format
            # image.save(f'{upload_path}/{id}_post_image.{image.format.lower()}')
            image_path = os.path.join(upload_path, f'{id}_post_image.{image.format.lower()}')

            image_buffer = io.BytesIO()
            image.save(image_buffer, format='JPEG')
            image_bytes = image_buffer.getvalue()

            if len(image_bytes) > 1000 * 1024:
                resize_image(image_file, image_path) 
                resized_image = Image.open(image_path)
            else:
                resized_image = image

            quality = 95  # Start with high quality
            while quality >= 70:  # Don't go below 10
                buffer = io.BytesIO()
                resized_image.save(buffer, format="JPEG", quality=quality)
                img_byte_arr = buffer.getvalue()
                if len(img_byte_arr) < 50 * 1024:  # Check if the size is less than 50KB
                    break
                quality -= 5 
            
            resized_image.save(image_path, quality=quality)

            # Update the database with the image path
            post = Post.query.filter_by(id=id).first()
            if post:
                post.image = image_path
                db.session.commit()
                return {'message': 'Image uploaded successfully'}, 200
            else:
                return {'error': 'Post not found'}, 404
        else:
            return {'error': 'Invalid file format'}, 400
        

   


    
class AnalyticsAPI(Resource):
    @marshal_with(analytics_fields)
    @roles_required('Creator')
    @auth_required('token')
    def get(self):
        data = []
        analytics = Analytics.query.all()
        if analytics is None:
            raise NotFoundError(status_code=404)
        for analytic in analytics:
            data.append({"id":analytic.id,"post_id":analytic.post_id,"likes":analytic.likes,"dislikes":analytic.dislikes,"comment":analytic.comment,"shares":analytic.shares,"created_at":analytic.created_at,"updated_at":analytic.updated_at,"user_id":analytic.user_id})
        return data



    @marshal_with(analytics_fields)
    @roles_required('Creator')
    @auth_required('token')
    def post(self, id):
        args = like_parser.parse_args()
        post_id = id
        like = args.get('like', None)
        if like is not None:
            like = like.lower() == 'true'
        created_at = args.get('created_at', None)
        updated_at = args.get('updated_at', None)
        user_id = args.get('user_id', None)

        # Check if a record with the given user_id and post_id already exists
        existing_analytic = Analytics.query.filter_by(post_id=post_id, user_id=user_id).first()

        if existing_analytic:
            # Update the existing record
            existing_analytic.like = like
            existing_analytic.created_at = created_at
            existing_analytic.updated_at = updated_at

            db.session.commit()

            # Return the updated analytic
            return existing_analytic, 200
        else:
            # Create a new record
            analytic = Analytics(post_id=post_id, like=like, created_at=created_at, updated_at=updated_at, user_id=user_id)

            try:
                db.session.add(analytic)
                db.session.commit()

                # Add association with post
                asso = post_analytics_association(post_id=post_id, analytics_id=analytic.id)
                db.session.add(asso)
                db.session.commit()

                return analytic, 201
            except IntegrityError:
                db.session.rollback()
                return {"message": "Integrity error occurred"}, 500
            


class PostCommentAPI(Resource):

    @marshal_with(analytics_fields)
    @roles_required('Creator')
    @auth_required('token')
    def post(self, id):
        args = comment_parser.parse_args()
        post_id = id
        comment = args.get('comment', None)
        created_at = args.get('created_at', None)
        user_id = args.get('user_id', None)

        # Check if a record with the given user_id and post_id already exists
        existing_analytic = Analytics.query.filter_by(post_id=post_id, user_id=user_id).first()

        if existing_analytic:
            # Update the existing record
            existing_analytic.comment = comment
            existing_analytic.created_at = created_at
            

            db.session.commit()

            # Return the updated analytic
            return existing_analytic, 200
        else:
            # Create a new record
            analytic = Analytics(post_id=post_id, comment=comment, created_at=created_at, user_id=user_id)

            try:
                db.session.add(analytic)
                db.session.commit()

                # Add association with post
                asso = post_analytics_association(post_id=post_id, analytics_id=analytic.id)
                db.session.add(asso)
                db.session.commit()

                return analytic, 201
            except IntegrityError:
                db.session.rollback()
                return {"message": "Integrity error occurred"}, 500
    
    
class RoleAPI(Resource):
    @roles_required('Creator')
    @auth_required('token')
    def get(self):
        data = []
        roles = Role.query.all()
        if not roles:
            raise NotFoundError(status_code=404)
        
        for role in roles:
            users = []
            for user in role.users:
                users.append({
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "active": user.active
                })
            data.append({
                "id": role.id,
                "name": role.name,
                "description": role.description,
                "users": users
            })

        return data
    



api.add_resource(PostAPI, '/posts', '/posts/<int:id>')
api.add_resource(AnalyticsAPI, '/analytics', '/analytics/<int:id>')
api.add_resource(RoleAPI, '/roles')
api.add_resource(PostCommentAPI, '/posts/<int:id>/comment')
api.add_resource(UserProfileAPI, '/profile/<int:id>',  '/profile/<int:id>/image')
api.add_resource(UserAPI, '/user/<int:id>')
api.add_resource(PostimageAPI, '/posts/<int:id>/image')
api.add_resource(AlluserAPI, '/users')

       

        
    










