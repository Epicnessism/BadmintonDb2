
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tournaments_to_players').del()
    .then(function () {
      // Inserts seed entries
      return knex('tournaments_to_players').insert([
        {tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', player_id: '123e4567-e89b-12d3-a456-426614174000', gender_singles: true, gender_doubles: true, mixed_doubles: true},
        {tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', player_id: '101e4567-e89b-12d3-a456-426614174111', gender_singles: true, gender_doubles: true, mixed_doubles: false},
        {tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', player_id: '143e4567-e89b-12d3-a456-426614174033', gender_singles: true, gender_doubles: true, mixed_doubles: true},
      ]);
    });
};
