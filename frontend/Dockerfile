# Stage 1
FROM node:18-alpine as build-stage

WORKDIR /frontend
COPY package.json yarn.lock ./
RUN npm install
COPY . .
ENV VITE_BASE_URL=http://localhost:3001/api/v1/

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /frontend/dist /usr/share/nginx/html

# Nginx runs in foreground (debug mode)
CMD nginx -g 'daemon off;'
