exports.up = function(knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id');
        table.uuid('event_id').notNullable();
        table.uuid('tournament_id').notNullable();
        table.uuid('set_id').nullable();
        table.string('event_type',2).notNullable().defaultTo('NA'); //MS/WS/MD/WD/XD/NA
        table.integer('bracket_size').defaultTo(0).notNullable();
        
        table.unique(['tournament_id', 'set_id']);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('events');
  };