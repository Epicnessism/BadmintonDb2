exports.up = function(knex) {
    return knex.schema.createTable('brackets', table => {
        table.increments('id');
        table.uuid('bracket_id').notNullable().unique();
        table.uuid('event_id').notNullable();
        // table.string('event_type',2).notNullable().defaultTo('NA'); //MS/WS/MD/WD/XD/NA
        table.integer('bracket_size').defaultTo(0).notNullable();
        table.string('bracket_level',1).defaultTo(null); //A/B/C/D/etc
        // table.integer('best_of').defaultTo(3).notNullable()
        
        table.foreign('event_id').references('events.event_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('brackets');
  };