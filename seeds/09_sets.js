
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sets').del()
    .then(function () {
      // Inserts seed entries
      return knex('sets').insert([
        {
          set_id: '155e4567-e89b-12d3-a456-426614174029',
          bracket_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b',
          team_1_id: '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7',
          team_2_id: 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b',
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 1
        },
        {
          set_id: '6e4a6800-a168-45cd-b51f-73d26ccf8151',
          bracket_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b',
          team_1_id: 'd5e2c5fb-3bc3-44b6-97b3-b51e9dc95e0e',
          team_2_id: 'd880a7a7-9585-432a-a8f5-e1308c721d64',
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 2
        },
        {
          set_id: 'edce0108-06a6-4be9-a803-f2b2a957be63',
          bracket_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b',
          team_1_id: 'f1ef9388-a84b-4dd1-b7da-8bc4ba6bbc1d',
          team_2_id: '1a7b2f45-2189-4077-af1f-7ba6f914d9bc',
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 3
        },
        {
          set_id: '4289fd23-64b0-4fbd-90bd-6d03187ac046',
          bracket_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b',
          team_1_id: 'e3966a5c-b680-4ab8-918e-626416fa804a',
          team_2_id: '2b82c7fc-1cc3-4447-b372-aca20f551c5a',
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 4
        },
        {
          set_id: '4db90e6a-57cb-45d0-947c-5eeeebcc57b6',
          bracket_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b',
          team_1_id: '7356e7da-78fe-4533-9295-30a5d9f6d2a9',
          team_2_id: '1c459944-0b46-4266-92f6-ad40d3c80aac',
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 5
        },
        {
          set_id: '0f267a74-a479-412c-bec6-4e5346a0636b',
          bracket_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b',
          team_1_id: '65d5ef04-5d80-45be-a684-11a355066f11',
          team_2_id: 'da3bb9b0-6063-44b2-9301-22f3472b2cc3',
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 6
        },
        {
          set_id: 'cd8f66b7-6a85-4507-89c9-5adc41a0ab30',
          bracket_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b',
          team_1_id: 'fae12a33-7039-4db6-ad90-72f6abaee9b4',
          team_2_id: 'a44268c3-7ae9-4a80-86a3-44480cc89a02',
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 7
        },
        {
          set_id: 'f8a2553d-93de-4620-b488-eddd1c85d5eb',
          bracket_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b',
          team_1_id: '03b8d7a8-9a50-4df5-82a6-163280aed500',
          team_2_id: '38760432-cfd4-43d1-8a5e-7a2208e398be',
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 8
        },
      ]);
    });
};
