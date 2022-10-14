const express = require('express');
const search = express.Router();
const knex = require('../dbconfig');

//grab players by substring or all
// router.get('/autoComplete/:substring', authHelpers.loginRequired, function(req, res, next) {
search.post('/:substring', async function(req, res, next) {
    console.log(req.params.substring)
    console.log(req.body)
    const listOfTypes = ['sets', 'users', 'tournaments', 'events', 'games']
    const queryable = {
        sets: {
            tableName: "sets",
            idName: "set_id",
            humanReadableName: ""
        },
        users: {
            tableName: "users",
            idName: "user_id",
            humanReadableName: "given_name"
        },
        tournaments: {
            tableName: "tournaments",
            idName: "tournament_id",
            humanReadableName: "tournament_name"
        },
        events: {
            tableName: "events",
            idName: "event_id",
            humanReadableName: "event_name"
        },
        games: {
            tableName: "games",
            idName: "game_id",
            humanReadableName: ""
        }
    }

    const filters = req.body.filters
    const searchParam = req.params.substring
    const useFilters = Object.values(filters).includes(true)

    if(filters == null) {
        console.log("No filter provided");
        return handleResponse(res, 400, "No filter provided.")

    }

    let coalesceResults = {}

    for(let type of listOfTypes) {
        if(useFilters && !filters[type]) { //* so if the filter is not true, skip this one
            coalesceResults[type] = [] //* set empty array to not break expected response format
            continue
        }

        await knex(queryable[type].tableName)
        .select("*")
        .where(queryable[type].humanReadableName, 'ilike', `%${searchParam}%`)
        .then( results => {
            console.log("results!!");
            console.log(results);
            coalesceResults[type] = results
        })
        .catch(err => {
            console.log("do nothing...")
            // console.log(err)
            coalesceResults[type] = []
        })
    }

    console.log("coalesceResults")
    console.log(coalesceResults)
    return res.status(200).json(coalesceResults)
} )

function handleResponse(res, code, message) {
    return res.status(code).json({ message });
}


module.exports.search = search;