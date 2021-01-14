from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import PostForm
from app.models import db, User, Workout, Workout_Plan, \
    User_Post, User_Stat
from .auth_routes import validation_errors_to_error_messages
import json

post_routes = Blueprint('posts', __name__)


# fetch all posts
@post_routes.route('/')
def all_posts():
    posts = [post.to_dict() for post in User_Post.query.all()]
    return {"posts": posts}


# fetch all posts by user, and users they're following
@post_routes.route('/<int:id>')
# @login_required
def user_posts(id):
    user = User.query.get(id)
    following = [leader.id for leader in user.following]
    following_posts = [post.to_dict() for post in User_Post.query.all()
                       if post.user_id in following]
    user_posts = [post.to_dict() for post in User_Post.query.all()
                  if post.user_id == id]
    posts = following_posts + user_posts
    return {"posts": posts}


# fetch user by post.user_id
@post_routes.route('/<int:id>/user')
def post_owner(id):
    post = User_Post.query.get(id)
    user = User.query.get(post.user_id)
    return user.to_dict()


# make new post
@post_routes.route('/new', methods=['POST'])
# @login_required
def new_post():
    form = PostForm()
    # print(request.files.get('user_id'))
    # form['csrf_token'].data = request.cookie['csrf_token']
    print('before validation')
    if form.validate_on_submit():
        print('after validation')
        post = User_Post(
            user_id=form.data['user_id'],
            description=form.data['description'],
            img_url=form.data['img_url'],
            video_url=form.data['video_url'],
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
