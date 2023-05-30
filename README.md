# Demo NodeJS + ReactJS

## How to setup

Create an .env file in backend folder from .env.sample to connect to your database
Create an .env file in frontend folder from .env.sample to connect to your api

Or just run `docker compose up -d`

## Tech stack

### Backend

- express
- jsonwebtoken
- prisma
- Dev packages:
  - ts-node-dev: Running TS directly without having to wait for it to compiled and watch for changes in our code and automatically restart when a file is changed (ts-node combines with nodemon)
  - rimraf: rm -rf for nodejs
  - eslint, prettier packages: see backend/package.json
  - husky: enforce coding convention

### Frontend

- React
- TailwindCSS
- React Hook Form
- React Query
- Zod

## Features

- Authentication using JWT via cookie
- Login via Google using OAuth2
- Display posts with pagination
- User can create, update, delete post and comments for each post
- Admin user can delete comment while Subscriber user cannot

## Routes

- Protected endpoint

  - GET: '/api/v1/posts'
  - GET: '/api/v1/posts/:id'
  - GET: '/api/v1/comments/:postId'
  - GET: '/api/v1/profile/'
  - POST: '/api/v1/comment'
  - POST: '/api/v1/posts'
  - PUT: '/api/v1/posts'
  - PUT: '/api/v1/profile/'
  - PUT: '/api/v1/posts/:id'

- Protected routes
  - posts
  - posts/:id
  - profile
