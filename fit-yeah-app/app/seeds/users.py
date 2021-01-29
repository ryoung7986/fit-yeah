from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo1 = User(first_name='Demo',
                 last_name='User',
                 username='Demo',
                 email='demo@aa.io',
                 points_earned=100,
                 password='password')
    demo2 = User(first_name='Curt',
                 last_name='Mofo',
                 username='enthralledfluggers',
                 avatar_url="https://fit-yeah.s3.amazonaws.com/21.jpg",
                 email='demo2@aa.io',
                 points_earned=50,
                 password='password')
    demo3 = User(first_name='Hank',
                 last_name='Shelton',
                 username='wearylardass',
                 avatar_url="https://fit-yeah.s3.amazonaws.com/7.jpg",
                 email='demo3@aa.io',
                 points_earned=75,
                 password='password')
    demo4 = User(first_name='Thoth',
                 last_name='Dresden',
                 username='calamitousruffian',
                 avatar_url="https://fit-yeah.s3.amazonaws.com/63.jpg",
                 email='demo4@aa.io',
                 points_earned=250,
                 password='password')
    demo5 = User(first_name='Pug',
                 last_name='Voldemort',
                 username='peacefulbooger',
                 avatar_url="https://fit-yeah.s3.amazonaws.com/84.jpg",
                 email='demo5@aa.io',
                 points_earned=70,
                 password='password')
    demo6 = User(first_name='Fannie',
                 last_name='Pham',
                 username='drearyanarchist',
                 avatar_url="https://fit-yeah.s3.amazonaws.com/6.jpg",
                 email='demo6@aa.io',
                 points_earned=90,
                 password='password')
    demo7 = User(first_name='Oakley',
                 last_name='Moses',
                 username='emotionalswindler',
                 avatar_url="https://fit-yeah.s3.amazonaws.com/33.jpg",
                 email='demo7@aa.io',
                 points_earned=150,
                 password='password')
    demo8 = User(first_name='Reginald',
                 last_name='Camacho',
                 username='deliriouspigface',
                 avatar_url="https://fit-yeah.s3.amazonaws.com/38.jpg",
                 email='demo8@aa.io',
                 points_earned=830,
                 password='password')
    demo9 = User(first_name='Vladimir',
                 last_name='Decker',
                 username='offendedbarmpot',
                 avatar_url="https://fit-yeah.s3.amazonaws.com/13.jpg",
                 email='demo9@aa.io',
                 points_earned=90,
                 password='password')
    demo10 = User(first_name='Mya',
                  last_name='Kim',
                  username='agitatedninny',
                  avatar_url="https://fit-yeah.s3.amazonaws.com/50.jpg",
                  email='demo10@aa.io',
                  points_earned=125,
                  password='password')

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
