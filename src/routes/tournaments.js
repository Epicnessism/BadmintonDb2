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

/**
 * inputs the results of a set/game for a tournament and calculates the next seeding/set creation
 * or if the next game is already created, add the corresponding players to it
 * should also handle bracket dropdowns accordingly
 */
tournaments.post('/setUpdate', function(req, res, next) {
    let eventBracketSize = null; //todo
    let nextGameNumber = calculateNextGameNumber(eventBracketSize, req.body.gameNumber);
})


function calculateNextGameNumber(s, currentGameNumber) {
    let s = 16;
    let d = Math.log2(s);
    let currentGameNumber = 13;
    let levels = [];
    let startingGame = [];
    let s1 = s;
    let sumGamesLevels = [];

    for(let i=0; s1 > 1; i++) {
        levels.push(Math.ceil(s1/2));
        if(startingGame.length == 0) {
            // console.log(levels[levels.length-1]);
            sumGamesLevels.push(s1/2);
            startingGame.push(1)    
        } else {
            // console.log(levels[levels.length-1]);
            sumGamesLevels.push(levels[levels.length-1] + sumGamesLevels[sumGamesLevels.length-1])
            startingGame.push(levels[levels.length-1] + Math.ceil(s1/2) + startingGame[startingGame.length-1])
        }
        s1 = Math.ceil(s1/2);
    }
    console.log(levels);
    console.log(startingGame);
    console.log(sumGamesLevels);
    let g2 = null;

    //calculates next seeded game number
    for(let i=0; i <= startingGame.length; i++) {
        if(currentGameNumber == s-1) {
            //return null/0/na something to denote no more games to play
            console.log("return null/0/na something to denote no more games to play");
            return null;
        }
        let g = Math.ceil(currentGameNumber / 2)
        if(g == startingGame[i]) {
            g2 = g + sumGamesLevels[i];
            break;
        } else if(g < startingGame[i]) {
            // console.log(sumGamesLevels[i-1]);
            g2 = g + sumGamesLevels[i-1]
            break;
        }
    }
}

function handleResponse(res, code, message) {
    res.status(code).json({message});
}

module.exports.tournaments = tournaments;