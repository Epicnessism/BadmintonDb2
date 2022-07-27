
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teams_to_players').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams_to_players').insert([
        {id: 1, team_id: '7bf6a4da-f11d-4fd6-864a-c5be2737c0e7', player_id_1: '123e4567-e89b-12d3-a456-426614174000', player_id_2: null},
        {id: 2, team_id: 'e7fa89fd-6139-49e7-ba5a-dc487f5ff92b', player_id_1: '101e4567-e89b-12d3-a456-426614174111', player_id_2: null},
        {id: 3, team_id: 'd5e2c5fb-3bc3-44b6-97b3-b51e9dc95e0e', player_id_1: '15703364-b3fc-4e82-9752-32c187c2b254', player_id_2: null},
        {id: 4, team_id: 'd880a7a7-9585-432a-a8f5-e1308c721d64', player_id_1: 'cf9bdd43-baf2-4d63-a5fc-163e01cf429c', player_id_2: null},
        {id: 5, team_id: 'f1ef9388-a84b-4dd1-b7da-8bc4ba6bbc1d', player_id_1: '7c72223f-c428-4a1f-805e-c2bc16540138', player_id_2: null},
        {id: 6, team_id: '1a7b2f45-2189-4077-af1f-7ba6f914d9bc', player_id_1: 'f77a3a0d-bb1b-460b-9fa1-6ffa8fe96f06', player_id_2: null},
        {id: 7, team_id: 'e3966a5c-b680-4ab8-918e-626416fa804a', player_id_1: 'd686fece-741b-426b-b202-34ab0e019caa', player_id_2: null},
        {id: 8, team_id: '2b82c7fc-1cc3-4447-b372-aca20f551c5a', player_id_1: '3a9f4bcd-6acb-4c57-8ceb-1bb18fec53c8', player_id_2: null},
        {id: 9, team_id: '7356e7da-78fe-4533-9295-30a5d9f6d2a9', player_id_1: 'ff1ca758-edef-4050-8124-55048e7d68af', player_id_2: null},
        {id: 10, team_id: '1c459944-0b46-4266-92f6-ad40d3c80aac', player_id_1: 'd50d55d6-0907-497c-9b69-7e7fcf1ffc44', player_id_2: null},
        {id: 11, team_id: '65d5ef04-5d80-45be-a684-11a355066f11', player_id_1: 'dc39b65d-e991-4598-9bfb-f65400c39007', player_id_2: null},
        {id: 12, team_id: 'da3bb9b0-6063-44b2-9301-22f3472b2cc3', player_id_1: 'd51ac89c-577a-4f61-9dcb-1f8d72207564', player_id_2: null},
        {id: 13, team_id: 'fae12a33-7039-4db6-ad90-72f6abaee9b4', player_id_1: '0a5d11b4-19cb-4066-ac66-1be812f699db', player_id_2: null},
        {id: 14, team_id: 'a44268c3-7ae9-4a80-86a3-44480cc89a02', player_id_1: 'bbb6e8bf-cb18-49a4-aee4-65ad6950f759', player_id_2: null},
        {id: 15, team_id: '03b8d7a8-9a50-4df5-82a6-163280aed500', player_id_1: 'b4a5e5e7-d955-4200-a41c-d22211827e75', player_id_2: null},
        {id: 16, team_id: '38760432-cfd4-43d1-8a5e-7a2208e398be', player_id_1: '6f7303e7-fb96-49fa-9fcd-4b1d880e3591', player_id_2: null},

        {id: 17, team_id: '1bf6a4da-f11d-4fd6-864a-c5be1137c0e7', player_id_1: '123e4567-e89b-12d3-a456-426614174000', player_id_2: '101e4567-e89b-12d3-a456-426614174111'},
      ]);
    });
};
