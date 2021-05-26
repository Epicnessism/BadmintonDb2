FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY ./ /usr/src/app/

# Move to frontend and run ng build --prod
RUN cd badminton-stat-tracker-frontend
RUN npm install
RUN ng build --prod


# Install app dependencies
RUN npm install

EXPOSE 8888/tcp
CMD [ "node", "src/server.js" ]