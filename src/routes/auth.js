const bcrypt = require('bcrypt');
const express = require('express');
const knex = require('../dbconfig');
const auth = express.Router();
// import { v4 as uuidv4 } from 'uuid'; //ES6 syntax doesn't work
const { v4: uuidv4 } = require('uuid');


//bcrypt stuff
const saltRounds = 7;

auth.post('/login', async (req, res, next) => {
    console.log("req.body: ", req.body);
    let foundUser = await knex('users').select('username','password', 'user_id').where({username: req.body.username})
        .then( result => {
            console.log("result: ", result);
            return result
        }).catch( (err) => {
            console.log(err);
            handleResponse(res, 500, err);
        })

    if(foundUser.length != 1) {
        handleResponse(res, 400, "Invalid Credentials")
        return
    }

    await bcrypt.compare(req.body.password, foundUser[0].password, function(err, result) {
        if(err) {
            handleResponse(res, 500, {message: "bcrypt failure"})
        } else if(result) {
            // console.log(result);
            req.session.username = req.body.username
            console.log(foundUser);
            handleResponse(res, 200, {
                message: "successful login",
                userId: foundUser[0].user_id
            })
        } else {
            handleResponse(res, 401, {message: "authentication failed"})
        }
    });
});

auth.post('/signUp', async (req,res,next) => {
    console.log("req.body: ", req.body);
    // await knex('users').select('user_id').then(result => {
    //     console.log("show results: ", result);
    // })
    // console.log("after select await");

    if(req.body.username == null || req.body.username == "") {
        handleResponse(res, 400, 'Bad Request')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    await knex('users')
            .returning("*")
            .insert({
                user_id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                username: req.body.username,
                password: hashedPassword,
                email: req.body.username + "@gmail.com"
            })
            .then(resultUser => {
                console.log(resultUser);
                console.log("User signup: " + req.body.username)
                req.session.username = req.body.username
                //! TEMPORARILY DO THIS, MOVE THIS OUT OR SOMETHING LATER OR DO SOMETHING ABOUT THIS HOLY SHIT
                //! INSERTING USER INTO PLAYERS TABLE AS WELL TO MAKE SIGN UP WORK
                let player = knex('players')
                                    .returning("*")
                                    .insert({
                                        player_id: resultUser[0].user_id
                                    })
                                    .then(result => {
                                        console.log("created Player of User: ");
                                        console.log(result);

                                        handleResponse(res, 200, {
                                            message: "successful sign up",
                                            userId: resultUser[0].user_id
                                        })
                                    })

            })
            .catch( (err) => {
                console.log("catching error: ", err);
                if (err.constraint == 'users_username_unique') {
                    handleResponse(res, 400, 'Username already exists');
                } else {
                    console.log(err);
                    handleResponse(res, 500, err);
                }
            })
})


function handleResponse(res, code, message, otherParameters = []) {
    res.status(code).json(message);
  }

module.exports.auth = auth;