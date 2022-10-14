exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tournament_admins').del()
      .then(function () {
        // Inserts seed entries
        return knex('tournament_admins').insert([
          // {user_id: "12345678-e89b-12d3-a456-426614174000", username: "test", password: "test", given_name: 'testName', family_name: 'testSurname', birthday: '06/20/1997', email: "testemail1@gmail.com"},
          {tournament_id: "5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc", user_id: "123e4567-e89b-12d3-a456-426614174000"},
          {tournament_id: "6984c10a-7d68-400c-a655-d5e40ea9404b", user_id: "123e4567-e89b-12d3-a456-426614174000"},
        ]);
      });
  };