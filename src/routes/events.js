const express = require('express');
const knex = require('../dbconfig');
const events = express.Router();
const { v4: uuidv4 } = require('uuid');
var moment = require('moment');
const Sets = require('../controllers/Sets');
const Games = require('../controllers/Games');


events.get('/:eventId/seeding', async (req, res, next) => {
    console.log(req.params);

    //todo figure out how to transform data models....
    await knex('events_to_teams as ett').select(
        'ett.team_id as teamId',
        'ett.seeding as seeding',
        knex.raw("(array_agg(distinct concat(u.given_name, ' ', u.family_name) ) filter (where ttp.player_id_1 = u.user_id))[1] as player_1_name"),
        knex.raw("(array_agg(distinct concat(u.given_name, ' ', u.family_name) ) filter (where ttp.player_id_2 = u.user_id))[1] as player_2_name"),
        )
        .from('events_to_teams as ett')
        .leftJoin('teams_to_players as ttp', 'ett.team_id', 'ttp.team_id')
        .leftJoin('users as u', (b1) =>
            b1.on('ttp.player_id_1', '=', 'u.user_id')
            .orOn('ttp.player_id_2', '=', 'u.user_id')
        )
        .where('ett.event_id', req.params.eventId)
        .groupBy('ett.team_id', 'ett.seeding',
        )
        .orderBy('ett.seeding')
        .then(results => {
            console.log(results)
            res.status(200).json(results)
        })
        .catch(err => {
            console.log(err)
            return handleResponse(res, 500, err)
        })
})

events.post('/:eventId/seeding', async (req, res, next) => {
    console.log(req.body);

    await knex('events_to_teams')
    .insert(req.body.seedings)
    .onConflict(['event_id','team_id'])
    .merge()
    .returning("*")
    .then(result => {
        console.log(result)
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err)
        return handleResponse(res, 500, err)
    })
})

function handleResponse(res, code, message) {
    return res.status(code).json({ message });
}


module.exports.events = events;