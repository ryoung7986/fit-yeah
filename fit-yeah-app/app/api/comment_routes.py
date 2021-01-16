from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import CommentForm
from app.models import db, User, Workout, Workout_Plan, \
    User_Post, User_Stat, Comment
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)


# get all comments on post
@comment_routes.route('/<int:id>')
def all_comments(id):
    comments = Comment.query.filter(Comment.post_id == id)
    return {'comments': [comment.to_dict() for comment in comments]}


# create a comment
@comment_routes.route('/new', methods=["POST"])
# @login_required
def new_comment():
    form = CommentForm()
    print('FORM DATA STUFFS')
    print(form.data['post_id'])
    if form.validate_on_submit():
        print(form.data['content'])
        comment = Comment(
            post_id=form.data['post_id'],
            user_id=form.data['user_id'],
            content=form.data['content']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

    # # Like a comment
    # @comment_routes.route('/like/<int:id>', methods=["PATCH"])
    # # @login_required
    # def like_comment(id):
    #     form = CommentLikeForm()
    #     comment = Comment.query.get(id)
    #     user = User.query.get(form.data['user_id'])
    #     if form.validate_on_submit():
    #         if user in comment.liked_by:
    #             comment.liked_by.remove(user)
    #             db.session.commit()
    #             return comment.to_dict()
    #         else:
    #             comment.liked_by.append(user)
    #             db.session.commit()
    #             return comment.to_dict()
    #     return {'errors': validation_errors_to_error_messages(form.errors)}
