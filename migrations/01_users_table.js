exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.uuid('user_id').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('given_name');
        table.string('family_name');
        table.date('birthday');
        table.string('email').notNullable();

        //contraints
        table.unique('user_id');
        table.unique('username');
        table.unique('email');

    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
