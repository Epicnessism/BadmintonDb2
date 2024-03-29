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

    //gameScores = [{gameNumber:1, team_1_points: 21, team_2_points: 18}]
    console.log(`setObject to insert games for: ${JSON.stringify(setObject)}`);

    let gameScores = setObject.team_1_points != null && setObject.team_2_points != null
    if(gameScores) {
        for(const [index, game] of Object.entries(setObject.team_1_points)) {
            const gameObject = {"game_id": game[2] , "team_1_points" : game[1], "team_2_points" : setObject.team_2_points[index][1]}
            let validation = validateGameInput(gameObject);
            const completedGame = validation.status == 200
            if( (completedGame && validation.status == 200 ) || ( !completedGame && validation.status == 203) ) {
                await knex('games')
                    .insert({
                        game_id: gameObject.game_id != null ? gameObject.game_id : uuidv4(),
                        set_id: setObject.setId,
                        team_1_points: gameObject.team_1_points,
                        team_2_points: gameObject.team_2_points,
                        completed: completedGame,
                        created_timestamp: moment(setObject.created_timestamp).valueOf(),
                        game_number: game[0]
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
        // console.log({status: 200, message: "All games inserted"});
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
        response = {status: 203, message: 'Score is not win by 2'};
    } else if( (!(game.team_1_points >= 21) && game.team_1_points > game.team_2_points)
    || (!(game.team_2_points >= 21) && game.team_2_points > game.team_1_points) ) {
        console.log("Score is not at least 21 on one side");
        response = {status: 203, message: 'Score is not at least 21 on one side'};
    }

    if ( (game.team_1_points > 21 && game.team_2_points + 2 != game.team_1_points) || (game.team_2_points > 21 && game.team_1_points + 2 != game.team_2_points) ) {
        response = {status: 400, message: 'Bogus input, score is greater than 21 and not win by 2'}
    }

    return response;
}

function convertPointStringsToNumbers(teamPoints) {
    // [[1,21,'someId'], [2,21,'someId']]
    teamPoints.forEach(gamePoints => gamePoints[1] = parseInt(gamePoints[1]))
}

function calculateGamesWonForBothTeams(team_1_points, team_2_points) {
    convertPointStringsToNumbers(team_1_points)
    convertPointStringsToNumbers(team_2_points)

    let teamOneCount = 0
    let teamTwoCount = 0

    for(const [index, game] of Object.entries(team_1_points)) {
        // console.log("the game object when calculating games won in format: [team, points] ", game);
        let winByTwo = (game[1] >=  team_2_points[index][1] + 2 ) || (game[1] + 2 <= team_2_points[index][1] )
        let atLeast21 = game[1] >= 21 || team_2_points[index][1] >= 21

        if(winByTwo && atLeast21) {
          if(game[1] > team_2_points[index][1]) {
              teamOneCount++
          }  else {
              teamTwoCount++
          }
        }
    }
    return {teamOne: teamOneCount, teamTwo: teamTwoCount}
}

function calculateWinningTeam(team_1_points, team_2_points, eventBestOf) {
    let wonGames = calculateGamesWonForBothTeams(team_1_points, team_2_points)
    let bestOfWins = Math.floor(eventBestOf/2) + 1

    if(wonGames.teamOne != bestOfWins && wonGames.teamTwo != bestOfWins) {
        return -1
    }

    if(wonGames.teamOne > bestOfWins || wonGames.teamTwo > bestOfWins) {
        return -1
    }

    let winningTeam = wonGames.teamOne > wonGames.teamTwo ? 1 : 2
    winningTeam = wonGames.teamOne == wonGames.teamTwo ? -1 : winningTeam
    console.log(`Calculated winningTeam: ${winningTeam}`);
    return winningTeam
}


module.exports = {
    insertGames,
    validateGameInput,
    calculateGamesWonForBothTeams,
    calculateWinningTeam}