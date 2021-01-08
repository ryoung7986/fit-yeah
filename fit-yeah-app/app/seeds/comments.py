from werkzeug.security import generate_password_hash
from app.models import db, Comment


def seed_comments():
    comment1 = Comment(content='wow super cool post brodudeguy!',
                       user_id='1',
                       post_id='1')

    db.session.add(comment1)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
