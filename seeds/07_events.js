
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('events').del()
      .then(function () {
        // Inserts seed entries
        return knex('events').insert([
          {event_id: 'beb62dce-caeb-4373-b722-8aaf5dda5fa2', tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_type: 'MS', is_doubles: false, best_of: 3, event_size: 16, event_name: "Men's Singlessfadfadf"},
          {event_id: '68094d2c-108e-4a58-945c-9f260d5d7cf0', tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_type: 'MD', is_doubles: true, best_of: 3, event_size: 16, event_name: "Men's Doublesssss"},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_type: 'MS', is_doubles: false, best_of: 3, event_size: 16, event_name: "Men's Singles"},
          {event_id: '00094d2c-108e-4a58-945c-9f260d5d7cf0', tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_type: 'MD', is_doubles: true, best_of: 3, event_size: 32, event_name: "Men's Doubles"}
        ]);
      });
  };
