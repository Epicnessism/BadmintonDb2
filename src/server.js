const Express = require('express');
const bodyParser = require('body-parser');
const CookieSession = require('cookie-session');
const config = require('./config.js');
var AWS = require("aws-sdk");
const bcrypt = require('bcrypt');
const createError = require('http-errors')

//todo AWS CONFIG STUFF...........organize this
AWS.config.update({
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
var UserTable = "users";
//end aws config stuff

//TODO organize Bcrypt config stuff
const saltRounds = 7;
//end bcrypt config stuff

var path = require('path');

const api = Express();

// api.use('/', Express.static(path.join(__dirname, '../frontend')))
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.use(CookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));


api.get('/', (req,res,next) => {
    console.log('landing on home');
    res.status(200).json({
        landingPage: "This is the landing page for badmintonDb2.0"
    })
})


//ENDPOINTS BEGIN HERE
api.get('/currentUser', (req, res) => {
    console.log("current user check: " + req.session.username)
    res.status(200).json({
        currentUser: req.session.username
    });
});

api.post('/signIn', async (req, res, next) => {
    console.log("User signin attempt: " + req.body.username)
    const lookUpUser = {
        TableName : UserTable,
        Key: {
          username: req.body.username
        }
    };
    try {
        const usernameExists = await docClient.get(lookUpUser).promise()
        if(usernameExists.Item == undefined) {
            return next(createError(401, "Credentials Invalid"));
        }
        const validPassword = await bcrypt.compare(req.body.password, usernameExists.Item.password); //returns a boolean?
        console.log(validPassword);
        if(validPassword) {
            req.session.username = req.body.username
            res.status(200).json({
                message: "Signed in successfully",
                username: req.session.username
            });
        } else {
            next(createError(401, "Credentials Invalid"));
        }
    } catch(err) {
        console.log(err);
        next(err) //TODO not actually sure if this works lmao
    }
})

api.post('/signUp', async (req,res,next) => {
    const lookUpUsername = {
        TableName : UserTable,
        Key: {
          username: req.body.username
        }
      };
    try {
        const usernameExists = await docClient.get(lookUpUsername).promise()
        if(usernameExists.Item != undefined) {
            return next(createError(409, 'Username already exists...'))
        }
    } catch(err) {
        console.log(err);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    var insertUser = {
        TableName: UserTable,
        Item:{
            "username": req.body.username,
            "password": hashedPassword,
        }
    };
    docClient.put(insertUser, function(err, data) {
        if (err) {
            console.error("User failed to signup. Error JSON:", JSON.stringify(err, null, 2));
            next(createError(500, err))
        } else {
            console.log("User signup: " + req.body.username)
            req.session.username = req.body.username
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.status(203).json( {
                message: "Signed up successfully",
                username: req.session.username
            })
        }
    });
})




//catch all error handling level 1
api.use(function(err, req, res, next) {
    console.log(err);
    return res.status(err.status || 500).json({
        status: err.status,
        message: err.message
    })
});





api.listen(config.port)
console.log('Listening for WS and HTTP traffic on port ' + config.port);