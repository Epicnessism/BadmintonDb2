const Sets = require('./Sets');

test('test finding winning team', () => {
    let setObject = {winning_team: 1, team_id_1: '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7'}
    expect(Sets.findWinningTeam(setObject)).toBe('7bf6a4da-f11d-4fd6-864a-c5be2737c0e7');
});