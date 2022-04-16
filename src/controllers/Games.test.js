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
    


    // const arrayOfTestValues = [
    //     [1, '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7', 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b', 'winning team 1', '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7'],
    //     [2, '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7', 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b', 'winning team 2', 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b'],
    // ]
    
    // for(let test of arrayOfTestValues) {
        // it(test[3], () => {
        //     let setObject = {winning_team: test[0], team_id_1: test[1], team_id_2: test[2]}
        //     expect(Sets.findWinningTeam(setObject)).toBe(test[4])
        // })
    // }


});