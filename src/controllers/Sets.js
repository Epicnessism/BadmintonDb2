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
    console.log(`body of insert: ${JSON.stringify(body)}`);
    await knex('sets')
        .insert({
            set_id: body.setId,
            bracket_id: body.bracketId,
            event_game_number: body.eventGameNumber,
            team_1_id: body.team_1_id,
            team_2_id: body.team_2_id,
            game_type: body.gameType,
            completed: body.completed,
            winning_team: body.winningTeam
        })
        .onConflict(['set_id'])
        .merge()
        .returning("*")
        .then(resultInsert => {
            console.log("result of insertion: ");
            console.log(resultInsert);
            response = { status: 201, message: "Successfully inserted set" }
        })
        .catch(err => {
            console.log("Sets.js::34 error inserting set: ");
            console.log(err);
            if (err.code == '23503') {
                response = { status: 400, message: "One or more player_ids do not exist" };
            } else {
                response = { status: 500, message: err }
            }
        });
    return response;
}

async function updateSetTeam(setId, teamIdMapList) {
    let response = null;
    console.log(`setId: ${setId}:${teamIdMapList}`);
    await knex('sets').where('set_id', setId).update(teamIdMapList[0].columnName, teamIdMapList[0].value)
    return { status: 201, message: "Successfully updated set"}
}

/**
 *
 * @param {a Set Body} body
 * @returns something like a {status:, message:}???
 */
async function findOrInsertNextSet(bracket_id, set, nextGameNumber, team_id) {
    // let nextGameNumber = calculateNextWinnerGameNumber(eventDetails.bracket_size, set.event_game_number); //todo move this out into separate func and insert
    console.log("inside findInsertNextSet");
    console.log(nextGameNumber);
    console.log(team_id);
    console.log(bracket_id);
    if (!set.completed) {
        console.log("Set incomplete, not inserting next set");
        return { status: 400, message: 'Set not completed' }
    }

    let nextSet = null;

    await knex('sets')
        .select('*')
        .where('bracket_id', bracket_id)
        .andWhere('event_game_number', nextGameNumber) //TODO rename this column at some point
        .then(foundNextSet => {
            nextSet = foundNextSet
        })

    // let playersToInsert = findWinningTeam(set);
    console.log(`found next set: ${nextSet.length}`);
    let resultsInsertNextSet = null

    if (nextSet.length == 1) {
        nextSet = nextSet[0];

        console.log("next set????");
        console.log(nextSet);
        let team = ''
        if (!doPlayersExistInSet(nextSet, team_id)) {
            //players do not exist in the already existing set, so find empty spots and add them
            if (nextSet.team_1_id == null) {
                //add to team 1
                // nextSet.team_1_id = team_id;
                team = 'team_1_id'
            } else {
                //add to team 2
                // nextSet.team_2_id = team_id;
                team = 'team_2_id'
            }
            let teamIdMap = [{
                columnName: team,
                value: team_id
            }]
            console.log(teamIdMap);
            resultsInsertNextSet = await updateSetTeam(nextSet.set_id, teamIdMap)

        }
    } else {
        //create new Set with the new game_number and with this player/players inserted
        nextSet = {
            setId: uuidv4(),
            // tournament_id: eventDetails.tournament_id,
            bracketId: bracket_id,
            eventGameNumber: nextGameNumber,
            team_1_id: team_id, //TODO determine top and bottom team_id to add to
            team_2_id: null,
            gameType: set.gameType,
        }
        console.log('before insert new set');
        resultsInsertNextSet = await insertSet(nextSet)
    }
    console.log('after insert new set');
    // console.log("reaching insertSet of NextSet: ");
    // console.log(nextSet);
    // console.log("reaching resultsInsertNextSet: ");
    // console.log(resultsInsertNextSet);
    return resultsInsertNextSet;
}


/**
 * @warn no validation on SetObject input
 * @param {} setObject
 * @returns
 */
function findWinningTeam(setObject) {
    // console.log('inside find winning team: %s', setObject);
    return setObject.winningTeam == 1 ? setObject.team_1_id : setObject.team_2_id
}


function findLosingTeam(setObject) {
    return setObject.winningTeam == 1 ? setObject.team_2_id : setObject.team_1_id
}


function doPlayersExistInSet(setObject, team_id) {
    return setObject.team_1_id == team_id
}

/**
 * validates the input of a set object for team_ids, game type, completed, and winning_team
 * @param {} game
 * @returns
 */
function validateSetFormatData(set) {
    var response = { message: [] }

    // let setId = req.body.set_id != null ? req.body.set_id : uuidv4(); //TODO set this to null?

    if ((set.team_1_id == null || set.team_2_id == null)) {
        response.message.push('team_1_id and/or team_2_id is null which is not a valid team_id value')
    }

    if (set.team_1_id == null || !validateUUID(set.team_1_id)) {
        response.message.push('team_1_id is not a valid uuid')
    }

    if (set.team_2_id != null && !validateUUID(set.team_2_id)) {
        response.message.push('team_2_id is not a valid uuid')
    }

    // //todo make sure completed and winners are in sync
    // if ((set.completed && set.winning_team == null) || (!set.completed && set.winning_team != null)) {
    //     response.message.push('completed and winning_team not in the right state')
    // }

    console.log("validation response array", response.message);

    if (response.message.length != 0) {
        response.status = 400
    }
    return response
}

async function updateEventsToTeams(trx, eventId, teamId, gamesPlayed) {
    let results = null;
    await knex('events_to_teams')
        .update({'games_played': gamesPlayed})
        .where('team_id', teamId)
        .andWhere('event_id', eventId)
        .transacting(trx)
        .then( result => {
            console.log(`result of updating events to teams with games_played status: ${result}`);
            results = result
        })
    return results
}

async function findNextLoserBracket(eventId, bracketLevel, bracketSize, eventGameNumber) {
    let response = null;
    console.log("inside findLoserBracket");
    //*first if bracket is A or C, and game is less than 3s/4 find next bracket to dropdown into.
    if ((bracketLevel == 'A' || bracketLevel == 'C') && eventGameNumber <= (3 * bracketSize / 4)) {
        //*then find event_id of next bracket
        let newBracketLevel = null;
        if (bracketLevel == 'A' && eventGameNumber <= bracketSize / 2) {
            //*first round dropdowns, so go from A to C
            // console.log(Brackets.toLevel(Brackets.toValue(bracketLevel) - 2));
            newBracketLevel = Brackets.toLevel(Brackets.toValue(bracketLevel) - 2)
        } else {
            //*second round dropdowns, go from A to B or C to D
            newBracketLevel = Brackets.toLevel(Brackets.toValue(bracketLevel) - 1)
        }
        console.log("new bracketLevel");
        console.log(newBracketLevel);
        await knex('brackets')
            .select('*')
            .andWhere('bracket_level', newBracketLevel)
            .andWhere('event_id', eventId)
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
    return response; //*null if knocked out of tournament
}

// TODO s == bracketsize...fix this code to be moreadable
function calculateNextWinnerGameNumber(s, currentGameNumber) {
    console.log(s);
    console.log(currentGameNumber);
    let levels = [];
    let startingGame = [];
    let s1 = s;
    let sumGamesLevels = [];
    let g2 = null;

    //* I think this while loop just constructs the bracket....?
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

    //*calculates next seeded game number
    for (let i = 0; i <= startingGame.length; i++) {
        if (currentGameNumber == s - 1) {
            //return null/0/na something to denote no more games to play
            console.log("return null/0/na something to denote no more games to play");
            return null; //TODOD RETURN -1 AND HANDLE THAT AS A SUCCESS
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

function generateBracketSkeleton(bracketSize) {
    let depthOfBracket = Math.log2(bracketSize);
    let bracket = []

    let startingGameNumber = 1
    for(let layer = 1; layer <= depthOfBracket; layer++) {
      let numGamesInThisLayer = bracketSize / Math.pow(2, layer)

      let thisLayer = Array.from({ length: numGamesInThisLayer }).map((u, i) => {return {"eventGameNumber" : startingGameNumber++}})
      bracket.push(thisLayer)
    }
    console.log(bracket);
    return bracket;

  }


function calculateNextLoserGameNumber(bracketSize, gameNumber) {
    let workingGameNumber = gameNumber; //11
    let emptyBracket = generateBracketSkeleton(bracketSize)
    // if(dropdown) //todo implement types of tournaments later
    for( let depth of emptyBracket) {
        console.log(depth);
        console.log(!depth.some( tile => tile.eventGameNumber == gameNumber));
        if(!depth.some( tile => tile.eventGameNumber == gameNumber)) {
            workingGameNumber -= depth.length
        } else {
            break
        }
    }

    return Math.ceil(workingGameNumber / 2)
}

module.exports = {
    insertSet,
    validateSetFormatData,
    findOrInsertNextSet,
    calculateNextWinnerGameNumber,
    calculateNextLoserGameNumber,
    findWinningTeam,
    findNextLoserBracket,
    findLosingTeam,
    updateEventsToTeams
}