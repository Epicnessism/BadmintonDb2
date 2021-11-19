exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('players').del()
    .then(function () {
      // Inserts seed entries
      return knex('players').insert([
        {player_id: "123e4567-e89b-12d3-a456-426614174000", gender: 'M', level: 'C', hand: 'L', location: 'VA', institution: 'GMU'},
        {player_id: "101e4567-e89b-12d3-a456-426614174111", gender: 'M'},
        {player_id: "143e4567-e89b-12d3-a456-426614174033", gender: 'F', level: 'B', hand: 'R', location: 'VA', institution: 'GMU'},
        {player_id: "144e4567-e89b-12d3-a456-426614174001", gender: 'F', level: 'A', hand: 'R', location: 'VA', institution: 'GMU'},
        {player_id: "155e4567-e89b-12d3-a456-426614174009", gender: 'M', level: 'A', hand: 'R', location: 'VA'},
      ]);
    });
};