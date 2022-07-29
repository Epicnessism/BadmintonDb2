const express = require('express');
const players = express.Router();
const knex = require('../dbconfig');


players.get('/:player_identifier', function(req, res, next) {
    console.log(req.params.player_identifier);
    //do validation logic here
    knex('users')
    .select("*")
    .leftJoin('players', 'players.player_id', 'users.user_id')
    .where('users.given_name', 'ilike', `%${req.params.player_identifier}%`)
    .orWhere('users.family_name', 'ilike', `%${req.params.player_identifier}%`)
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
})

players.get('/autocomplete/:player_identifier', function(req, res, next) {
    console.log(req.params.player_identifier);
    //do validation logic here
    knex('users')
    .select('user_id as userId',
    'given_name as givenName',
    'family_name as familyName',
    knex.raw(`CONCAT(given_name, ' ', family_name) as "fullName"`))
    .leftJoin('players', 'players.player_id', 'users.user_id')
    .where('users.given_name', 'ilike', `%${req.params.player_identifier}%`)
    .orWhere('users.family_name', 'ilike', `%${req.params.player_identifier}%`)
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
})

module.exports.players = players;