const express = require('express');
// const { default: knex } = require('knex');
const knex = require('../dbconfig');
const sets = express.Router();
const { v4: uuidv4, validate: validateUUID } = require('uuid');
const Sets = require('../controllers/Sets');
// import * as Sets from "../controllers/Sets";

//get a set from the database
sets.get('/getSet/:set_id', function(req, res, next) {
    if(validateUUID(req.params.set_id)) {
        knex.select('s1.*', 
                    'p1.given_name as p1_given', 'p1.family_name as p1_family', 
                    'p2.given_name as p2_given', 'p2.family_name as p2_family', 
                    'p3.given_name as p3_given', 'p3.family_name as p3_family', 
                    'p4.given_name as p4_given', 'p4.family_name as p4_family')
            .from('sets as s1')
            .leftJoin('users as p1', 's1.player_id_1', 'p1.user_id')
            .leftJoin('users as p2', 's1.player_id_2', 'p2.user_id')
            .leftJoin('users as p3', 's1.player_id_3', 'p3.user_id')
            .leftJoin('users as p4', 's1.player_id_4', 'p4.user_id')
            .where('set_id', req.params.set_id)
            .then( result => {
                console.log(result);
                if(result.length == 0 || result.length > 1) {
                    console.log('found more than one game, critical error with db state');
                    handleResponse(res, 500, 'Something went wrong on our end');
                } else if(result.length == 1) {
                    handleResponse(res, 200, result)
                }
            })
            .catch( error => {
                console.log(error.message);
                handleResponse(res, 500, 'Something went wrong on our end')
            })
    } else {
        handleResponse(res, 400, 'Bad Request, not a valid uuid');
    }
})

// sets.get('/getGame/batch/:game_ids', function(req, res, next) {

// })

//create set NOT related to any tournament with any games in the body
sets.post('/createSet', async function(req, res, next) {
    console.log('body of request: ',req.body);
    
    if(req.body.tournament_id != null || req.body.event_id != null) {
        console.log('Tournament related fields should be empty.');
        handleResponse(res, 400, 'Tournament related fields should be empty.')
        return;
    }

    //TODO USERNAME/SESSION VALIDATION

    let validationResponse = Sets.validSetInputFields(req.body);
    console.log("Validation response message: ", validationResponse );

    if(validationResponse.status == 400) {
        handleResponse(res, validationResponse.status, validationResponse.message)
    } else {
        req.body.set_id = uuidv4(); //create setid
        let response = await Sets.insertSet(req.body)
        console.log(response);
        if(response.status == 200) {
            //todo NOW CREATE GAMES
            res.status(response.status).json({message: response.message})
        } else {
            handleResponse(res, response.status, response.message)
        }
    }
})





sets.delete('/deleteGame', function(req, res, next) {
    //do validation
    //if req.session.username valid

})

sets.patch('/updateGame', function(req, res, next) {

})

function handleResponse(res, code, message) {
    res.status(code).json({message});
}

module.exports.sets = sets;