exports.up = function(knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id');
        table.uuid('event_id').notNullable().unique();
        table.uuid('tournament_id').notNullable();
        table.string('event_type',2).notNullable().defaultTo('NA'); //MS/WS/MD/WD/XD/NA
        table.integer('bracket_size').defaultTo(0).notNullable();
        table.string('bracket_level',1).defaultTo(null); //A/B/C/D/etc
        
        table.foreign('tournament_id').references('tournaments.tournament_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('events');
  };