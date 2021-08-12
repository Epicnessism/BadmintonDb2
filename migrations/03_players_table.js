exports.up = function(knex) {
  return knex.schema.createTable('players', table => {
      table.increments('id');
      table.uuid('player_id').notNullable();
      table.string('level',1).defaultTo('U');
      table.string('hand', 1).defaultTo('U');
      table.string('location');
      table.string('institution');

      table.unique('player_id')
      
      table.foreign('player_id').references('users.user_id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('players');
};