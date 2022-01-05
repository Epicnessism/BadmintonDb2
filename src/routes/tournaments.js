const express = require('express');
const knex = require('../dbconfig');
const tournaments = express.Router();
const { v4: uuidv4 } = require('uuid');
var moment = require('moment');
const Sets = require('../controllers/Sets');
const Games = require('../controllers/Games');

//grab players by substring or all
// router.get('/create', authHelpers.loginRequired, function(req, res, next) {
tournaments.post('/create', function (req, res, next) {
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
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            handleResponse(res, 500, err);
        });
})

//return any number of tournaments with the same substring name
tournaments.get('/:tournamentNameSubstring', function (req, res, next) {

})


tournaments.patch('/editMetaData', function (req, res, next) {
    console.log(req.body);
})


//adds a list of players to the tournament
tournaments.post('/addPlayers', async function (req, res, next) {
    console.log(req.body);
    let result = await knex('tournaments')
        .where('tournament_id', req.body.tournament_id)
        .then(resultFind => {
            console.log(resultFind);
            return resultFind;
        })
        .catch(err => { //also catch if tournament_id doesn't exist error
            console.log(err);
            handleResponse(res, 500, err);
        });

    console.log(result);
    if (result.length == 1) {
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
            .then(resultInsert => {
                console.log(resultInsert);
                res.status(200).json(resultInsert);
            })
            .catch(err => { //also catch if tournament_id doesn't exist error
                console.log(err);
                handleResponse(res, 500, err);
            });

    } else {
        handleResponse(res, 400, "Tournament Not Found");
    }
})


// router.get('/autoComplete/:substring', authHelpers.loginRequired, function(req, res, next) {
tournaments.get('/getAllPlayers/:tournamentId', function (req, res, next) {
    console.log(req.params.tournamentId);
    knex('tournaments_to_players')
        .select("*")
        .where('tournament_id', req.params.tournamentId)
        .then(result => {
            console.log(result);
            if (result.length == 1) {
                res.status(200).json(result);
            } else if (result == 0) {
                handleResponse(res, 400, "TournamentID doesn't exist");
            }
        })
        .catch(err => { //also catch if tournament_id doesn't exist error
            console.log(err);
            handleResponse(res, 500, err);
        });
});


// tournaments.get('/getBracketMetaData/:event_id')

tournaments.get('/getBracketSetData/:event_id', async function (req, res, next) {
    console.log(req.params);

    // await knex('sets').select( 
    //     's.id as db_set_id',
    //     's.set_id',
    //     's.event_id',
    //     's.game_type',
    //     's.player_id_1 as p1_id',
    //     's.player_id_2 as p2_id',
    //     's.player_id_3 as p3_id',
    //     's.player_id_4 as p4_id',
    //     'p1.given_name as p1_given', 'p1.family_name as p1_family',
    //     'p2.given_name as p2_given', 'p2.family_name as p2_family',
    //     'p3.given_name as p3_given', 'p3.family_name as p3_family',
    //     'p4.given_name as p4_given', 'p4.family_name as p4_family',
    //     'g.team_1_points', 'g.team_2_points', 'g.game_number', 'g.game_id')
    //     .from('sets as s')
    //     .leftJoin('users as p1', 's.player_id_1', 'p1.user_id')
    //     .leftJoin('users as p2', 's.player_id_2', 'p2.user_id')
    //     .leftJoin('users as p3', 's.player_id_3', 'p3.user_id')
    //     .leftJoin('users as p4', 's.player_id_4', 'p4.user_id')
    //     .leftJoin('games as g', 'g.set_id', 's.set_id')
    //     .where('s.event_id', req.params.event_id)
    //     .orderBy('s.id', 'asc')
    //     .then(result => {
    //         console.log(result);
    //         if (result.length > 1) {
    //             res.status(200).json({result})
    //         } else {
    //             handleResponse(res, 400, "Bad Request")
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error.message);
    //         handleResponse(res, 500, 'Something went wrong on our end')
    //     })

    //given an event_id, get all sets and games for that bracket and return
    await knex('sets').select( 
        's.id as db_set_id',
        's.set_id',
        's.event_id',
        's.game_type',
        // 's.player_id_1 as p1_id',
        // 's.player_id_2 as p2_id',
        // 's.player_id_3 as p3_id',
        // 's.player_id_4 as p4_id',
        // 'p1.given_name as p1_given', 'p1.family_name as p1_family',
        // 'p2.given_name as p2_given', 'p2.family_name as p2_family',
        // 'p3.given_name as p3_given', 'p3.family_name as p3_family',
        // 'p4.given_name as p4_given', 'p4.family_name as p4_family',
        knex.raw("array_agg(distinct concat(g.game_number, ':', g.team_1_points)) as t1_pts"),
        knex.raw("array_agg(distinct concat(g.game_number, ':', g.team_2_points)) as t2_pts"),
        knex.raw("array_agg(distinct s.tournament_id) as tournament"),
        knex.raw("array_agg(distinct s.event_id) as event"),
        knex.raw("array_agg(distinct (s.player_id_1, s.player_id_2, s.player_id_3, s.player_id_4)) as player_ids")
        )
        .from('sets as s')
        .leftJoin('users as p1', 's.player_id_1', 'p1.user_id')
        .leftJoin('users as p2', 's.player_id_2', 'p2.user_id')
        .leftJoin('users as p3', 's.player_id_3', 'p3.user_id')
        .leftJoin('users as p4', 's.player_id_4', 'p4.user_id')
        .leftJoin('games as g', 'g.set_id', 's.set_id')
        .where('s.event_id', req.params.event_id)
        .groupBy('s.id','s.set_id','s.event_id','s.game_type')
        .then(result => {
            console.log(result);
            if (result.length > 1) {
                res.status(200).json({result})
            } else {
                handleResponse(res, 400, "Bad Request")
            }
        })
        .catch(error => {
            console.log(error.message);
            handleResponse(res, 500, 'Something went wrong on our end')
        })
})


/**
 * inputs the results of a set/game for a tournament and calculates the next seeding/set creation
 * or if the next game is already created, add the corresponding players to it
 * should also handle bracket dropdowns accordingly
 */
tournaments.post('/updateSet', async function (req, res, next) {
    console.log(req.body);
    let eventDetails = null;
    await knex('events')
        .select("*")
        .where('event_id', req.body.event_id)
        .then(result => {
            console.log("RESULTS OF FINDING EVENT_ID");
            console.log(result);
            if (result.length == 1) {
                eventDetails = result[0];
            } else {
                handleResponse(res, 400, "Event Not Found");
            }
        })
        .catch(err => {
            console.log(err.message);
            handleResponse(res, 500, err);
        });

    let setId = req.body.set_id != null ? req.body.set_id : uuidv4();


    let validationResponse = Sets.validSetInputFields(req.body);

    if (validationResponse.status == 400) {
        handleResponse(res, validationResponse.status, validationResponse.message)
    } else {
        let response = await Sets.insertSet(req.body)
        console.log(response);
        if (response.status == 200) {

            let insertGameResponse = await Games.insertGames(req.body)
            if (insertGameResponse.status != 200) {
                handleResponse(res, insertGameResponse.status, insertGameResponse.message);
                return;
            }

            //after creating games, check for nextSet logic
            let nextWinnerGameNumber = Sets.calculateNextWinnerGameNumber(eventDetails.bracket_size, req.body.event_game_number)
            let nextLoserGameNumber = Sets.calculateNextLoserGameNumber(req.body.event_game_number)
            let nextSetResponse = await Sets.findOrInsertNextSet(eventDetails, req.body, nextWinnerGameNumber, Sets.findWinningTeam(req.body))

            let nextLoserEvent = await Sets.findNextLoserBracket(eventDetails, req.body)
            let nextLoserSetResponse = null;
            if (nextLoserEvent != null) {
                nextLoserSetResponse = await Sets.findOrInsertNextSet(nextLoserEvent, req.body, nextLoserGameNumber, Sets.findLosingTeam(req.body))
            }

            // console.log("nextSetResponse Response: ");
            // console.log(nextSetResponse);
            //send response back after everything
            res.status(nextSetResponse.status).json(nextSetResponse.message) //todo fix this
        } else {
            handleResponse(res, response.status, response.message)
        }
    }


})


function handleResponse(res, code, message) {
    res.status(code).json({ message });
}

module.exports.tournaments = tournaments;