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


tournaments.get('/getEventMetaData/:event_id', async function (req, res, next) {
    console.log(req.params);
    await knex('events')
        .select()
        .from('events')
        .where('event_id', req.params.event_id)
        .then( result => {
            if(result.length != 1) {
                return handleResponse(res, 500, 'Too many records')
            }
            console.log('result of getMetaData: %s', result)
            return res.status(200).json(result)
        })
})

tournaments.get('/getBracketSetData/:event_id', async function (req, res, next) {
    console.log(req.params);
    await knex('sets').select(
        'sets.set_id',
        'sets.event_id',
        'sets.game_type',
        'sets.event_game_number',
        'sets.completed', 
        'sets.winning_team',
        'sets.team_1_id as team_1_id',
        'sets.team_2_id as team_2_id',
        'sets.tournament_id as tournament_id',
        knex.raw("array_agg(distinct array[cast(games.game_number as text), cast(games.team_1_points as text), cast(games.game_id as text)]) as team_1_points"),
        knex.raw("array_agg(distinct array[cast(games.game_number as text), cast(games.team_2_points as text), cast(games.game_id as text)]) as team_2_points"),
        knex.raw("array_agg(distinct concat(users.given_name, ' ', users.family_name) ) filter (where teams_to_players.team_id = sets.team_1_id) as team_1_names"),
        knex.raw("array_agg(distinct concat(users.given_name, ' ', users.family_name)) filter (where teams_to_players.team_id = sets.team_2_id) as team_2_names"),
        knex.raw("array_agg(distinct concat(teams_to_players.player_id_1 , '|', teams_to_players.player_id_2) ) filter (where teams_to_players.team_id = sets.team_1_id) as team_1_player_ids"),
        knex.raw("array_agg(distinct concat(teams_to_players.player_id_1 , '|', teams_to_players.player_id_2)) filter (where teams_to_players.team_id = sets.team_2_id) as team_2_player_ids"),
        )
        .from('sets')
        .joinRaw(knex.raw('left join games on sets.set_id = games.set_id'))
        .joinRaw(knex.raw('left join teams_to_players on teams_to_players.team_id = any (array[sets.team_1_id, sets.team_2_id])'))
        .joinRaw(knex.raw('left join users on users.user_id = any (array[teams_to_players.player_id_1, teams_to_players.player_id_2])'))
        .where('sets.event_id', req.params.event_id)
        .groupBy('sets.set_id','sets.event_id',
        'sets.game_type','sets.event_game_number', 
        'sets.completed', 'sets.winning_team',
        'sets.team_1_id', 'sets.team_2_id',
        'sets.tournament_id')
        .orderBy('sets.event_game_number')
        .then(result => {
            console.log(result);
            console.log(result.length);
            if (result.length >= 1) {
                res.status(200).json(result)
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
    // console.log(req.body);
    let eventDetails = null;

    let validationResponse = Sets.validateSetFormatData(req.body);
    if (validationResponse.status == 400) {
        console.log("handleResponse set format error");
        handleResponse(res, validationResponse.status, validationResponse.message)
        return
    }

    /*
    attempt to find the setId in the events table to see if it exists. If it doesn't exist, throw 404
    */
    await knex('events')
        .select("*")
        .where('event_id', req.body.event_id)
        .then(result => {
            // console.log("RESULTS OF FINDING EVENT_ID: ");
            // console.log(result);
            if (result.length == 1) {
                eventDetails = result[0];
            } else {
                handleResponse(res, 400, "Event Not Found")
                return
            }
        })
        .catch(err => {
            console.log(err.message)
            handleResponse(res, 500, err)
            return
        });

    console.log("RESULTS OF FINDING EVENT_ID: ")
    console.log(eventDetails)

    // how to validate if team_ids exist? 
    //todo get setData from db based on setId?
    await knex('sets')
        .select("*")
        .where('set_id', req.body.set_id)
        .andWhere('team_1_id', req.body.team_1_id)
        .andWhere('team_2_id', req.body.team_2_id)
        .then(result => { //TODO consider creating a function to check that results exists...
            // console.log("RESULTS OF FINDING SET_ID AND TEAM_IDS: ");
            // console.log(result);
            if (result.length != 1) {
                console.log("handleResponse 400 set not found")
                handleResponse(res, 400, "Set Not Found")
                return
            }
        })
        .catch(err => {
            console.log(err.message)
            console.log("handleResponse 500")
            handleResponse(res, 500, err)
            return
        });
    
    //insert set
    const response = await Sets.insertSet(req.body) //TODO this should be just a completed/winning patch...
    console.log(response)

    if (response.status != 200) {
        console.log("handleResponse failure not 200 insertSet")
        handleResponse(res, response.status, response.message)
        return
    }

    //insert the games of the set
    let insertGameResponse = await Games.insertGames(req.body)
    console.log("Insert Games Response: ", insertGameResponse);
    if (insertGameResponse.status != 200) {
        console.log("handleResponse failure not 200 inserGames");
        handleResponse(res, insertGameResponse.status, insertGameResponse.message);
        return
    }

    console.log(eventDetails);
    //after creating games, check for nextSet logic
    let nextWinnerGameNumber = Sets.calculateNextWinnerGameNumber(eventDetails.bracket_size, req.body.event_game_number)
    let nextLoserGameNumber = Sets.calculateNextLoserGameNumber(req.body.event_game_number)

    console.log(nextWinnerGameNumber + " : " + nextLoserGameNumber);

    let nextSetResponse = await Sets.findOrInsertNextSet(eventDetails, req.body, nextWinnerGameNumber, Sets.findWinningTeam(req.body))

    console.log(nextSetResponse);
    console.log("after net set response ---------------------");
    let nextLoserEvent = await Sets.findNextLoserBracket(eventDetails, req.body)
    let nextLoserSetResponse = null;
    console.log("after next loser event");
    console.log(nextLoserEvent);
    if (nextLoserEvent != null) {
        nextLoserSetResponse = await Sets.findOrInsertNextSet(nextLoserEvent, req.body, nextLoserGameNumber, Sets.findLosingTeam(req.body))
    }

    console.log("nextSetResponse Response: ");
    console.log(nextSetResponse);
    //send response back after everything
    // res.status(nextSetResponse.status).json(nextSetResponse.message) //todo fix this
    return handleResponse(res, nextSetResponse.status, nextSetResponse.message)
})


function handleResponse(res, code, message) {
    return res.status(code).json({ message });
}

module.exports.tournaments = tournaments;