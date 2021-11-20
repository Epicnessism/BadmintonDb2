exports.up = function(knex) {
    return knex.schema.createTable('tournaments', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.string('tournament_name').notNullable();
        table.string('location');
        table.string('institution_hosting');
        table.bigInteger('hosting_date');
        table.string('state').defaultTo('Not Started');

        //todo not used at the moment. decide if we need this data or if we can use events table
        table.boolean('mens_singles').defaultTo(false).nullable();
        table.boolean('womens_singles').defaultTo(false).nullable();
        table.boolean('mens_doubles').defaultTo(false).nullable();
        table.boolean('womens_doubles').defaultTo(false).nullable();
        table.boolean('mixed_doubles').defaultTo(false).nullable();
        
        table.unique('tournament_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tournaments');
  };