
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97', tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_type: 'MS', bracket_size: 16, bracket_level:'A', best_of: 3},
        {event_id: '1ca913bb-0a6b-4991-88d9-594aedaf5e6c', tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_type: 'MS', bracket_size: 8, bracket_level:'C', best_of: 3},
        {event_id: '29b25062-cfc6-455c-a8bc-fb3361487337', tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_type: 'MS', bracket_size: 4, bracket_level:'B', best_of: 3},
        {event_id: 'b24a5651-db68-40b0-8e80-6194d9acb586', tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_type: 'MS', bracket_size: 4, bracket_level:'D', best_of: 3},
        {event_id: '783fdf65-f6bb-42b1-87f3-a01c52edabad', tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_type: 'MD', bracket_size: 16, bracket_level:'A', best_of: 3}
      ]);
    });
};
