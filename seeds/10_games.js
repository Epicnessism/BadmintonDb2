
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {game_id: '155e4567-e89b-12d3-a456-426614174019', 
        set_id: '155e4567-e89b-12d3-a456-426614174029', 
        created_timestamp: 1637485200000, 
        team_1_points: 21, team_2_points: 18,
        game_number: 1,
        completed: true},
      ]);
    });
};
