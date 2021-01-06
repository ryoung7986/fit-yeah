# Fitness App - "fit-yeah" (http://fit-yeah.herokuapp.com/)

(fitness app) is an app for fitness enthusiasts of all abilities and experiences with a gamified twist. Users can follow other users, like their posts/awards/milestones, post videos of their workouts, level up as they hit their goals
------------------------------------------------
------------------------------------------------
# Components
------------------------------------------------
### NavBar
    - Logo / search / navigation icons (user plan / friends list / user stats) / user dropdown - profile, logout
### Splash page
    - login / signup
### Homepage
    sidebar component: current week / workouts completed / workouts to do
    feed component: posts by user, user friends
### User profile
    header component: cover photo / avatar / user name
    sidebar component: user information / workout plan
    main component: user posts
### Exercise component
    header component: cover photo / title of exercise / muscle group / # likes
    main component: workout video / difficulty / equipment required / instructions
    comments component: user posts referencing exercise
### Workout plan component
    header component: user information / avatar
    left-sidebar: M T W Th F
    main component (feed): today's workout / workouts completed
    - Days of week - exercises
### Create custom workout component
    - Select multiple exercises
    - Select days of the week for each exercise
### Logged workout component
    - Exercises completed / date completed / stats logged
---------------------------------
## Stretch Goals:
    - user workout calendar
    - graph tracking progress (measured by daily points earned)
    - user levels (bronze, silver, gold, platinum, elite)
      - based off points for completing exercises, achieving goals, improving
    - awards (ie "ran one mile"; "ran mile in < 10/9/8/7 minutes"; benched 100/150/200/ etc lbs; etc)
    - user stories
    - suggested workouts (most liked)
    - Add exercise to favorites list
    - Set goals (num reps, increased workout duration, improved run times, etc.)
---------------------------------
# Routes

- GET "api/workouts"
- GET "api/users/:id"
- GET/POST/PATCH/DELETE "api/users/:id/workouts"
- GET/POST/PATCH/DELETE "api/users/:id/posts"
- GET/POST/PATCH/DELETE "api/users/:id/plan"
- GET/POST/DELETE "api/users/:id/stats"
- GET "api/users/:id/followers"
- POST/DELETE "api/users/:id/followers/:otherId"
- GET "api/users/:id/followers/posts"
- GET "api/users/:id/awards"

## Possible Dependencies
    - iframe facebook embedded posts for widgets sidebar
    - react-big-calendar

# Application Architecture and Technologies Used:
React / JS / CSS / Flask / Python / SQLAlchemy / AWS


** creat posts component
