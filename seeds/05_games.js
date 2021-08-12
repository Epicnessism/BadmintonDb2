
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {game_id: '155e4567-e89b-12d3-a456-426614174019', player_id_1: '123e4567-e89b-12d3-a456-426614174000', player_id_3: '143e4567-e89b-12d3-a456-426614174033', created_timestamp: new Date(2021,0,10,10), team_1_points: 21, team_2_points: 18, game_type: 'singles'},
      ]);
    });
};
