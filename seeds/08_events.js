
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97', tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_type: 'MS', bracket_size: 16, bracket_level:'A'},
        {event_id: '783fdf65-f6bb-42b1-87f3-a01c52edabad', tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_type: 'MD', bracket_size: 16, bracket_level:'A'}
      ]);
    });
};