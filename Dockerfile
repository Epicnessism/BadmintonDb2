FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY ./ /usr/src/app/

# Install app dependencies
RUN npm install

EXPOSE 8888/tcp
CMD [ "node", "src/server.js" ]