from flask.cli import AppGroup
from .users import seed_users, undo_users
from .awards import seed_awards, undo_awards
from .exercises import seed_exercises, undo_exercises
from .users_stats import seed_users_stats, undo_users_stats
from .workouts import seed_workouts, undo_workouts
from .workout_plans import seed_workout_plans, undo_workout_plans
from .users_posts import seed_users_posts, undo_users_posts

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_awards()
    seed_exercises()
    seed_users_stats()
    seed_workouts()
    seed_workout_plans()
    seed_users_posts()

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_awards()
    undo_exercises()
    undo_users_stats()
    undo_workouts()
    undo_workout_plans()
    undo_users_posts()
