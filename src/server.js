require("dotenv").config();

const knex = require('./dbconfig');

const Express = require('express');
const bodyParser = require('body-parser');
const CookieSession = require('cookie-session');
let cors = require('cors');
var AWS = require("aws-sdk");
const bcrypt = require('bcrypt');
const createError = require('http-errors');

// //todo AWS CONFIG STUFF...........organize this
// AWS.config.update({
//     region: "us-east-2",
//     endpoint: "https://dynamodb.us-east-2.amazonaws.com"
// });
// var docClient = new AWS.DynamoDB.DocumentClient();
// var UserTable = "users";
// //end aws config stuff

//TODO organize Bcrypt config stuff
const saltRounds = 7;
//end bcrypt config stuff

var path = require('path');

const api = Express();


//TODO CORS CONFIG HERE
api.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
api.options('*', cors());




// api.use('/', Express.static(path.join(__dirname, '../badminton-stat-tracker-frontend/dist/badminton-stat-tracker-frontend')))
api.use('/', Express.static(process.cwd() + "/badminton-stat-tracker-frontend/dist/badminton-stat-tracker-frontend/"))
// ---- SERVE STATIC FILES ---- //
// api.server.get('*.*', express.static('../badminton-stat-tracker-frontend/dist/badminton-stat-tracker-frontend', {maxAge: '1y'}));



api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.use(CookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));



//ROUTERS
api.use('/players', require('./routes/players').players);
api.use('/auth', require('./routes/auth').auth);
api.use('/games', require('./routes/games').games);
api.use('/tournaments', require('./routes/tournaments').tournaments);


//Server top-level endpoints
api.get('/', (req,res,next) => {
    console.log('landing on home');
    // res.send(200).json({message: "landing page!!!"})
    res.sendFile(process.cwd() + "/badminton-stat-tracker-frontend/dist/badminton-stat-tracker-frontend/index.html")
})

api.get('/healthcheck', (req,res) => {
    console.log("health-check");
    res.status(200).json({message:"200"});
})


api.get('/currentUser', (req, res) => {
    console.log("current user check: " + req.session.username)
    res.status(200).json({
        currentUser: req.session.username
    });
});


api.get('/test', (req, res, next) => {
    console.log("testing knex link");
    knex('players')
    .select('id', 'given_name', 'family_name')
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
})

// api.post('/signIn', async (req, res, next) => {
//     console.log("User signin attempt: " + req.body.username)
//     const lookUpUser = {
//         TableName : UserTable,
//         Key: {
//           username: req.body.username
//         }
//     };
//     try {
//         const usernameExists = await docClient.get(lookUpUser).promise()
//         if(usernameExists.Item == undefined) {
//             return next(createError(401, "Credentials Invalid"));
//         }
//         const validPassword = await bcrypt.compare(req.body.password, usernameExists.Item.password); //returns a boolean?
//         console.log(validPassword);
//         if(validPassword) {
//             req.session.username = req.body.username
//             res.status(200).json({
//                 message: "Signed in successfully",
//                 username: req.session.username
//             });
//         } else {
//             next(createError(401, "Credentials Invalid"));
//         }
//     } catch(err) {
//         console.log(err);
//         next(err) //TODO not actually sure if this works lmao
//     }
// })

// api.post('/signUp', async (req,res,next) => {
//     const lookUpUsername = {
//         TableName : UserTable,
//         Key: {
//           username: req.body.username
//         }
//       };
//     try {
//         const usernameExists = await docClient.get(lookUpUsername).promise()
//         if(usernameExists.Item != undefined) {
//             return next(createError(409, 'Username already exists...'))
//         }
//     } catch(err) {
//         console.log(err);
//     }
//     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//     var insertUser = {
//         TableName: UserTable,
//         Item:{
//             "username": req.body.username,
//             "password": hashedPassword,
//         }
//     };
//     docClient.put(insertUser, function(err, data) {
//         if (err) {
//             console.error("User failed to signup. Error JSON:", JSON.stringify(err, null, 2));
//             next(createError(500, err))
//         } else {
//             console.log("User signup: " + req.body.username)
//             req.session.username = req.body.username
//             console.log("Added item:", JSON.stringify(data, null, 2));
//             res.status(203).json( {
//                 message: "Signed up successfully",
//                 username: req.session.username
//             })
//         }
//     });
// })




//catch all error handling level 1
api.use(function(err, req, res, next) {
    console.log(err);
    return res.status(err.status || 500).json({
        status: err.status,
        message: err.message
    })
});





api.listen(process.env.PORT)
// console.log(process.env);
// console.log(process.env.PORT);
console.log('Listening for WS and HTTP traffic on port ' + process.env.PORT);

//TODO this failed for some reason, fix later
// console.log("before knex test:");
// knex('players')
// .select('id', 'given_name')
// .then(result => {
//     console.log(result);
// });
// console.log("after knex test:");