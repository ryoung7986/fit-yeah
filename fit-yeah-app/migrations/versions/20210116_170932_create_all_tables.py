"""create-all-tables

Revision ID: c5adff778052
Revises: 
Create Date: 2021-01-16 17:09:32.866876

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c5adff778052'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('awards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('badge_url', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('point_value', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('muscle_group', sa.String(), nullable=False),
    sa.Column('difficulty', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('video_url', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('avatar_url', sa.String(), nullable=True),
    sa.Column('bio', sa.String(), nullable=True),
    sa.Column('points_earned', sa.Integer(), nullable=True),
    sa.Column('completed_workouts', sa.Integer(), nullable=True),
    sa.Column('miles_run', sa.Integer(), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('users_awards',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('award_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['award_id'], ['awards.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    op.create_table('users_followers',
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('following_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['following_id'], ['users.id'], )
    )
    op.create_table('users_posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('img_url', sa.String(), nullable=True),
    sa.Column('video_url', sa.String(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('users_stats',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('exercise_id', sa.Integer(), nullable=False),
    sa.Column('sets', sa.Integer(), nullable=True),
    sa.Column('reps', sa.Integer(), nullable=True),
    sa.Column('weight_lbs', sa.Integer(), nullable=True),
    sa.Column('duration_min', sa.Integer(), nullable=True),
    sa.Column('distance_mi', sa.Integer(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercises.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('workouts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('subtitle', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('likes', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=1000), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['users_posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('post_likes',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['users_posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    op.create_table('workout_exercises',
    sa.Column('exercise_id', sa.Integer(), nullable=True),
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercises.id'], ),
    sa.ForeignKeyConstraint(['workout_id'], ['workouts.id'], )
    )
    op.create_table('workout_plans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('mon', sa.Integer(), nullable=True),
    sa.Column('tue', sa.Integer(), nullable=True),
    sa.Column('wed', sa.Integer(), nullable=True),
    sa.Column('thurs', sa.Integer(), nullable=True),
    sa.Column('fri', sa.Integer(), nullable=True),
    sa.Column('sat', sa.Integer(), nullable=True),
    sa.Column('sun', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['fri'], ['workouts.id'], ),
    sa.ForeignKeyConstraint(['mon'], ['workouts.id'], ),
    sa.ForeignKeyConstraint(['sat'], ['workouts.id'], ),
    sa.ForeignKeyConstraint(['sun'], ['workouts.id'], ),
    sa.ForeignKeyConstraint(['thurs'], ['workouts.id'], ),
    sa.ForeignKeyConstraint(['tue'], ['workouts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['wed'], ['workouts.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('comment_likes',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('comment_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comment_likes')
    op.drop_table('workout_plans')
    op.drop_table('workout_exercises')
    op.drop_table('post_likes')
    op.drop_table('comments')
    op.drop_table('workouts')
    op.drop_table('users_stats')
    op.drop_table('users_posts')
    op.drop_table('users_followers')
    op.drop_table('users_awards')
    op.drop_table('users')
    op.drop_table('exercises')
    op.drop_table('awards')
    # ### end Alembic commands ###
