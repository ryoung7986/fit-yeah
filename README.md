# Fitness App - "fit-yeah" (http://fit-yeah.herokuapp.com/)

(fitness app) is an app for fitness enthusiasts of all abilities and experiences with a gamified twist. Users can follow other users, like their posts/awards/milestones, post videos of their workouts, level up as they hit their goals

------------------------------------------------
------------------------------------------------

## Features
------------------------------------------------

### Splash page
  - login / signup

------------------------------------------------

### User profile component
  - MVPs:
    - avatar
    - workout calendar
    - User posts (statuses, videos, pics, etc)
    - workout log
      - recent finished workouts with stats
      - each finished workout is shareable
  - Stretch Goals:
    - level (bronze, silver, gold, platinum, elite)
      - based off points for completing exercises, achieving goals, improving
    - graph tracking progress (measured by daily points earned)
    - awards (ie "ran one mile"; "ran mile in < 10/9/8/7 minutes"; benched 100/150/200/ etc lbs; etc)
    - Favorite workouts / exercises

------------------------------------------------

### Homepage component / Social media component
  - MVPs:
    - posts by friends
    - like/comment posts
  - Stretch goals:
    - shared workouts/achievements by friends
    - suggested workouts (most liked)

-------------------------------------------------

### Exercise component
  - MVPs:
    - Workout video
    - Instructions
    - Equipment required
    - Muscles involved (biceps/triceps/back/shoulders/abs/etc)
    - Like exercise
    - Comment on exercise
  - Stretch goals:
    - Add exercise to favorites list
    - Add point values to exercises
      - if it's a run, give points for endurance, speed, overall improvement
      - if it's an exercise, give points for reps, increased resistance, improvement

-------------------------------------------------

### Workout plan component
  - MVPs:
    - Goal for workout:
      - Fat loss; strength; conditioning
    - Exercises
      - Select number of sets/reps/times
  - Stretch goals:
    - Add to "suggested workouts" component
      - rank in suggested workouts by most liked / category / etc

-------------------------------------------------

### Create custom workout component
  - MVPs:
    - Select multiple exercises
    - Select days of the week for each exercise (adds to calendar)
  - Stretch goals:
    - Select timeframe (1 month, 6 months, 1 year, indefinite, etc)
    - Set goals (num reps, increased workout duration, improved run times, etc.)

-------------------------------------------------

### Logged workout component
  - MVPs:
    - Exercises completed / date completed / stats logged
  - Stretch Goals:
    - Awards displayed for goals reached



## Possible Dependencies
 - iframe facebook embedded posts for widgets sidebar
 - react-big-calendar

# Application Architecture and Technologies Used:
React / JS / CSS / Flask / Python / SQLAlchemy / AWS
