# add the Node.js docker image
FROM node:18-alpine

# Create directory that runs the app on docker
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package.json yarn.lock ./

# Install package.json dependencies
RUN npm install

# chmod the file, otherwise it cannot be understandable
COPY startup.sh ./startup.sh
USER root
RUN chmod +x ./startup.sh

# COPY
COPY . .

# A command to start the server
# https://www.greaterthan0.com/dockerfile-executing-shell-script-file-entrypoint
ENTRYPOINT ["sh","./startup.sh"]
