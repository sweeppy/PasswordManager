# Use the official Node.js image to build the React application
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use the official NGINX image to serve the React application
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
