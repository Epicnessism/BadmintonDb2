exports.up = function(knex) {
    return knex.schema.createTable('games', table => {
        table.increments('id');
        table.uuid('game_id').notNullable();
        table.uuid('player_id_1').notNullable();
        table.uuid('player_id_2').nullable();
        table.uuid('player_id_3').notNullable();
        table.uuid('player_id_4').nullable();
        table.timestamp('created_timestamp').defaultTo(knex.fn.now());
        table.timestamp('end_timestamp').nullable();
        table.integer('team_1_points');
        table.integer('team_2_points');
        table.string('game_type').notNullable(); //'singles'/'doubles'
        table.boolean('incomplete').defaultsTo(false);

        table.unique('game_id');

        table.foreign('player_id_1').references('users.user_id');
        table.foreign('player_id_2').references('users.user_id');
        table.foreign('player_id_3').references('users.user_id');
        table.foreign('player_id_4').references('users.user_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('games');
  };