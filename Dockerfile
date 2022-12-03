FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/kib/src/app
WORKDIR /usr/kib/src/app

# Install dependencies
COPY package.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 8080
CMD [ "npm", "dev" ]