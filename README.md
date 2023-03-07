# Demo NodeJS + ReactJS

## Tech stack

### Backend

- express
- jsonwebtoken
- prisma
- Dev packages:
  - ts-node: Running TS directly without having to wait for it to compiled
  - nodemon: watch for changes in our code and automatically restart when a file is changed
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

- Protected route
  - posts
  - posts/:id
  - profile
