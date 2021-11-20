exports.up = function(knex) {
    return knex.schema.createTable('tournament_admins', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.uuid('user_id').notNullable();

        table.foreign('tournament_id').references('tournaments.tournament_id');
        table.foreign('user_id').references('users.user_id');
        table.unique(['tournament_id', 'user_id']);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tournament_admins');
  };