const Sets = require('./Sets');

describe('test finding winning team', () => {
    const arrayOfTestValues = [
        [1, '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7', 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b', 'winning team 1', '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7'],
        [2, '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7', 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b', 'winning team 2', 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b'],
    ]
    
    for(let test of arrayOfTestValues) {
        it(test[3], () => {
            let setObject = {winning_team: test[0], team_id_1: test[1], team_id_2: test[2]}
            expect(Sets.findWinningTeam(setObject)).toBe(test[4])
        })
    }
});


describe('test finding losing team', () => {
    const arrayOfTestValues = [
        [2, '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7', 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b', 'losing team 2', '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7'],
        [1, '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7', 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b', 'losing team 1', 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b'],
    ]
    
    for(let test of arrayOfTestValues) {
        it(test[3], () => {
            let setObject = {winning_team: test[0], team_id_1: test[1], team_id_2: test[2]}
            expect(Sets.findLosingTeam(setObject)).toBe(test[4])
        })
    }
});