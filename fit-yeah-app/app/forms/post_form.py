from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import User


class PostForm(FlaskForm):
    class Meta:
        csrf = False

    user_id = IntegerField('user_id', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    img_url = StringField('img_url')
    video_url = StringField('video_url')


# class PostLikeForm(FlaskForm):
#     user_id = IntegerField('user_id', validators=[DataRequired()])
