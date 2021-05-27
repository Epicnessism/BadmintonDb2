exports.up = function(knex) {
  return knex.schema.createTable('players', table => {
      table.increments('id');
      table.uuid('player_id').notNullable();
      table.string('given_name').notNullable();
      table.string('family_name').notNullable();
      table.date('birthday').notNullable();
      table.string('level',1).defaultTo('U');
      table.string('hand', 1);
      table.string('location');
      table.string('institution');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('players');
};