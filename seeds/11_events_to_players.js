
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events_to_players').del()
    .then(function () {
      // Inserts seed entries
      return knex('events_to_players').insert([
        {tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_id: 'beb62dce-caeb-4373-b722-8aaf5dda5fa2', player_id: '123e4567-e89b-12d3-a456-426614174000'},
        {tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_id: 'beb62dce-caeb-4373-b722-8aaf5dda5fa2', player_id: '101e4567-e89b-12d3-a456-426614174111'},
        {tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_id: 'beb62dce-caeb-4373-b722-8aaf5dda5fa2', player_id: '143e4567-e89b-12d3-a456-426614174033'},
      ]);
    });
};
