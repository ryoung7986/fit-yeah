from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Workout, Workout_Plan, User_Post, User_Stat

workout_routes = Blueprint('workouts', __name__)


# fetch all workouts
@workout_routes.route('/')
def workouts():
    workouts = Workout.query.all()
    return {"workouts": [workout.to_dict() for workout in workouts]}


# fetch all workouts created by user
@workout_routes.route('/<int:id>')
# @login_required
def user_workouts(id):
    workouts = Workout.query.filter(Workout.user_id == id)
    return {"workouts": [workout.to_dict() for workout in workouts]}


# fetch user workout plan
@workout_routes.route('/<int:id>/plan')
# @login_required
def user_workout_plan(id):
    user_plan = Workout_Plan.query.filter(Workout_Plan.user_id == id)
    return {"workout_plan": [plan.to_dict() for plan in user_plan]}
