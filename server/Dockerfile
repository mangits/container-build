# Specify the node base image with your desired version, e.g. node:<version>
FROM node:14

# Set and create the working directory for this app
WORKDIR /app/server

# Copy this application's files from the current directory to the filesystem
# of the container at /app
COPY . /app/server

# Make the container accept traffic on port 3000 at runtime from other
# containers or the host if also published
EXPOSE 3001

# Run this shell command at build time
RUN npm install

RUN yarn install

RUN yarn global add nodemon

# RUN npx knex migrate:latest

# Start the application
CMD npm start