exports.up = function(knex) {
    return knex.schema.createTable('tournaments', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.string('tournament_name').notNullable();
        table.string('location');
        table.string('institution_hosting');
        table.bigInteger('hosting_date');
        table.string('state').defaultTo('Not Started');

        table.boolean('mens_singles').defaultTo(false);
        table.boolean('womens_singles').defaultTo(false);
        table.boolean('mens_doubles').defaultTo(false);
        table.boolean('womens_doubles').defaultTo(false);
        table.boolean('mixed_doubles').defaultTo(false);

        table.uuid('mens_singles_event_id').nullable();
        table.uuid('womens_singles_event_id').nullable();
        table.uuid('mens_doubles_event_id').nullable();
        table.uuid('womens_doubles_event_id').nullable();
        table.uuid('mixed_doubles_event_id').nullable();
        
        table.unique('tournament_id');
        table.foreign('mens_singles_event_id').references('events.event_id');
        table.foreign('womens_singles_event_id').references('events.event_id');
        table.foreign('mens_doubles_event_id').references('events.event_id');
        table.foreign('womens_doubles_event_id').references('events.event_id');
        table.foreign('mixed_doubles_event_id').references('events.event_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tournaments');
  };