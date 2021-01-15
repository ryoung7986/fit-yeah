from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Table, create_engine
from sqlalchemy.orm import relationship, sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base
import os

db = SQLAlchemy()
# Base = declarative_base()

followers_table = Table('users_followers', db.Model.metadata,
                        db.Column('follower_id',
                                  db.Integer,
                                  db.ForeignKey('users.id')),
                        db.Column('following_id',
                                  db.Integer,
                                  db.ForeignKey('users.id')))

awards_table = Table('users_awards', db.Model.metadata,
                     db.Column('user_id',
                               db.Integer,
                               db.ForeignKey('users.id')),
                     db.Column('award_id',
                               db.Integer,
                               db.ForeignKey('awards.id')))

c_likes = Table('comment_likes', db.Model.metadata,
                db.Column('user_id',
                          db.Integer,
                          db.ForeignKey('users.id')),
                db.Column('comment_id',
                          db.Integer,
                          db.ForeignKey('comments.id')))

p_likes = Table('post_likes', db.Model.metadata,
                db.Column('user_id',
                          db.Integer,
                          db.ForeignKey('users.id')),
                db.Column('post_id',
                          db.Integer,
                          db.ForeignKey('users_posts.id')))


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    query = db.session.query_property()

    id = db.Column(db.Integer, primary_key=True, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar_url = db.Column(db.String)
    points_earned = db.Column(db.Integer)
    hashed_password = db.Column(db.String(255), nullable=False)
    following = relationship('User', secondary=followers_table,
                             primaryjoin=(followers_table.c.follower_id == id),
                             secondaryjoin=followers_table.c.following_id == id)
    followers = relationship('User', secondary=followers_table,
                             primaryjoin=(
                                 followers_table.c.following_id == id),
                             secondaryjoin=followers_table.c.follower_id == id)
    awards = relationship('Award', secondary=awards_table,
                          backref="user")
    comment_likes = relationship('Comment', secondary=c_likes,
                                 backref="liked_by")
    post_likes = relationship('User_Post', secondary=p_likes,
                              backref="liked_by")

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
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            "points_earned": self.points_earned,
            "followers": [follower.to_dict() for follower in self.followers],
            "following": [leader.to_dict() for leader in self.following],
        }


class Award(db.Model):
    __tablename__ = 'awards'
    query = db.session.query_property()

    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String, nullable=False)
    badge_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    point_value = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "badge_url": self.badge_url,
            "description": self.description,
            "point_value": self.point_value,
            "user": self.user,
        }


class Exercise(db.Model):
    __tablename__ = 'exercises'
    query = db.session.query_property()

    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String, nullable=False)
    muscle_group = db.Column(db.String, nullable=False)
    difficulty = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    video_url = db.Column(db.String)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "muscle_group": self.muscle_group,
            "difficulty": self.difficulty,
            "description": self.description,
            "video_url": self.video_url,
        }


class Workout(db.Model):
    __tablename__ = 'workouts'
    query = db.session.query_property()

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    title = db.Column(db.String, nullable=False)
    subtitle = db.Column(db.String)
    description = db.Column(db.String)
    likes = db.Column(db.Integer)

    owner = db.relationship('User', backref='workouts')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
            "likes": self.likes,
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
            "likes": self.likes,
            "owner": self.owner,
        }


class Workout_Plan(db.Model):
    __tablename__ = 'workout_plans'
    query = db.session.query_property()

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    mon = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    tue = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    wed = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    thurs = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    fri = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    sat = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    sun = db.Column(db.Integer, db.ForeignKey('workouts.id'))

    user = db.relationship('User', backref='workout_plan')

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
        }


class User_Stat(db.Model):
    __tablename__ = 'users_stats'
    query = db.session.query_property()

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey(User.id),
                        nullable=False)
    exercise_id = db.Column(db.Integer,
                            db.ForeignKey('exercises.id'),
                            nullable=False)
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    weight_lbs = db.Column(db.Integer)
    duration_min = db.Column(db.Integer)
    distance_mi = db.Column(db.Integer)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', backref='stats')
    exercise = db.relationship('Exercise', backref="users_stats")

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
        }


class User_Post(db.Model):
    __tablename__ = 'users_posts'
    query = db.session.query_property()

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    description = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String)
    video_url = db.Column(db.String)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime,
                          server_default=db.func.now(),
                          server_onupdate=db.func.now())

    user = db.relationship('User', backref='posts')

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.user_id,
            "description": self.description,
            "img_url": self.img_url,
            "video_url": self.video_url,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "owner_id": self.user_id,
            "description": self.description,
            "img_url": self.img_url,
            "video_url": self.video_url,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "user": self.user.to_dict(),
            'liked_by': [user.to_dict_full() for user in self.liked_by]
        }


class Comment(db.Model):
    __tablename__ = "comments"
    query = db.session.query_property()

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('users_posts.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'post_id': self.post_id,
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'liked_by': [user.to_dict() for user in self.liked_by]
        }


# db.Base.metadata.create_all(engine)
