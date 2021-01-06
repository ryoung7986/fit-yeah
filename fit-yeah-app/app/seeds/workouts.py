from werkzeug.security import generate_password_hash
from app.models import db, Workout


def seed_workouts():

    demo1 = Workout(user_id=1,
                    title="Cardio Bun Blast",
                    subtitle="Burn Those BUNS",
                    description="Let's tighten up those BUNS",
                    likes=2000)

    db.session.add(demo1)
    db.session.commit()


def undo_workouts():
    db.session.execute('TRUNCATE workouts RESTART IDENTITY CASCADE;')
    db.session.commit()
