from werkzeug.security import generate_password_hash
from app.models import db, Workout_Plan


def seed_workout_plans():

    demo1 = Workout_Plan(user_id=1,
                         mon=1,
                         wed=1,
                         fri=1)

    db.session.add(demo1)
    db.session.commit()


def undo_workout_plans():
    db.session.execute('TRUNCATE workout_plans RESTART IDENTITY CASCADE;')
    db.session.commit()
