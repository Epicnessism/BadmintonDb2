const express = require('express');
// const { default: knex } = require('knex');
const knex = require('../dbconfig');
const games = express.Router();
const { v4: uuidv4, validate: validateUUID } = require('uuid');

games.get('/getGame/:game_id', function(req, res, next) {

})

games.get('/getGame/all/:game_ids', function(req, res, next) {

})

//create game
games.post('/createGame', function(req, res, next) {
    console.log('body of request: ',req.body);
    

    //TODO USERNAME/SESSION VALIDATION

    validationResponse = validGameInputFields(req.body);
    console.log("validationresponse message: ", uuidv4(),uuidv4(),uuidv4(),uuidv4(),uuidv4() );
    if(validationResponse.status == 400) {
        handleResponse(res, validationResponse.status, validationResponse.message)
    } else {
        knex('games')
        .insert({
            game_id: uuidv4(),
            player_id_1: req.body.player_id_1,
            player_id_2: req.body.player_id_2,
            player_id_3: req.body.player_id_3,
            player_id_4: req.body.player_id_4,
            team_1_points: req.body.team_1_points,
            team_2_points: req.body.team_2_points,
            game_type: req.body.game_type,
        })
        .returning('*')
        .then(result => {
            console.log("result: ", result);
            handleResponse(res, 201, "Game successfully created");
        })
        .catch( (err) => {
            console.log("catching error: ", err.code);
            if(err.code == '23503') {
                handleResponse(res, 400, "One or more player_ids do not exist")
            }
            // console.log(err.message);
            handleResponse(res, 500, err);
        })
    }
})

function validGameInputFields(game) {
    console.log('game validation game: ', game.player_id_1);
    var response = {message: []}

    if((game.player_id_1 == null || game.player_id_3 == null) ) {
        response.message != 'player_id_1 and/or player_id_3 is null which is not a valid game\n'
    }


    if(game.game_type == 'doubles' && (game.player_id_2 == null || game.player_id_4 == null) ) {
        response.message.push('player_id_2 and/or player_id_4 are null when game_type is doubles')
    }
    if(game.game_type == 'singles' && (game.player_id_2 != null || game.player_id_4 != null) ) {
        response.message.push('player_id_2 and/or player_id_4 are NOT null when game_type is singles')
    }


    if(game.player_id_1 == null || !validateUUID(game.player_id_1)) {
        response.message.push('player_id_1 is not a valid uuid')
    }
    if(game.player_id_2 != null && !validateUUID(game.player_id_2)) {
        response.message.push('player_id_2 is not a valid uuid')
    }
    if(game.player_id_3 == null || !validateUUID(game.player_id_3)) {
        response.message.push('player_id_3 is not a valid uuid')
    }
    if(game.player_id_2 != null && !validateUUID(game.player_id_4)) {
        response.message.push('player_id_4 is not a valid uuid')
    }


    if(response.message.length != 0) {
        response.status = 400
    }

    console.log(response.message);
    return response
}



games.delete('/deleteGame', function(req, res, next) {

})

games.patch('/updateGame', function(req, res, next) {

})

function handleResponse(res, code, message) {
    res.status(code).json({message});
}

module.exports.games = games;