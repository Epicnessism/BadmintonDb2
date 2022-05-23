const express = require('express');
const search = express.Router();
const knex = require('../dbconfig');

//grab players by substring or all
// router.get('/autoComplete/:substring', authHelpers.loginRequired, function(req, res, next) {
search.post('/:substring', function(req, res, next) {
    console.log(req.params.substring)
    console.log(req.body)
    const queryable = {
        sets: {
            tableName: "sets",
            idName: "set_id"
        },
        players: {
            tableName: "players",
            idName: "player_id"
        },
        tournaments: {
            tableName: "tournaments",
            idName: "tournament_id"
        },
        events: {
            tableName: "events",
            idName: "event_id"
        },
        games: {
            tableName: "games",
            idName: "game_id"
        }
    }

    const filters = req.body.filters
    const searchParam = req.params.substring
    let queryObject = {}



    if(filters.sets) queryObject = queryable.sets
    if(filters.players) queryObject = queryable.players
    if(filters.tournaments) queryObject = queryable.tournaments
    if(filters.events) queryObject = queryable.events
    if(filters.games) queryObject = queryable.games
    console.log(queryObject);

    knex(queryObject.tableName)
    .select("*")
    .where(queryObject.idName, searchParam)
    .then( result => {
        console.log(result);
        if(result.length == 0) {
            return handleResponse(res, 404, "Did not find any records.")
        }
        handleResponse(res, 200, result)
    })
    .catch( error => {
        console.log(error);
        if(error.routine == "string_to_uuid") {
            return handleResponse(res, 400, "Bad Request")
        }
        return handleResponse(res, 500, error)
    })
} )

function handleResponse(res, code, message) {
    return res.status(code).json({ message });
}


module.exports.search = search;