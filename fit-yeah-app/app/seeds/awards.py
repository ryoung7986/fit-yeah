from werkzeug.security import generate_password_hash
from app.models import db, Award


def seed_awards():

    new_user_award = Award(title="New User Award",
                           badge_url="http://www.fillmurray.com/200/300",
                           description="Thanks for being a new user!",
                           point_value=15)

    db.session.add(new_user_award)

    db.session.commit()


def undo_awards():
    db.session.execute('TRUNCATE awards RESTART IDENTITY CASCADE;')
    db.session.commit()
