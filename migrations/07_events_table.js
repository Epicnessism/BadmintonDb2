exports.up = function(knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id');
        table.uuid('event_id').notNullable().unique();
        table.uuid('tournament_id').notNullable();
        table.string('event_type',2).notNullable().defaultTo('NA'); //MS/WS/MD/WD/XD/SS/DD/NA?
        table.integer('best_of').defaultTo(3)
        table.integer('event_size').notNullable()
        table.string('event_name').defaultTo('')
        
        table.foreign('tournament_id').references('tournaments.tournament_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('events');
  };