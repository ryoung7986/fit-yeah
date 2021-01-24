from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import User, Workout, Workout_Plan, Exercise


class UserStatsForm(FlaskForm):
    class Meta:
        csrf = False

    user_id = IntegerField('user_id', validators=[DataRequired()])
    exercise_id = IntegerField('exercise_id', validators=[DataRequired()])
    sets = IntegerField('sets')
    reps = IntegerField('reps')
    weight_lbs = IntegerField('weight_lbs')
    duration_min = IntegerField('duration_min')
    distance_mi = IntegerField('distance_mi')
