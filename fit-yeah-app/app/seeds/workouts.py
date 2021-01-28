from werkzeug.security import generate_password_hash
from app.models import db, Workout


def seed_workouts():

    dayOff = Workout(user_id=1,
                    title="Day Off",
                    subtitle="Take the day off. You deserve it!",
                    description="Sit on the couch. Eat potato chips. Question your life choices!",
                    likes=2000)

    db.session.add(dayOff)
    db.session.commit()


def undo_workouts():
    db.session.execute('TRUNCATE workouts RESTART IDENTITY CASCADE;')
    db.session.commit()
