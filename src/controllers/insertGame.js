function insertGames() {
    //after inserting the set, attempt to insert the game details now
    //game details should be an array and looped through to support multiple game updations
    let gameScores = req.body.game_scores; //[{gameNumber:1, team_1_points: 21, team_2_points: 18}]
    // console.log("gameScores: ");
    // console.log(req.body.game_scores);
    if(gameScores) {
        for(const game of gameScores) {
            await knex('games')
                .insert({
                    game_id: game.gameId != null ? game.gameId : uuidv4(),
                    set_id: setId,
                    team_1_points: game.team_1_points,
                    team_2_points: game.team_2_points,
                    completed: game.completed,
                    created_timestamp: moment(req.body.hosting_date).valueOf(),
                    game_number: game.game_number
                })
                .onConflict(['game_id'])
                .merge()
                .returning("*")
                .then( resultInsert => {
                    // console.log(resultInsert);
                    let nextGameNumber = calculateNextGameNumber(eventDetails.bracket_size, req.body.event_game_number);

                    res.status(200).json({"SetId": setId, "gameIds": "no game Ids yet", "next game Number": nextGameNumber})
                })
                .catch( err => { //also catch if tournament_id doesn't exist error
                    console.log(err);
                    handleResponse(res, 500, err);
                });
        }
    } else {
        handleResponse(res, 200, "Set created, no game scores to input");
    }
}