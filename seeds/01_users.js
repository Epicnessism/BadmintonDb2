exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {user_id: "123e4567-e89b-12d3-a456-426614174000", username: "epicnessism", password: "testpwd", given_name: 'tony', family_name: 'wang', birthday: '06/20/1997', email: "testemail1@gmail.com"},
          {user_id: "101e4567-e89b-12d3-a456-426614174111", username: "test2", password: "testpwd", given_name: 'gus', family_name: 'walzer', birthday: '01/01/1987', email: "testemail2@gmail.com"},
          {user_id: "143e4567-e89b-12d3-a456-426614174033", username: "test3", password: "testpwd", given_name: 'zoe', family_name: 'xu', birthday: '06/20/1996', email: "testemail3@gmail.com"},
          {user_id: "144e4567-e89b-12d3-a456-426614174001", username: "test5", password: "testpwd", given_name: 'pralfah', family_name: 'somethingLong', birthday: '06/20/1996', email: "testemail4@gmail.com"},
          {user_id: "155e4567-e89b-12d3-a456-426614174009", username: "test111", password: "testpwd", given_name: 'kyle', family_name: 'lin', birthday: '01/20/1994', email: "testemail5@gmail.com"},
        ]);
      });
  };