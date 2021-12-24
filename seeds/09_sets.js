
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
          player_id_3: '101e4567-e89b-12d3-a456-426614174111', 
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 1
        },
        {
          set_id: '6e4a6800-a168-45cd-b51f-73d26ccf8151',
          event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', 
          player_id_1: '15703364-b3fc-4e82-9752-32c187c2b254', 
          player_id_3: 'cf9bdd43-baf2-4d63-a5fc-163e01cf429c', 
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 2
        },
        {
          set_id: 'edce0108-06a6-4be9-a803-f2b2a957be63',
          event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', 
          player_id_1: '7c72223f-c428-4a1f-805e-c2bc16540138', 
          player_id_3: 'f77a3a0d-bb1b-460b-9fa1-6ffa8fe96f06', 
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 3
        },
        {
          set_id: '4289fd23-64b0-4fbd-90bd-6d03187ac046',
          event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', 
          player_id_1: 'd686fece-741b-426b-b202-34ab0e019caa', 
          player_id_3: '3a9f4bcd-6acb-4c57-8ceb-1bb18fec53c8', 
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 4
        },
        {
          set_id: '4db90e6a-57cb-45d0-947c-5eeeebcc57b6',
          event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', 
          player_id_1: 'ff1ca758-edef-4050-8124-55048e7d68af', 
          player_id_3: 'd50d55d6-0907-497c-9b69-7e7fcf1ffc44', 
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 5
        },
        {
          set_id: '0f267a74-a479-412c-bec6-4e5346a0636b',
          event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', 
          player_id_1: 'dc39b65d-e991-4598-9bfb-f65400c39007', 
          player_id_3: 'd51ac89c-577a-4f61-9dcb-1f8d72207564', 
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 6
        },
        {
          set_id: 'cd8f66b7-6a85-4507-89c9-5adc41a0ab30',
          event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', 
          player_id_1: '0a5d11b4-19cb-4066-ac66-1be812f699db', 
          player_id_3: 'bbb6e8bf-cb18-49a4-aee4-65ad6950f759', 
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 7
        },
        {
          set_id: 'f8a2553d-93de-4620-b488-eddd1c85d5eb',
          event_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97',
          tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', 
          player_id_1: 'b4a5e5e7-d955-4200-a41c-d22211827e75', 
          player_id_3: '6f7303e7-fb96-49fa-9fcd-4b1d880e3591', 
          created_timestamp: 1637485200000, 
          game_type: 'singles',
          event_game_number: 8
        },
      ]);
    });
};
