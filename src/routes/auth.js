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
    let results;
    await knex('users').select('username','password').where({username: req.body.username}).then( result => {
        console.log("result: ", result);
        results = result;
    }).catch( (err) => {
        console.log(err);
        handleResponse(res, 500, err);
    })
    
    await bcrypt.compare(req.body.password, results[0].password, function(err, result) {
        if(err) {
            handleResponse(res, 500, {message: "bcrypt failure"})
        } else if(result) {
            handleResponse(res, 200, {message: "successfully logged in"})
        } else {
            handleResponse(res, 401, {message: "authentication failed"})
        }
    });
});

auth.post('/signUp', async (req,res,next) => {
    console.log("req.body: ", req.body);
    await knex('users').select('user_id').then(result => {
        console.log("show results: ", result);
    })
    console.log("after select await");
    if(req.body.username == null || req.body.username == "") {
        handleResponse(res, 400, 'Bad Request')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    await knex('users')
            .insert({
                user_id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                username: req.body.username,
                password: hashedPassword,
                email: req.body.username + "@gmail.com"
            })
            .then(result => {
                console.log(result);
                console.log("User signup: " + req.body.username)
                req.session.username = req.body.username
                handleResponse(res, 200, "User succesfully created")
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


function handleResponse(res, code, message) {
    res.status(code).json({message: message});
  }

module.exports.auth = auth;