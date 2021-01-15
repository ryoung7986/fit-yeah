from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Workout, Workout_Plan, \
    User_Post, User_Stat
from sqlalchemy import update
import json

user_routes = Blueprint('users', __name__)


# fetch all users
@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


# fetch user by id
@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# add post like to user
@user_routes.route('/<int:id>/<int:postId>', methods=['PATCH'])
def post_like(id, postId):
    data = json.loads(request.data)
    user = User.query.get(data['userId'])
    post = User_Post.query.get(data['postId'])
    post.liked_by.append(user)
    db.session.add(post)
    db.session.commit()
    return post.to_dict_full()


# fetch user following
@user_routes.route('/<int:id>/following')
# @login_required
def user_following(id):
    user = User.query.get(id)
    following = [leader.to_dict() for leader in user.following]
    return {"following": following}


# fetch user followers
@user_routes.route('/<int:id>/followers')
# @login_required
def user_followers(id):
    user = User.query.get(id)
    followers = [follower.to_dict() for follower in user.followers]
    return {"followers": followers}


# fetch user stats
@user_routes.route('/<int:id>/stats')
# @login_required
def user_stats(id):
    stat = [stats.to_dict()
            for stats in User_Stat.query.all() if stats.user_id == id]
    return {"stats": stat}


# @user_routes.route('/<int:id>', methods=["POST"])
# @login_required
# def new_follow(id):
#     form = FollowForm()
#     follower = User.query.get(form.data['follower_id'])
#     leader = User.query.get(id)
#     # if form.validate_on_submit():
#     if follower in leader.followers:
#         leader.followers.remove(follower)
#         db.session.commit()
#         # follow = db.session.query('followers').filter(
#         #     followers.c.follower_id == follower.id).filter(
#         #         followers.c.leader_id == leader.id)
#         return leader.to_dict_full()
#     else:
#         leader.followers.append(follower)
#         db.session.commit()
#         # follow = Followers.query.filter(Followers.leader_id == id).filter(
#         #     Followers.follower_id == follower.id).first()
#         # follow.set_color_ = 'red'
#         return leader.to_dict_full()
#         # return follower.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}
