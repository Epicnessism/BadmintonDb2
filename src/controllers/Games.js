const knex = require('../dbconfig');
const { v4: uuidv4, validate: validateUUID } = require('uuid');
var moment = require('moment');

/**
 * 
 * @param {current accepts a Set Body with gameScores and all Set metadata} body 
 * @returns 
 */
async function insertGames(setObject) {
    //after inserting the set, attempt to insert the game details now
    //game details should be an array and looped through to support multiple game updations
    console.log("inside insertGames");
    
    //gameScores = [{gameNumber:1, team_1_points: 21, team_2_points: 18}]
    let gameScores = setObject.game_scores;
    if(gameScores) {
        for(const game of gameScores) {
            let validation = validateGameInput(game);
            if(validation.status != 400) {
                await knex('games')
                    .insert({
                        game_id: game.gameId != null ? game.gameId : uuidv4(),
                        set_id: setObject.set_id,
                        team_1_points: game.team_1_points,
                        team_2_points: game.team_2_points,
                        completed: game.completed,
                        created_timestamp: moment(setObject.created_timestamp).valueOf(),
                        game_number: game.game_number
                    })
                    .onConflict(['game_id'])
                    .merge()
                    .returning("*")
                    .then( resultInsert => {
                        console.log(resultInsert);
                    })
                    .catch( err => { //also catch if tournament_id doesn't exist error
                        console.log(err);
                        return {status: 500, message: err};
                    });
            } else {
                return {status: validation.status, message: validation.message}
            }
        }
        return {status: 200, message: "All games inserted"};
    } else {
        return {status: 203, message: "No game scores to input"};
    }
}

/**
 * validates the scores for a game
 * @param {*} game 
 */
function validateGameInput(game) {
    let response = {status: 200, message: 'Good input'};
    if( (!(game.team_1_points >= game.team_2_points + 2) && game.team_1_points > game.team_2_points) 
    || (!(game.team_2_points >= game.team_1_points + 2) && game.team_2_points > game.team_1_points) ) {
        console.log("Score is not win by 2");
        response = {status: 400, message: 'Score is not win by 2'};
    } else if( (!(game.team_1_points >= 21) && game.team_1_points > game.team_2_points) 
    || (!(game.team_2_points >= 21) && game.team_2_points > game.team_1_points) ) {
        console.log("Score is not at least 21 on one side");
        response = {status: 400, message: 'Score is not at least 21 on one side'};
    }
    return response;
}


module.exports = {insertGames, validateGameInput}