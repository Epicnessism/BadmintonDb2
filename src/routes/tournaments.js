const express = require('express');
const tournaments = express.Router();


//grab players by substring or all
// router.get('/autoComplete/:substring', authHelpers.loginRequired, function(req, res, next) {
    tournaments.post('/create', function(req, res, next) {
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

//return any number of tournaments with the same substring name
tournaments.get('/:tournamentNameSubstring', function(req, res, next) {

}) 


//return list of tournaments that match the ids
tournaments.get('/:tournamentId', function(req, res, next) {

})


//adds a list of players to the tournament
tournaments.post('/addPlayers', function(req, res, next) {
    
})



//update a game
tournaments.post('/gameUpdate', function(req, res, next) {
    console.log(req.body);
    
})


module.exports.tournaments = tournaments;