FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY ./ /usr/src/app/

# Move to frontend and run ng build --prod
WORKDIR /usr/src/app/badminton-stat-tracker-frontend
RUN npm install @angular/cli -g
RUN npm install
RUN ng update --all --force
RUN ng build --prod


# go back to backend root dir
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install

EXPOSE 8888/tcp
CMD [ "node", "src/server.js" ]