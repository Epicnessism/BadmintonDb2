exports.up = function(knex) {
  return knex.schema.createTable('players', table => {
      table.increments('id');
      table.uuid('player_id').notNullable().unique();
      table.string('level',1).defaultTo('U');
      table.string('hand', 1).defaultTo('U');
      table.string('gender',1).defaultTo('N');
      table.string('location');
      table.string('institution');
      
      table.foreign('player_id').references('users.user_id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('players');
};