from werkzeug.security import generate_password_hash
from app.models import db, Exercise


def seed_exercises():

    pushups = Exercise(title="Push Ups",
                       muscle_group="Chest, Shoulders, Triceps, Abs",
                       difficulty="Easy",
                       description='''1. Start in a high plank position
                                To get into a plank, place hands firmly on the
                                floor, directly under shoulders. Ground toes
                                into the floor to stabilize your lower half.

                                Brace core (tighten abs as if preparing to
                                take a punch), engage glutes and hamstrings,
                                and flatten your back so your entire body is
                                neutral and straight.

                                2. Lower your body
                                Keep back flat and eyes focused about 3 feet
                                in front of you. Maintain a neutral neck and
                                lower your body until chest grazes the floor.

                                Don’t let your butt dip or stick out at any
                                point during the move — your body should stay
                                in a straight line from head to toe.

                                Draw shoulder blades back and down, keeping
                                elbows tucked close to your body (don’t “T”
                                your arms).

                                3. Push back up
                                Keeping core engaged, exhale as you push back
                                to starting position. Pro tip: Imagine you’re
                                screwing your hands into the floor as you push
                                back up. Repeat for 10–20 reps or as many as
                                you can do with good form.
                                ''',
                       video_url="http://www.fillmurray.com/200/300")

    db.session.add(pushups)

    db.session.commit()


def undo_exercises():
    db.session.execute('TRUNCATE exercises RESTART IDENTITY CASCADE;')
    db.session.commit()
