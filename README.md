# DOC

## Tech stack

### Backend

- express
- jsonwebtoken
- mysql2
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

## Routes

- Protected endpoint

  - GET: '/api/v1/posts'
  - GET: '/api/v1/posts/:id'
  - GET: '/api/v1/comments/:postId'
  - GET: '/api/v1/profile/'
  - POST: '/api/v1/comment'
  - POST: '/api/v1/posts'
  - PUT: '/api/v1/profile/'
  - PUT: '/api/v1/posts/:id'

- Protected route
  - posts
  - posts/:id
  - profile
