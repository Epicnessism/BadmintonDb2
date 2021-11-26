const knex = require('../dbconfig');
const { v4: uuidv4, validate: validateUUID } = require('uuid');
const Brackets = require('./Brackets');

/**
 * body must contain all values to set
 * create the SetId, set it into the body, and pass it into InsertSet
 * @param {a Set Body} body 
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
            completed: body.completed,
            winning_team: body.winning_team
        })
        .onConflict(['set_id'])
        .merge()
        .returning("*")
        .then(resultInsert => {
            console.log("results Set_id inserted");
            console.log(resultInsert);
            response = { status: 200, message: "Successfully inserted set" }
        })
        .catch(err => {
            console.log("error inserting set: ");
            console.log(err);
            if (err.code == '23503') {
                response = { status: 400, message: "One or more player_ids do not exist" };
            } else {
                response = { status: 500, message: err }
            }
        });
    return response;
}

/**
 * 
 * @param {a Set Body} body 
 * @returns something like a {status:, message:}???
 */
async function findOrInsertNextSet(eventDetails, set, nextGameNumber, playersToInsert) {
    // let nextGameNumber = calculateNextWinnerGameNumber(eventDetails.bracket_size, set.event_game_number); //todo move this out into separate func and insert
    console.log(nextGameNumber);
    if (!set.completed) {
        console.log("Set incomplete, not inserting next set");
        return { status: 400, message: 'Set not completed' }
    }

    let nextSet = null;

    await knex('sets')
        .select('*')
        .where('event_id', eventDetails.event_id)
        .andWhere('tournament_id', eventDetails.tournament_id)
        .andWhere('event_game_number', nextGameNumber)
        .then(foundNextSet => {
            // let playersToInsert = findWinningTeam(set);
            if (foundNextSet.length == 1) {
                nextSet = foundNextSet[0];
                console.log("next set????");
                console.log(nextSet);
                if (!doPlayersExistInSet(nextSet, playersToInsert.player1, playersToInsert.player2)) {
                    //players do not exist in the already existing set, so find empty spots and add them
                    if (nextSet.player_id_1 == null) {
                        //add to players 1+2
                        nextSet.player_id_1 = playersToInsert.player1;
                        nextSet.player_id_2 = playersToInsert.player2;
                    } else {
                        //add to players 3+4
                        nextSet.player_id_3 = playersToInsert.player1;
                        nextSet.player_id_4 = playersToInsert.player2;
                    }
                }
            } else {
                //create new Set with the new game_number and with this player/players inserted
                nextSet = {
                    set_id: uuidv4(),
                    tournament_id: eventDetails.tournament_id,
                    event_id: eventDetails.event_id,
                    event_game_number: nextGameNumber,
                    player_id_1: playersToInsert.player1,
                    player_id_2: playersToInsert.player2,
                    game_type: set.game_type,
                }
            }
        })
    console.log("reaching insertSet of NextSet: ");
    console.log(nextSet);
    let resultsInsertNextSet = await insertSet(nextSet)
    console.log("reaching resultsInsertNextSet: ");
    console.log(resultsInsertNextSet);
    return resultsInsertNextSet;
}


/**
 * @warn no validation on SetObject input
 * @param {} setObject 
 * @returns 
 */
function findWinningTeam(setObject) {
    return setObject.winning_team == 1
        ? { player1: setObject.player_id_1, player2: setObject.player_id_2 }
        : { player1: setObject.player_id_3, player2: setObject.player_id_4 }
}


function findLosingTeam(setObject) {
    return setObject.winning_team != 1
        ? { player1: setObject.player_id_1, player2: setObject.player_id_2 }
        : { player1: setObject.player_id_3, player2: setObject.player_id_4 }
}


function doPlayersExistInSet(setObject, thisPlayer1, thisPlayer2) {
    if (setObject.game_type == 'singles') {
        return setObject.player_id_1 == thisPlayer1 || setObject.player_id_3 == thisPlayer1
    } else {
        return (setObject.player_id_1 == thisPlayer1 && setObject.player_id_2 == thisPlayer2)
            || (setObject.player_id_3 == thisPlayer1 && setObject.player_id_4 == thisPlayer2)
    }
}

/**
 * validates the input of a set object
 * @param {} game 
 * @returns 
 */
function validSetInputFields(set) {
    var response = { message: [] }

    if ((set.player_id_1 == null || set.player_id_3 == null)) {
        response.message != 'player_id_1 and/or player_id_3 is null which is not a valid set\n'
    }


    if (set.game_type == 'doubles' && (set.player_id_2 == null || set.player_id_4 == null)) {
        response.message.push('player_id_2 and/or player_id_4 are null when game_type is doubles')
    }
    if (set.game_type == 'singles' && (set.player_id_2 != null || set.player_id_4 != null)) {
        response.message.push('player_id_2 and/or player_id_4 are NOT null when game_type is singles')
    }


    if (set.player_id_1 == null || !validateUUID(set.player_id_1)) {
        response.message.push('player_id_1 is not a valid uuid')
    }
    if (set.player_id_2 != null && !validateUUID(set.player_id_2)) {
        response.message.push('player_id_2 is not a valid uuid')
    }
    if (set.player_id_3 == null || !validateUUID(set.player_id_3)) {
        response.message.push('player_id_3 is not a valid uuid')
    }
    if (set.player_id_2 != null && !validateUUID(set.player_id_4)) {
        response.message.push('player_id_4 is not a valid uuid')
    }

    //make sure completed and winners are in sync
    if ((set.completed && set.winning_team == null) || (!set.completed && set.winning_team != null)) {
        response.message.push('completed and winning_team not in the right state')
    }


    if (response.message.length != 0) {
        response.status = 400
    }

    console.log(response.message);
    return response
}

async function findNextLoserBracket(eventDetails, setObject) {
    let response = null;
    //first if bracket is A or C, and game is less than 3s/4 find next bracket to dropdown into.
    if ((eventDetails.bracket_level == 'A' || eventDetails.bracket_level == 'C') && setObject.event_game_number <= (3 * eventDetails.bracket_size / 4)) {
        //then find event_id of next bracket
        console.log(eventDetails.bracket_level);
        console.log(setObject.event_game_number);
        let newBracketLevel = null;
        if (eventDetails.bracket_level == 'A' && setObject.event_game_number <= eventDetails.bracket_size / 2) {
            //first round dropdowns, so go from A to C
            console.log(Brackets.toLevel(Brackets.toValue(eventDetails.bracket_level) - 2));
            newBracketLevel = Brackets.toLevel(Brackets.toValue(eventDetails.bracket_level) - 2)
        } else {
            //second round dropdowns, go from A to B or C to D
            newBracketLevel = Brackets.toLevel(Brackets.toValue(eventDetails.bracket_level) - 1)
        }
        console.log("new bracketLevel");
        console.log(newBracketLevel);
        await knex('events')
            .select('*')
            .where('tournament_id', setObject.tournament_id)
            .andWhere('bracket_level', newBracketLevel)
            .andWhere('event_type', eventDetails.event_type) //todo this is a limiting factor, it limits the organizer to 1 type of event per tournament
            .then(foundNextBracket => {
                if (foundNextBracket.length == 1) {
                    //get the set # from that event + set. If set doesn't exist, create and add, otherwise merge
                    console.log("returning foundNextBracket[0]");
                    console.log(foundNextBracket[0]);
                    response = foundNextBracket[0]
                }

            })
            .catch(err => {
                console.log("error finding set: ");
                console.log(err);
                response = { status: 500, message: err }
            })
    }
    return response; //null if knocked out of tournament
}


function calculateNextWinnerGameNumber(s, currentGameNumber) {
    // console.log(s);
    // console.log(currentGameNumber);
    let levels = [];
    let startingGame = [];
    let s1 = s;
    let sumGamesLevels = [];
    let g2 = null;

    while (s1 > 1) {
        levels.push(Math.ceil(s1 / 2));
        if (startingGame.length == 0) {
            sumGamesLevels.push(s1 / 2);
            startingGame.push(1)
        } else {
            sumGamesLevels.push(levels[levels.length - 1] + sumGamesLevels[sumGamesLevels.length - 1])
            startingGame.push(levels[levels.length - 1] + Math.ceil(s1 / 2) + startingGame[startingGame.length - 1])
        }
        s1 = Math.ceil(s1 / 2);
    }

    //calculates next seeded game number
    for (let i = 0; i <= startingGame.length; i++) {
        if (currentGameNumber == s - 1) {
            //return null/0/na something to denote no more games to play
            console.log("return null/0/na something to denote no more games to play");
            return null;
        }
        let g = Math.ceil(currentGameNumber / 2)
        if (g == startingGame[i]) {
            g2 = g + sumGamesLevels[i];
            break;
        } else if (g < startingGame[i]) {
            g2 = g + sumGamesLevels[i - 1]
            break;
        }
    }
    return g2;
}

function calculateNextLoserGameNumber(gameNumber) {
    // if(dropdown) //todo implement types of tournaments later
    return Math.ceil(gameNumber / 2)
}

module.exports = {
    insertSet,
    validSetInputFields,
    findOrInsertNextSet,
    calculateNextWinnerGameNumber,
    calculateNextLoserGameNumber,
    findWinningTeam,
    findNextLoserBracket,
    findLosingTeam
}