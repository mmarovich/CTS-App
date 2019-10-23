# mern-auth

This repository has been modified from rishipr's [MERN-auth](https://github.com/rishipr/mern-auth), with a bit more organization and convenient scripts thrown in.  : )

![Final App](https://i.postimg.cc/tybZb8dL/final-MERNAuth.gif)
Minimal full-stack MERN app with authentication using passport and JWTs.

This project uses the following technologies:

- [React](https://reactjs.org) and [React Router](https://reacttraining.com/react-router/) for frontend
- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend
- [MongoDB](https://www.mongodb.com/) for the database

## Configuration

I have modified this code so that you now add your `MONGOURI` from your [mLab](http://mlab.com) database in `.env` file for better security.

## Quick Start

To install dependencies you now only have to run `npm install` and both back-end and front-end dependencies will install

`npm start` will now run concurrently.

For deploying to Heroku, please refer to [this](https://www.youtube.com/watch?v=71wSzpLyW9k) helpful video by TraversyMedia.
