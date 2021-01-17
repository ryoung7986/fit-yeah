from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import (db, User, Workout, Workout_Plan,
                        User_Post, User_Stat, Exercise)

exercise_routes = Blueprint('exercises', __name__)


# fetch all exercises
@exercise_routes.route('/')
def get_all_exercises():
    exercises = Exercise.query.all()
    return {"exercises": [exercise.to_dict() for exercise in exercises]}
