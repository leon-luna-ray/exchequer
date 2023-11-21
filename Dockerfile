# Stage 1: Build Vue.js app
FROM node:18 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY client ./client
WORKDIR /app/client
RUN yarn
RUN yarn build

# Stage 2: Build Express server image
FROM node:18
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
COPY --from=build /app/client/dist ./client/dist
EXPOSE 3000
CMD ["yarn", "start"]
