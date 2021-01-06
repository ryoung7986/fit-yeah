from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Table, create_engine
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

engine = create_engine(os.environ.get('DATABASE_URL'))

Session = sessionmaker(bind=engine)
session = Session()

db = SQLAlchemy()
Base = declarative_base()

followers_table = Table('users_followers', Base.metadata,
                        db.Column('follower_id',
                                  db.Integer,
                                  db.ForeignKey('users.id')),
                        db.Column('following_id',
                                  db.Integer,
                                  db.ForeignKey('users.id')))

awards_table = Table('users_awards',
                     Base.metadata,
                     db.Column('user_id', db.ForeignKey('users.id')),
                     db.Column('award_id', db.ForeignKey('awards.id')))


class User(Base, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    points_earned = db.Column(db.Integer)
    hashed_password = db.Column(db.String(255), nullable=False)
    following = relationship('User', secondary=followers_table,
                             primaryjoin=(followers_table.c.follower_id == id),
                             secondaryjoin=followers_table.c.following_id)
    followers = relationship('User', secondary=followers_table,
                             primaryjoin=(
                                 followers_table.c.following_id == id),
                             secondaryjoin=followers_table.c.follower_id)
    awards = relationship('Award', secondary='awards_table',
                          back_populates="user")

    posts = db.relationship('User_Post')
    workouts = db.relationship('Workout', back_populates='owner')
    workout_plan = db.relationship('Workout_Plan', back_populates='owner')
    users_stats = db.relationship('User_Stat', back_populates='user')

    @ property
    def password(self):
        return self.hashed_password

    @ password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            "points_earned": self.points_earned,
            "followers": self.followers,
            "following": self.following,
        }


class Award(Base):
    __tablename__ = 'awards'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String, nullable=False)
    badge_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    point_value = db.Column(db.Integer, nullable=False)

    user = db.relationship('User',
                           secondary='awards_table',
                           back_populates='awards')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "badge_url": self.badge_url,
            "description": self.description,
            "point_value": self.point_value,
            "user": self.user,
        }


class Exercise(Base):
    __tablename__ = 'exercises'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String, nullable=False)
    muscle_group = db.Column(db.String, nullable=False)
    difficulty = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    video_url = db.Column(db.String)

    users_stats = db.relationship('User_Stat', back_populates='exercise')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "muscle_group": self.muscle_group,
            "difficulty": self.difficulty,
            "description": self.description,
            "video_url": self.video_url,
        }


class Workout(Base):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    title = db.Column(db.String, nullable=False)
    subtitle = db.Column(db.String)
    description = db.Column(db.String)
    likes = db.Column(db.Integer)

    owner = db.relationship('User', back_populates='workouts')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
            "likes": self.likes,
            "owner": self.owner,
        }


class Workout_Plan(Base):
    __tablename__ = 'workout_plans'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    mon = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    tue = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    wed = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    thurs = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    fri = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    sat = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    sun = db.Column(db.Integer, db.ForeignKey('workouts.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "mon": self.mon,
            "tue": self.tue,
            "wed": self.wed,
            "thurs": self.thurs,
            "fri": self.fri,
            "sat": self.sat,
            "sun": self.sun,
            "owner": self.owner,
        }


class User_Stat(Base):
    __tablename__ = 'users_stats'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    exercise_id = db.Column(db.Integer,
                            db.ForeignKey('exercises.id'),
                            nullable=False)
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    weight_lbs = db.Column(db.Integer)
    duration_min = db.Column(db.Integer)
    distance_mi = db.Column(db.Integer)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', back_populates="users_stats")
    exercise = db.relationship('Exercise', back_populates="users_stats")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "exercise_id": self.exercise_id,
            "sets": self.sets,
            "reps": self.reps,
            "weight": self.weight_lbs,
            "duration": self.duration_min,
            "distance": self.distance_mi,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }


class User_Post(Base):
    __tablename__ = 'users_posts'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    description = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String)
    video_url = db.Column(db.String)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime,
                          server_default=db.func.now(),
                          server_onupdate=db.func.now())

    user = db.relationship('User', back_populates='posts')

    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "description": self.description,
            "img_url": self.img_url,
            "video_url": self.video_url,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "user": self.user,
        }


Base.metadata.create_all(engine)
