FROM node:12.17-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install @quasar/cli
COPY . .