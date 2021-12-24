
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
        {game_id: 'd21590b9-5de7-4ccd-bed0-f9a0890bbf73', 
        set_id: '155e4567-e89b-12d3-a456-426614174029', 
        created_timestamp: 1637485200000, 
        team_1_points: 16, team_2_points: 21,
        game_number: 2,
        completed: true},
        {game_id: '0215f3d0-144d-4e65-a4b0-7248b91d4643', 
        set_id: '155e4567-e89b-12d3-a456-426614174029', 
        created_timestamp: 1637485200000, 
        team_1_points: 21, team_2_points: 13,
        game_number: 3,
        completed: true},
      ]);
    });
};
