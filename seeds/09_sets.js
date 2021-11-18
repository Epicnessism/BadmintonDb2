
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sets').del()
    .then(function () {
      // Inserts seed entries
      return knex('sets').insert([
        {id: 1, set_id: '155e4567-e89b-12d3-a456-426614174029', game_id: '155e4567-e89b-12d3-a456-426614174019'},
      ]);
    });
};
