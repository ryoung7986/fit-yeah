from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import WorkoutForm
from app.models import (db, User, Workout, Workout_Plan, User_Post,
                        User_Stat, Exercise)
import json

workout_routes = Blueprint('workouts', __name__)


# fetch all workouts
@workout_routes.route('/')
def workouts():
    workouts = Workout.query.all()
    return {"workouts": [workout.to_dict_full() for workout in workouts]}


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


# append exercises to a workout
@workout_routes.route('/add-exercises', methods=['POST'])
def append_exercises():
    data = json.loads(request.data)
    workout = Workout.query.get(data['workout_id'])
    exercise = Exercise.query.get(data['exercise_id'])
    workout.exercises.append(exercise)
    db.session.add(workout)
    db.session.commit()
    return workout.to_dict_full()


# create workout
@workout_routes.route('/new', methods=['POST'])
def create_workout():
    form = WorkoutForm()
    print(form.data)
    if form.validate_on_submit():
        workout = Workout(
            user_id=form.data['user_id'],
            title=form.data['title'],
            subtitle=form.data['subtitle'],
            description=form.data['description']
        )
        db.session.add(workout)
        db.session.commit()
        return workout.to_dict()


# create workout plan
@workout_routes.route('/workout-plan/new')
def new_workout_plan():
    print(request.data)
