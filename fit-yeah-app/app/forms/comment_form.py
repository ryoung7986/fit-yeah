from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import User


class CommentForm(FlaskForm):
    class Meta:
        csrf = False

    user_id = IntegerField('user_id', [DataRequired()])
    post_id = IntegerField('post_id', [DataRequired()])
    content = StringField('content', [DataRequired()])
