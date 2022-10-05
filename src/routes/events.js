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
const seedResult = events.post('/:eventId/seeding', async (req, res, next) => {
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


    //write to sets table logical
    let arrayOfSetsToWrite = []
    let eventDetails = null;

    let temp = []
    for(let i = 0; i < seedings.length / 2; i++) {
        let eventGameNumber = i+1

        let set = {
            set_id : uuidv4(),
            event_id : req.body.event_id,
            tournament_id : req.body.tournament_id,
            event_game_number : eventGameNumber,
            game_type: req.body.is_doubles ? "doubles" : "singles",
            team_1_id : seedings[i].team_id,
            team_2_id : seedings[eventSize + 1 - i].team_id,
            created_timestamp : moment(setObject.created_timestamp).valueOf(),
            completed : false,
            winning_team : 1
        }

        temp.push(set)
    }

    console.log(temp);

    // seedings.forEach( seed => {
    //     console.log(seed);



    //     //* calculate pairing team by default
    //     let other_team = eventSize + 1 - seed.seeding //get seeding of this team

    //     arrayOfSetsToWrite.push(
    //         {
    //             "set_id": uuid.v4(),
    //             "event_id": seed.event_id,
    //             "tournament_id": tournament_id,
    //             "team_1_id": team_id,
    //             "team_2_id": team_2_id,
    //             "created_timestamp": ,
    //             "game_type": ,
    //             "event_game_number": 1,
    //             "completed": false,
    //             "winning_team": -1
    //         }
    //     )
    // })


    // //* check set format validation
    // let validationResponse = Sets.validateSetFormatData(req.body);

    // if (validationResponse.status == 400) {
    //     console.log("handleResponse set format error");
    //     handleResponse(res, validationResponse.status, validationResponse.message)
    //     return
    // }




    // //* caluclate winning team and completeness automatically
    // req.body.winningTeam = Games.calculateWinningTeam(req.body.team_1_points, req.body.team_2_points, 3) //todo ADD BEST OF GRAB LOGIC!
    // req.body.completed = req.body.winningTeam != -1 ? true : false
    // console.log(`winningTeam and completed: ${req.body.winningTeam}:${req.body.completed}`);






    // await populateSeedToSetsTable(req.body.seedData, req.body.placementStrategy)


    return res.status(201).json(seedResult)
})


//write seedings to sets table
// events.post('/:eventId/updateBracketSeeding', async (req, res, next) => {}

//todo will need to calculate the two fighting teams....lmao
async function populateSeedToSetsTable(seedData, placementStrategy) {
    console.log(seedData);

    await knex("sets")
        .insert()



}

function handleResponse(res, code, message) {
    return res.status(code).json({ message });
}


module.exports.events = events;