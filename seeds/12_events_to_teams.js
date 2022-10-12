
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('events_to_teams').del()
      .then(function () {
        // Inserts seed entries
        // return knex('events_to_teams').insert([
        // ]);

        return knex('events_to_teams').insert([
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: 'aaa2c5fb-3bc3-44b6-97b3-b51e9dc95e0e', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: 'd5e2c5fb-3bc3-44b6-97b3-b51e9dc95e0e', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: 'd880a7a7-9585-432a-a8f5-e1308c721d64', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: 'f1ef9388-a84b-4dd1-b7da-8bc4ba6bbc1d', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: '1a7b2f45-2189-4077-af1f-7ba6f914d9bc', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: 'e3966a5c-b680-4ab8-918e-626416fa804a', seeding: -1, fully_registered: true},

          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: '2b82c7fc-1cc3-4447-b372-aca20f551c5a', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: '7356e7da-78fe-4533-9295-30a5d9f6d2a9', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: '1c459944-0b46-4266-92f6-ad40d3c80aac', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: '65d5ef04-5d80-45be-a684-11a355066f11', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: 'da3bb9b0-6063-44b2-9301-22f3472b2cc3', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: 'fae12a33-7039-4db6-ad90-72f6abaee9b4', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: 'a44268c3-7ae9-4a80-86a3-44480cc89a02', seeding: -1, fully_registered: true},
          {event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', team_id: '03b8d7a8-9a50-4df5-82a6-163280aed500', seeding: -1, fully_registered: true},

        ]);
      });
  };
