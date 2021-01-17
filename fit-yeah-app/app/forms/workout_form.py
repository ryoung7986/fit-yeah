from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import User, Workout


class WorkoutForm(FlaskForm):
    class Meta:
        csrf = False

    user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title')
    subtitle = StringField('subtitle')
    description = StringField('description')
