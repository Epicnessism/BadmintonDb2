const knex = require('../dbconfig');
const { v4: uuidv4, validate: validateUUID } = require('uuid');


/**
 * body must contain all values to set
 * create the SetId, set it into the body, and pass it into InsertSet
 * @param {*} body 
 */
async function insertSet(body) {
    let response = null;
    await knex('sets')
        .insert({
            set_id: body.set_id,
            tournament_id: body.tournament_id,
            event_id: body.event_id,
            event_game_number: body.event_game_number,
            player_id_1: body.player_id_1,
            player_id_2: body.player_id_2,
            player_id_3: body.player_id_3,
            player_id_4: body.player_id_4,
            game_type: body.game_type,
            completed: body.completed
        })
        .onConflict(['set_id'])
        .merge()
        .returning("*")
        .then( resultInsert => {
            console.log("results Set_id inserted");
            console.log(resultInsert);
            response = {status: 200, message: "Successfully inserted set"}
        })
        .catch( err => {
            console.log("error inserting set: ");
            console.log(err);
            if(err.code == '23503') {
                response = {status: 400, message: "One or more player_ids do not exist"};
            } else {
                response = {status: 500, message: err}
            }
        });
    return response;
}


/**
 * validates the input of a set object
 * @param {} game 
 * @returns 
 */
function validSetInputFields(set) {
    var response = {message: []}

    if((set.player_id_1 == null || set.player_id_3 == null) ) {
        response.message != 'player_id_1 and/or player_id_3 is null which is not a valid set\n'
    }


    if(set.game_type == 'doubles' && (set.player_id_2 == null || set.player_id_4 == null) ) {
        response.message.push('player_id_2 and/or player_id_4 are null when game_type is doubles')
    }
    if(set.game_type == 'singles' && (set.player_id_2 != null || set.player_id_4 != null) ) {
        response.message.push('player_id_2 and/or player_id_4 are NOT null when game_type is singles')
    }


    if(set.player_id_1 == null || !validateUUID(set.player_id_1)) {
        response.message.push('player_id_1 is not a valid uuid')
    }
    if(set.player_id_2 != null && !validateUUID(set.player_id_2)) {
        response.message.push('player_id_2 is not a valid uuid')
    }
    if(set.player_id_3 == null || !validateUUID(set.player_id_3)) {
        response.message.push('player_id_3 is not a valid uuid')
    }
    if(set.player_id_2 != null && !validateUUID(set.player_id_4)) {
        response.message.push('player_id_4 is not a valid uuid')
    }


    if(response.message.length != 0) {
        response.status = 400
    }

    console.log(response.message);
    return response
}



module.exports = {insertSet, validSetInputFields}