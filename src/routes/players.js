const express = require('express');
const players = express.Router();


//grab players by substring or all
// router.get('/autoComplete/:substring', authHelpers.loginRequired, function(req, res, next) {
players.get('/autoComplete/:substring', function(req, res, next) {
    console.log(req.params.substring);
    if (req.params.substring == 'all') {
        knex('players')
        .select('id', 'given_name', 'family_name')
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
    } else {
        // let temp = `%${req.params.substring}%`
        // console.log(temp);
        knex('players')
        .select('id', 'given_name', 'family_name')
        .where('given_name', 'like', `%${req.params.substring.toLowerCase()}%`)
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
    }
} )

module.exports.players = players;