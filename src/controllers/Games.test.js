const Games = require('./Games');

describe('test validate game input', () => {

    const arrayOfTestValues = [
        [{team_1_points: 21, team_2_points: 19}, {status:200, message: 'Good input'}, 'Good input 21:19'],
        [{team_1_points: 21, team_2_points: 11}, {status:200, message: 'Good input'}, 'Good input 21:11'],
        [{team_1_points: 18, team_2_points: 21}, {status:200, message: 'Good input'}, 'Good input 18:21'],
        [{team_1_points: 21, team_2_points: 20}, {status:203, message: 'Score is not win by 2'}, 'Bad input 21:20'],
        [{team_1_points: 18, team_2_points: 2}, {status:203, message: 'Score is not at least 21 on one side'}, 'Bad input 18:2'],
        [{team_1_points: 111, team_2_points: 2}, {status:400, message: 'Bogus input, score is greater than 21 and not win by 2'}, 'Bogus input 111:2']
    ]

    for(let test of arrayOfTestValues) {
        it("" + test[2], () => {
            const result = Games.validateGameInput(test[0])
            expect(result).toHaveProperty('status', test[1].status)
            expect(result).toHaveProperty('message', test[1].message)
        })
    }
});

describe('test counting number of won games for each team', () => {
    const arrayOfTestValues = [
        [[[1, 21, ''], [2, 21, '']], [[1, 19, ''], [2, 13, '']], 'best of 3 valid, 2 straight games', {teamOne: 2, teamTwo: 0}],
        [[[1, 11, '']], [[1, 21, '']], 'best of 1 valid', {teamOne: 0, teamTwo: 1}],
        [[[1, 11, '']], [[1, 19, '']], 'best of 1 invalid', {teamOne: 0, teamTwo: 0}],
        [[[1, 21, ''], [2, 19, ''], [3, 11, '']], [[1, 11, ''], [2, 19, ''], [3, 11, '']], 'best of 3 invalid', {teamOne: 1, teamTwo: 0}],
        [[[1, 21, ''], [2, 11, ''], [3, 24, '']], [[1, 11, ''], [2, 21, ''], [3, 22, '']], 'best of 3 valid, 3 games', {teamOne: 2, teamTwo: 1}]
    ]

    for(let test of arrayOfTestValues) {
        it("Test valid game input: " + test[2], () => {
            const result = Games.calculateGamesWonForBothTeams(test[0], test[1])
            console.log(result);
            expect(result.teamOne).toBe(test[3].teamOne)
            expect(result.teamTwo).toBe(test[3].teamTwo)
        })
    }
})


describe('test finding winning team automatically', () => {
    const arrayOfTestValues = [
        [[[1, 21, ''], [2, 21, '']], [[1, 19, ''], [2, 13, '']], 3, 'best of 3 valid, 2 straight games', 1],
        [[[1, 21, ''], [2, 21, '']], [[1, 19, ''], [2, '13', '']], 3, 'best of 3 valid, 2 straight games WITH TEXT/NUMBER INPUT', 1],
        [[[1, '21', ''], [2, '21', '']], [[1, '19', ''], [2, '13', '']], 3, 'best of 3 valid, 2 straight games WITH TEXT INPUT', 1],
        [[[1, 11, '']], [[1, 21, '']], 1, 'best of 1 valid', 2],
        [[[1, 11, '']], [[1, 19, '']], 1, 'best of 1 invalid', -1],
        [[[1, 21, ''], [2, 19, ''], [3, 11, '']], [[1, 11, ''], [2, 19, ''], [3, 11, '']], 3, 'best of 3 invalid', -1],
        [[[1, 21, ''], [2, 11, ''], [3, 24, '']], [[1, 11, ''], [2, 21, ''], [3, 22, '']], 3, 'best of 3 valid, 3 games', 1]
    ]

    for(let test of arrayOfTestValues) {
        it("[" + test[3] + "]", () => {
            const result = Games.calculateWinningTeam(test[0], test[1], test[2])
            console.log(result);
            expect(result).toBe(test[4])
        })
    }
})