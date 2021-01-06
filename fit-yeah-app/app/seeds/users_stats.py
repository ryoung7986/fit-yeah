from werkzeug.security import generate_password_hash
from app.models import db, User_Stat


def seed_users_stats():

    demo1 = User_Stat(user_id=1,
                      exercise_id=1)

    db.session.add(demo1)
    db.session.commit()


def undo_users_stats():
    db.session.execute('TRUNCATE users_stats RESTART IDENTITY CASCADE;')
    db.session.commit()
