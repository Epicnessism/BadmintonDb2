const express = require('express');
const players = express.Router();
const knex = require('../dbconfig');

//grab players by substring or all
// router.get('/autoComplete/:substring', authHelpers.loginRequired, function(req, res, next) {
players.get('/autoComplete/:substring', function(req, res, next) {
    console.log(req.params.substring);
    if (req.params.substring == 'all') {
        knex('users')
        .select('user_id', 'player_id', 'given_name', 'family_name')
        .leftJoin('players', 'players.player_id', 'users.user_id')
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
    } else {
        // let temp = `%${req.params.substring}%`
        // console.log(temp);
        knex('users')
        .select('user_id', 'player_id', 'given_name', 'family_name')
        .leftJoin('players', 'players.player_id', 'users.user_id')
        .where('given_name', 'like', `%${req.params.substring.toLowerCase()}%`)
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
    }
} )

players.get('/:player_id', function(req, res, next) {
    console.log(req.params.player_id);
    //do validation logic here
    knex('users')
    .select()
    .leftJoin('players', 'players.player_id', 'users.user_id')
    .where('players.player_id', req.params.player_id)
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
})

module.exports.players = players;