
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tournaments_to_players').del()
    .then(function () {
      // Inserts seed entries
      return knex('tournaments_to_players').insert([
        {tournament_id: '9d975a91-f919-45fa-9a60-1edfbd36ff9f', player_id: '123e4567-e89b-12d3-a456-426614174000', gender_singles: true, gender_doubles: true, mixed_doubles: true},
        {tournament_id: '9d975a91-f919-45fa-9a60-1edfbd36ff9f', player_id: '101e4567-e89b-12d3-a456-426614174111', gender_singles: true, gender_doubles: true, mixed_doubles: false},
        {tournament_id: '9d975a91-f919-45fa-9a60-1edfbd36ff9f', player_id: '143e4567-e89b-12d3-a456-426614174033', gender_singles: true, gender_doubles: true, mixed_doubles: true},
      ]);
    });
};
