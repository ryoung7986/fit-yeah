from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import User, Workout, Workout_Plan


class WorkoutPlanForm(FlaskForm):
    class Meta:
        csrf = False

    user_id = IntegerField('user_id', validators=[DataRequired()])
    mon = IntegerField('mon')
    tue = IntegerField('tue')
    wed = IntegerField('wed')
    thurs = IntegerField('thurs')
    fri = IntegerField('fri')
    sat = IntegerField('sat')
    sun = IntegerField('sun')
