FROM node:17-alpine3.12
# FROM node:alpine

# Set work directory to /app
WORKDIR /app
ADD package*.json .

# declare the environment variable PORT=8080
ENV PORT=8080
# expose the :8080 port to outside world form the container
EXPOSE 8080

# copy contents from the source directory to /app
COPY . .

# install the node dependencies
RUN npm install

# what command to run
CMD ["node", "index.js"]
