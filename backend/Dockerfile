FROM node:18-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install
COPY . .
RUN npx prisma db push && npx prisma generate
CMD ["npm", "run", "start"]
