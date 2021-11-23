
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sets').del()
    .then(function () {
      // Inserts seed entries
      return knex('sets').insert([
        {
          set_id: '155e4567-e89b-12d3-a456-426614174029',
          event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', 
          player_id_1: '123e4567-e89b-12d3-a456-426614174000', 
          player_id_3: '143e4567-e89b-12d3-a456-426614174033', 
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 1
        },
      ]);
    });
};
