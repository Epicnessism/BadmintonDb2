
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events_to_players').del()
    .then(function () {
      // Inserts seed entries
      return knex('events_to_players').insert([
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: '123e4567-e89b-12d3-a456-426614174000'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: '101e4567-e89b-12d3-a456-426614174111'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: '155e4567-e89b-12d3-a456-426614174009'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: '15703364-b3fc-4e82-9752-32c187c2b254'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: 'cf9bdd43-baf2-4d63-a5fc-163e01cf429c'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: '7c72223f-c428-4a1f-805e-c2bc16540138'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: 'f77a3a0d-bb1b-460b-9fa1-6ffa8fe96f06'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: 'd686fece-741b-426b-b202-34ab0e019caa'},

        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: '3a9f4bcd-6acb-4c57-8ceb-1bb18fec53c8'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: 'ff1ca758-edef-4050-8124-55048e7d68af'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: 'd50d55d6-0907-497c-9b69-7e7fcf1ffc44'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: 'dc39b65d-e991-4598-9bfb-f65400c39007'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: 'd51ac89c-577a-4f61-9dcb-1f8d72207564'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: '0a5d11b4-19cb-4066-ac66-1be812f699db'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: 'bbb6e8bf-cb18-49a4-aee4-65ad6950f759'},
        {tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', event_id: '11094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: 'b4a5e5e7-d955-4200-a41c-d22211827e75'},

        {tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_id: '68094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: '123e4567-e89b-12d3-a456-426614174000'},
        {tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_id: '68094d2c-108e-4a58-945c-9f260d5d7cf0', player_id: '101e4567-e89b-12d3-a456-426614174111'},


        {tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', event_id: 'beb62dce-caeb-4373-b722-8aaf5dda5fa2', player_id: 'b4a5e5e7-d955-4200-a41c-d22211827e75'},
      ]);
    });
};
