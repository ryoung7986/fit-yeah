
[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/ryan-young-b67a7aab/)



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://fit-yeah.s3.amazonaws.com/FY-Logo-3.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Fit-Yeah Fitness App</h3>

  <p align="center">
    A social-media fitness application inspired by Facebook
    <br />
    <a href="https://github.com/ryoung7986/fit-yeah/blob/main/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://fit-yeah.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/ryoung7986/fit-yeah/issues">Report Bug</a>
    .
    <a href="https://www.linkedin.com/in/ryan-young-b67a7aab/">LinkedIn</a>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Fit-Yeah is a fitness-centric social-media application. Create your own workouts from a database of exercises, schedule your workouts in your personal workout-plan, and earn points/awards for completed workouts and goals achieved. Follow other users and see what they're up to on your personal feed; like and/or comment on their posts and achievements to show your support for them while they get healthy! Encourage your friends to stop annoying you on Facebook with their gym selfies; now there's a website for just that!

Features:
* User can create a new account and login with that account.
* User can create workouts by selecting from a database of exercises.
* User can create a workout plan by selecting which workouts they would like to do each day of the week.
* The user can also create goals for each workout/exercise, and track their output and progress over time.
* By keeping a log of completed workouts and user statistics, the user will gain points and awards they can share via posts.
* Users can like posts/workouts/exercises and comment on their friends' posts/achievements.
* Users can use the search function to search for other users, workouts, or exercises.
* When making a post, a user can upload an image or video file through our file uploader and AWS.

## Schema

[Schema](https://github.com/ryoung7986/fit-yeah/blob/main/planning/schema/fit-yeah-schema.png)


### Frameworks Used:

* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [PostgresQL](https://www.postgresql.org/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [AWS/S3](https://aws.amazon.com/)
* [React-Redux](https://react-redux.js.org/)
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [Material-UI](https://material-ui.com/)
* [CSS](https://en.wikipedia.org/wiki/CSS)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy of this project up and running, follow these steps for installation.

### Prerequisites

Make sure you have the latest version of npm installed
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Create your AWS/S3 bucket and get a free API Key at [https://aws.amazon.com](https://aws.amazon.com)

2. Clone the repo
   ```sh
   git clone https://github.com/ryoung7986/fit-yeah.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create your .env file in the project root: `fit-yeah-app/env`

5. Fill out your .env file
   ```sh
    FLASK_APP=app
    FLASK_ENV=development
    SECRET_KEY=[your key here]
    DATABASE_URL=postgresql://username:password@localhost/db_name
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY_ID=
    BUCKET_NAME=fit-yeah
    region=
   ```



<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/ryoung7986/fit-yeah/issues) for a list of proposed features (and known issues).

### Routes:
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



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact


Ryan Young

ryoung7986@gmail.com . [linkedIn](https://www.linkedin.com/in/ryan-young-b67a7aab/)

Project Link: [https://github.com/ryoung7986/fit-yeah](https://github.com/ryoung7986/fit-yeah)
