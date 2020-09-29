FROM node:12.17 as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run knex:migrate
COPY . .