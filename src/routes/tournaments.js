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


//adds a list of players to the tournament
tournaments.post('/addPlayers', function(req, res, next) {
    console.log(req.body);
    knex('tournaments')
        .update({
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
})



//update a game
tournaments.post('/gameUpdate', function(req, res, next) {
    console.log(req.body);
    
})


function handleResponse(res, code, message) {
    res.status(code).json({message});
}

module.exports.tournaments = tournaments;