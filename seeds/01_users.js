exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          // {user_id: "12345678-e89b-12d3-a456-426614174000", username: "test", password: "test", given_name: 'testName', family_name: 'testSurname', birthday: '06/20/1997', email: "testemail1@gmail.com"},
          {user_id: "123e4567-e89b-12d3-a456-426614174000", username: "epicnessism", password: "testpwd", given_name: 'Tony', family_name: 'Wang', birthday: '06/20/1997', email: "testemail1@gmail.com"},
          {user_id: "101e4567-e89b-12d3-a456-426614174111", username: "test2", password: "testpwd", given_name: 'Gus', family_name: 'Walzer', birthday: '01/01/1987', email: "testemail2@gmail.com"},
          {user_id: "143e4567-e89b-12d3-a456-426614174033", username: "test3", password: "testpwd", given_name: 'Zoe', family_name: 'Xu', birthday: '06/20/1996', email: "testemail3@gmail.com"},
          {user_id: "144e4567-e89b-12d3-a456-426614174001", username: "test5", password: "testpwd", given_name: 'Pralfah', family_name: 'Ratchatavitayakul', birthday: '06/20/1996', email: "testemail4@gmail.com"},
          {user_id: "155e4567-e89b-12d3-a456-426614174009", username: "test111", password: "testpwd", given_name: 'Kyle', family_name: 'Lin', birthday: '01/20/1994', email: "testemail5@gmail.com"},
          {user_id: "15703364-b3fc-4e82-9752-32c187c2b254", username: "test1234", password: "testpwd", given_name: 'Alex', family_name: 'Kang', birthday: '01/20/1994', email: "testemail7@gmail.com"},
          {user_id: "cf9bdd43-baf2-4d63-a5fc-163e01cf429c", username: "test12345", password: "testpwd", given_name: 'Alan', family_name: 'Lin', birthday: '01/20/1994', email: "testemail8@gmail.com"},
          {user_id: "7c72223f-c428-4a1f-805e-c2bc16540138", username: "test12347", password: "testpwd", given_name: 'Shengke', family_name: 'Lin', birthday: '01/20/1994', email: "testemail9@gmail.com"},
          {user_id: "f77a3a0d-bb1b-460b-9fa1-6ffa8fe96f06", username: "test12348", password: "testpwd", given_name: 'Alex', family_name: 'Zhao', birthday: '01/20/1994', email: "testemail10@gmail.com"},
          {user_id: "d686fece-741b-426b-b202-34ab0e019caa", username: "test12349", password: "testpwd", given_name: 'Zirui', family_name: 'Xu', birthday: '01/20/1994', email: "testemail101@gmail.com"},
          {user_id: "3a9f4bcd-6acb-4c57-8ceb-1bb18fec53c8", username: "test12340", password: "testpwd", given_name: 'Thaya', family_name: 'Th', birthday: '01/20/1994', email: "testemail11@gmail.com"},
          {user_id: "ff1ca758-edef-4050-8124-55048e7d68af", username: "test123451", password: "testpwd", given_name: 'Jonathan', family_name: 'Lu', birthday: '01/20/1994', email: "testemail12@gmail.com"},
          {user_id: "d50d55d6-0907-497c-9b69-7e7fcf1ffc44", username: "test123452", password: "testpwd", given_name: 'Joe', family_name: 'Huang', birthday: '01/20/1994', email: "testemail13@gmail.com"},
          {user_id: "dc39b65d-e991-4598-9bfb-f65400c39007", username: "test123453", password: "testpwd", given_name: 'Hakeem', family_name: 'Azoor', birthday: '01/20/1994', email: "testemail14@gmail.com"},
          {user_id: "d51ac89c-577a-4f61-9dcb-1f8d72207564", username: "test123454", password: "testpwd", given_name: 'Minho', family_name: 'Im', birthday: '01/20/1994', email: "testemail15@gmail.com"},
          {user_id: "0a5d11b4-19cb-4066-ac66-1be812f699db", username: "test123455", password: "testpwd", given_name: 'Usaid', family_name: 'Abid', birthday: '01/20/1994', email: "testemail16@gmail.com"},
          {user_id: "bbb6e8bf-cb18-49a4-aee4-65ad6950f759", username: "test123456", password: "testpwd", given_name: 'Andrew', family_name: 'Wang', birthday: '01/20/1994', email: "testemail17@gmail.com"},
          {user_id: "b4a5e5e7-d955-4200-a41c-d22211827e75", username: "test123457", password: "testpwd", given_name: 'Tim', family_name: 'Zhao', birthday: '01/20/1994', email: "testemail18@gmail.com"},
          {user_id: "6f7303e7-fb96-49fa-9fcd-4b1d880e3591", username: "test123458", password: "testpwd", given_name: 'Hung', family_name: 'Ng', birthday: '01/20/1994', email: "testemail19@gmail.com"},
        ]);
      });
  };