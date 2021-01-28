from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import WorkoutForm, WorkoutPlanForm
from app.models import (db, User, Workout, Workout_Plan, User_Post,
                        User_Stat, Exercise)
import json

workout_routes = Blueprint('workouts', __name__)


# fetch all workouts
@workout_routes.route('/')
def workouts():
    workouts = Workout.query.all()
    return {"workouts": [workout.to_dict_full() for workout in workouts]}


# fetch workout by id
@workout_routes.route('/workout/<int:id>')
def workout_by_id(id):
    workout = Workout.query.get(id)
    return workout.to_dict_full()


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
    workouts = Workout.query.all()
    workout.exercises.append(exercise)
    db.session.add(workout)
    db.session.commit()
    return {"workouts": [workout.to_dict_full() for workout in workouts]}


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
@workout_routes.route('/workout-plan/new', methods=['POST'])
def new_workout_plan():
    form = WorkoutPlanForm()
    if form.validate_on_submit():
        user = User.query.get(form.data['user_id'])

        workoutPlan = Workout_Plan(
            user_id=form.data['user_id'],
            mon=form.data['mon'] if not None else '',
            tue=form.data['tue'] if not None else '',
            wed=form.data['wed'] if not None else '',
            thurs=form.data['thurs'] if not None else '',
            fri=form.data['fri'] if not None else '',
            sat=form.data['sat'] if not None else '',
            sun=form.data['sun'] if not None else '',
        )
        db.session.add(workoutPlan)
        db.session.commit()
        return user.to_dict_full()


# fetch workout plan
@workout_routes.route('/workout-plan/<int:id>')
def fetch_workout_plan(id):
    workoutPlan = Workout_Plan.query.get(id)
    return {"workout_plan": workoutPlan.to_dict()}
