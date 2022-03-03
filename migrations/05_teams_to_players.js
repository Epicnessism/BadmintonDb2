exports.up = function(knex) {
    return knex.schema.createTable('teams_to_players', table => {
        table.increments('id');
        table.uuid('team_id').notNullable().unique();
        table.uuid('player_id_1').notNullable();
        table.uuid('player_id_2');
        table.bigInteger('created_timestamp');
        table.foreign('player_id_1').references('users.user_id');
        table.foreign('player_id_2').references('users.user_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('teams_to_players');
  };