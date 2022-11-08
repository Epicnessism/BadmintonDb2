# BadmintonDb2
Second implementation of Badminton DB

### Data Persistence Layer
We leverage [Knexjs](https://knexjs.org/) and [Postgresql](https://www.postgresql.org/docs/) for storing and interacting with our data.

### Backend
We leverage [Express](https://www.npmjs.com/package/express) for serving the backend.

### Frontend
We leverage [Angular 13](https://angular.io/) (as of 12/19/21) for serving the frontend.
We leverage [Angular Material](https://material.angular.io/components/categories) for the frontend components.


###Setup Instructions

#### Prerequisites to set up this application

- Have a version of Postgresql installed locally of version 9 or better (I think?)
- Have Angular + Angular cli installed (globally probably) of version 13.1.1 or better (I think?)
- Have Node.js installed (I really don't know what version you need for this, but im pretty sure anything thats not ancient will be fine)
- Have NPM installed via Node (I guess you don't need this if you know how to manage your dependencies but that sounds like a pain)

1. Clone down repo
2. cd into the root folder and run `npm i`. This should install everything you need for the backend server
3. cd into \bst-frontend and run `npm i`. This should install everything you need for the frontend angular server
4. cd back into the root folder and create a `.env` file at the root level, with this template, fill out values as needed
    ```
    PORT=80
    PROD_DATABASE_NAME=''
    PROD_DATABASE_URL=''
    PROD_DATABASE_USER=''
    PROD_DATABASE_PASSWORD=''
    LOCAL_DB_URL='127.0.0.1'
    LOCAL_DB_USER='postgres'
    LOCAL_DB_PWD=''
    LOCAL_DB_NAME='bst_db'
    ```
5. Run `npm run frontend` to spin up the angular webserver
6. You will need to get into psql and `create database bst_db` or what have you, there must be guides online on how to do this, I kind of don't remember how I did this, but this is a one-time thing
7. run `npm run knexfull` to run the knex mgirations AND seed the newly created bst_db.
8. run `npm run dev` to spin up the node express backend server.

You should now have a working Angular server on port 4200 and an ExpressJS backend server on port 3000 and a postgresql db called bst_db on port 5432.


### Supporting and future reference material

- [Explaining how (change) and (ngModelChange) events work](https://ultimatecourses.com/blog/difference-change-ngmodelchange-angular)
- [Great StackOverflow explanation on how to make custom input validation errors](https://stackoverflow.com/questions/47884655/display-custom-validator-error-with-mat-error)
- [Mooooore documentation on how to make custom validation???](https://medium.com/angular-in-depth/angular-forms-reactive-form-including-angular-material-and-custom-validator-9ef324cc3b08)