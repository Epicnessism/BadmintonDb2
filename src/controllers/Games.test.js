const Games = require('./Games');

describe('test validate game input', () => {

    const arrayOfTestValues = [
        [{team_1_points: 21, team_2_points: 19}, {status:200, message: 'Good input'}],
        [{team_1_points: 21, team_2_points: 20}, {status:400, message: 'Score is not win by 2'}],
        [{team_1_points: 18, team_2_points: 2}, {status:400, message: 'Score is not at least 21 on one side'}]
    ]

    for(let test of arrayOfTestValues) {
        it("Test valid game input: " + test[1].message, () => {
            const result = Games.validateGameInput(test[0])
            expect(result).toHaveProperty('status', test[1].status)
            expect(result).toHaveProperty('message', test[1].message)
        })
    }
});