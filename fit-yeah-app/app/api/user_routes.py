from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Workout, Workout_Plan, \
    User_Post, User_Stat
from app.forms import UserStatsForm
from sqlalchemy import update
from .auth_routes import validation_errors_to_error_messages
import json

user_routes = Blueprint('users', __name__)


# fetch all users
@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict_full() for user in users]}


# fetch user by id
@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict_full()


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
    following = [leader.to_dict_full() for leader in user.following]
    return {"following": following}


# fetch user followers
@user_routes.route('/<int:id>/followers')
# @login_required
def user_followers(id):
    user = User.query.get(id)
    followers = [follower.to_dict_full() for follower in user.followers]
    return {"followers": followers}


# fetch user stats
@user_routes.route('/<int:id>/stats')
# @login_required
def user_stats(id):
    stat = [stats.to_dict()
            for stats in User_Stat.query.all() if stats.user_id == id]
    return {"stats": stat}


# post user profile picture
@user_routes.route('/upload-avatar/<int:userId>', methods=['POST'])
def upload_avatar(userId):
    data = json.loads(request.data)
    imgUrl = data['imgUrl']
    user = User.query.get(userId)
    user.avatar_url = imgUrl
    db.session.add(user)
    db.session.commit()
    return user.to_dict_full()


# post user bio
@user_routes.route('upload-bio/<int:userId>', methods=['POST'])
def upload_bio(userId):
    data = json.loads(request.data)
    bio = data['bio']
    user = User.query.get(userId)
    user.bio = bio
    db.session.add(user)
    db.session.commit()
    return {"user": user.to_dict_full()}


# fetch user bio
@user_routes.route('/<int:id>/bio')
# @login_required
def user_bio(id):
    user = User.query.get(id)
    dictUser = user.to_dict_full()
    return {'bio': dictUser['bio']}


# follow user
@user_routes.route('/follow/<int:userId>/<int:id>', methods=['PATCH'])
def follow_user(userId, id):
    user = User.query.get(userId)
    userToFollow = User.query.get(id)
    user.following.append(userToFollow)
    db.session.add(user)
    db.session.commit()
    return user.to_dict_full()


# unfollow user
@user_routes.route('/unfollow/<int:userId>/<int:id>', methods=['PATCH'])
def unfollow_user(userId, id):
    user = User.query.get(userId)
    userToUnfollow = User.query.get(id)
    user.following.remove(userToUnfollow)
    db.session.add(user)
    db.session.commit()
    return user.to_dict_full()


# upload user stats
@user_routes.route('/upload-stats', methods=['POST'])
def upload_stats():
    form = UserStatsForm()
    print("HERRO")
    print(form.data)
    print("HERRRRRROOOOOO")
    if form.validate_on_submit():
        print("HERRO THERE")
        print(form.data['sets'])
        stat = User_Stat(
            user_id=form.data['user_id'],
            exercise_id=form.data['exercise_id'],
            sets=form.data['sets'],
            reps=form.data['reps'],
            weight_lbs=form.data['weight_lbs'],
            duration_min=form.data['duration_min'],
            distance_mi=form.data['distance_mi'],
        )
        db.session.add(stat)
        db.session.commit()
        return stat.to_dict()


# add points to user
@user_routes.route('/add-points', methods=['PATCH'])
def add_points():
    data = json.loads(request.data)
    user = User.query.get(data['user_id'])
    user.points_earned += data['pointsToSubmit']
    db.session.add(user)
    db.session.commit()
    return user.to_dict_full()
