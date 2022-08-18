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
            idName: "set_id",
            humanReadableName: ""
        },
        players: {
            tableName: "players",
            idName: "player_id",
            humanReadableName: ""
        },
        tournaments: {
            tableName: "tournaments",
            idName: "tournament_id",
            humanReadableName: "tournament_name"
        },
        events: {
            tableName: "events",
            idName: "event_id",
            humanReadableName: ""
        },
        games: {
            tableName: "games",
            idName: "game_id",
            humanReadableName: ""
        }
    }

    if(req.body.filters == null) {
        console.log("No filter provided");
        return handleResponse(res, 400, "No filter provided.")

    } else if(!Object.values(req.body.filters).includes(true)) {
        console.log("No filter selected");
        return handleResponse(res, 400, "No filter selected.")
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
    .where(queryObject.humanReadableName, 'ilike', `%${searchParam}%`)
    // .orWhere(queryObject.idName, 'ilike', `%${searchParam}%`)
    .then( result => {
        console.log(result);
        // if(result.length == 0) {
        //     return handleResponse(res, 404, "Did not find any records.")
        // }
        return res.status(200).json(result)
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