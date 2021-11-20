exports.up = function(knex) {
    return knex.schema.createTable('games', table => {
        table.increments('id');
        table.uuid('game_id').notNullable().unique();
        table.uuid('set_id').nullable();
        table.integer('team_1_points');
        table.integer('team_2_points');
        table.boolean('completed').defaultsTo(false);
        table.timestamp('created_timestamp').defaultTo(knex.fn.now());
        table.timestamp('end_timestamp').nullable();

        table.foreign('set_id').references('sets.set_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('games');
  };