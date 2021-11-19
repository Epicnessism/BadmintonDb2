const express = require('express');
const knex = require('../dbconfig');
const tournaments = express.Router();
const { v4: uuidv4 } = require('uuid');
var moment = require('moment'); // require


//grab players by substring or all
// router.get('/create', authHelpers.loginRequired, function(req, res, next) {
tournaments.post('/create', function(req, res, next) {
    console.log(req.body);
    console.log(moment(req.body.hosting_date).valueOf());
    knex('tournaments')
        .insert({
            tournament_id: uuidv4(),
            location: req.body.location,
            institution_hosting: req.body.institution_hosting,
            tournament_name: req.body.tournament_name,
            hosting_date: moment(req.body.hosting_date).valueOf(),
            mens_singles: req.body.mens_single_size != null ? true : false,
            womens_singles: req.body.womens_singles_size != null ? true : false,
            mens_doubles: req.body.mens_doubles_size != null ? true : false,
            womens_doubles: req.body.womens_doubles_size != null ? true : false,
            mixed_doubles: req.body.mixed_doubles_size != null ? true : false,
            mens_singles_size: req.body.mens_single_size,
            womens_singles_size: req.body.womens_singles_size,
            mens_doubles_size: req.body.mens_doubles_size,
            womens_doubles_size: req.body.womens_doubles_size,
            mixed_doubles_size: req.body.mixed_doubles_size,
        })
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            handleResponse(res, 500, err);
        });
} )

//return any number of tournaments with the same substring name
tournaments.get('/:tournamentNameSubstring', function(req, res, next) {

})


tournaments.patch('/editMetaData', function(req, res, next) {
    console.log(req.body);

})


//adds a list of players to the tournament
tournaments.post('/addPlayers', async function(req, res, next) {
    console.log(req.body);
    let result = await knex('tournaments')
        .where('tournament_id', req.body.tournament_id)
        .then( resultFind => {
            console.log(resultFind);
            return resultFind;
        })
        .catch( err => { //also catch if tournament_id doesn't exist error
            console.log(err);
            handleResponse(res, 500, err);
        });

    console.log(result);
    if(result.length == 1) {
        console.log('existing tournament so adding players allowed');

        //TODO VALIDATION FOR WHICH EVENTS AND SEEDS ARE ALLOWED.....
        if (req.body.gender_singles == null || !req.body.gender_singles) req.body.seed_gender_singles = null;
        if (req.body.gender_doubles == null || !req.body.gender_doubles) req.body.seed_gender_doubles = null;
        if (req.body.mixed_doubles == null || !req.body.mixed_doubles) req.body.seed_mixed_doubles = null;
        //TODO OR RETURN 400 BAD REQUEST? or both?

        knex('tournaments_to_players')
        .insert({
            tournament_id: req.body.tournament_id,
            player_id: req.body.player_id,
            gender_singles: req.body.gender_singles,
            gender_doubles: req.body.gender_doubles,
            mixed_doubles: req.body.mixed_doubles,
            seed_gender_singles: req.body.seed_gender_singles,
            seed_gender_doubles: req.body.seed_gender_doubles,
            seed_mixed_doubles: req.body.seed_mixed_doubles
        })
        .onConflict(['tournament_id', 'player_id'])
        .merge()
        .returning("*")
        .then( resultInsert => {
            console.log(resultInsert);
            res.status(200).json(resultInsert);
        })
        .catch( err => { //also catch if tournament_id doesn't exist error
            console.log(err);
            handleResponse(res, 500, err);
        });

    } else {
        handleResponse(res, 400, "Tournament Not Found");
    }
})


// router.get('/autoComplete/:substring', authHelpers.loginRequired, function(req, res, next) {
tournaments.get('/getAllPlayers/:tournamentId', function(req, res, next) {
    console.log(req.params.tournamentId);
    knex('tournaments_to_players')
        .select("*")
        .where('tournament_id', req.params.tournamentId)
        .then( result => {
            console.log(result);
            if(result.length == 1) {
                res.status(200).json(result);
            } else if(result == 0) {
                handleResponse(res, 400, "TournamentID doesn't exist");    
            }
        })
        .catch( err => { //also catch if tournament_id doesn't exist error
            console.log(err);
            handleResponse(res, 500, err);
        });
} );


//update a game
tournaments.post('/gameUpdate', function(req, res, next) {
    console.log(req.body);
    
})


function handleResponse(res, code, message) {
    res.status(code).json({message});
}

module.exports.tournaments = tournaments;