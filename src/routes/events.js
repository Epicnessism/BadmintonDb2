const express = require('express');
const knex = require('../dbconfig');
const events = express.Router();
const { v4: uuidv4 } = require('uuid');
var moment = require('moment');
const Sets = require('../controllers/Sets');
const Games = require('../controllers/Games');
const StateEnum = require('../models/StateEnum')

events.post('/updateState', async (req, res, next) => {
    /**
     * expected json body
     * {
     *      eventId: 'uuid_here',
     *      tournamentId: 'uuid_here',
     *      state: 'not started | in progress | finished',
     *      force: boolean (optional)
     * }
     */
    //check req.session.userId is in admin table
    //check tournament is in a valid state
    //check that event is in a valid state too
    //write to event record if checks pass
    //return 201 if successful
    //return 400 if validation failed
    //return 500 if db failure
    console.log(req.session.userId);
    if (req.session.userId === undefined) {
        // return next("Not Signed In")
        return res.status(401).json("Not Signed In")
    }

    let desiredState  = StateEnum.getStateEnumByValue(req.body.state)

    if(desiredState === undefined) {
        return res.status(400).json("Bad Request Given")
    }

    knex.transaction((trx) => {

        knex('tournament_admins as ta')
            .leftJoin('tournaments as t', 'ta.tournament_id','t.tournament_id')
            .where('ta.tournament_id', req.body.tournamentId)
            .andWhere('ta.user_id', req.session.userId)
            .transacting(trx)
            .then( tournamentAdminState => {
                if(tournamentAdminState.length != 1) {
                    throw new Error('Unauthorized user')
                }
                //check tournament state here
                console.log('tournamentState: ', tournamentAdminState[0].state)
                if(tournamentAdminState[0].state !== 'In Progress' ) {
                    throw new Error('Invalid Tournament State')
                }

                return knex('events')
                    .where('event_id', req.body.eventId)
                    .transacting(trx)
                    .then( events => {
                        console.log(events);
                        if (events.length !== 1) {
                            throw new Error('Invalid event')
                        }
                        console.log(! StateEnum.getStateEnumByValue(events[0].state)[desiredState.name.toUpperCase()] && !req.body.force);
                        if(! StateEnum.getStateEnumByValue(events[0].state)[desiredState.name.toUpperCase()] && !req.body.force ) {
                            throw new Error('Force necessary')
                        }

                        return knex('events')
                            .where('event_id', req.body.eventId)
                            .update({
                                state: desiredState.value
                            })
                            .transacting(trx)
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
    .then( inserts => {
        console.log(inserts, 'in the THEN after transaction')
        return res.status(201).json(inserts)
    })
    .catch( err => {
        console.log(err, "line 64")
        console.log(err.message);
        if(err.message === 'Force necessary') {
            return res.status(403).json(err.message)
        }
        if(err.message === 'Invalid event') {
            return res.status(400).json(err.message)
        }
        return next(err)
    })
})

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

events.get('/getEventMetadata/:eventId', async (req, res, next) => {
    await knex('events')
        .where('event_id', req.params.eventId)
        .then( result => {
            console.log(result);
            res.status(200).json(result)
            //todo implement controls and checks later
        })
})

//save seeding
events.post('/:eventId/seeding', async (req, res, next) => {
    console.log(req.body);
    let seedings = req.body.seedings;

    await knex('events_to_teams')
    .insert(seedings)
    .onConflict(['event_id','team_id'])
    .merge()
    .returning("*")
    .then(result => {
        console.log(result)
        return result
    })
    .catch(err => {
        console.log(err)
        return handleResponse(res, 500, err)
    })

    let temp = []
    for(let i = 0; i < req.body.event_size / 2; i++) {

        let eventGameNumber = i + 1
        let pairedTeam = req.body.event_size - 1 - i
        console.log("eventGameNumber evens: " + eventGameNumber)
        console.log("pairdTeam evens: " + pairedTeam)

        //TODO IMPLEMENT AUTOMATIC SEEDING
        // //* if seed is even number, find reverse game number for bottom of bracket
        // if((i + 1) % 2 === 0) {
        //     eventGameNumber = (req.body.event_size - i + 1) / 2
        //     console.log("eventGameNumber evens: " + eventGameNumber)
        //     console.log("pairdTeam evens: " + pairedTeam)
        // } else {
        //     eventGameNumber = i + 1
        //     console.log("eventGameNumber odds: " + eventGameNumber)
        //     console.log("pairdTeam odds: " + pairedTeam)
        // }

        if(seedings[i] == undefined) {
            break
        }

        let set = {
            set_id : uuidv4(),
            bracket_id : req.body.bracket_id,
            event_game_number : eventGameNumber,
            game_type: req.body.is_doubles ? "doubles" : "singles",
            team_1_id : seedings[i].team_id,
            team_2_id : seedings[pairedTeam]?.team_id ?? null,
            created_timestamp : moment(Date.now()).valueOf(),
            completed : false,
            winning_team : null
        }

        temp.push(set)


    }

    console.log(temp);


    // // //* check set format validation
    // let validationResponse = Sets.validateSetFormatData(req.body);

    // if (validationResponse.status == 400) {
    //     console.log("handleResponse set format error");
    //     handleResponse(res, validationResponse.status, validationResponse.message)
    //     return
    // }



    const insertion = await populateSeedToSetsTable(temp)
    console.log(insertion);
    return res.status(201).json(insertion)
})


//write seedings to sets table
// events.post('/:eventId/updateBracketSeeding', async (req, res, next) => {}

//todo will need to calculate the two fighting teams....lmao
async function populateSeedToSetsTable(seedData) {

    const insertion = await knex("sets")
    .insert(seedData)
    .onConflict(['bracket_id', 'event_game_number'])
    .merge()
    .then(result => {
        console.log(result)
        return true
    })
    .catch(err => {
        console.log(err)
        return false
    })
    console.log(insertion)
    return insertion

}

function handleResponse(res, code, message) {
    return res.status(code).json({ message });
}


module.exports.events = events;