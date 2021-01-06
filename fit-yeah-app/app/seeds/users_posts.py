from werkzeug.security import generate_password_hash
from app.models import db, User_Post


def seed_users_posts():

    demo1 = User_Post(user_id=1,
                      description="This is a demo post.",
                      img_url="http://www.fillmurray.com/200/300")

    db.session.add(demo1)
    db.session.commit()


def undo_users_posts():
    db.session.execute('TRUNCATE users_posts RESTART IDENTITY CASCADE;')
    db.session.commit()
