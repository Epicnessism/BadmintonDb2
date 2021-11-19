exports.up = function(knex) {
    return knex.schema.createTable('tournaments', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.string('tournament_name').notNullable();
        table.string('location');
        table.string('institution_hosting');
        table.bigInteger('hosting_date');

        table.boolean('mens_singles').defaultTo(false);
        table.boolean('womens_singles').defaultTo(false);
        table.boolean('mens_doubles').defaultTo(false);
        table.boolean('womens_doubles').defaultTo(false);
        table.boolean('mixed_doubles').defaultTo(false);

        table.integer('mens_singles_size').defaultTo(null);
        table.integer('womens_singles_size').defaultTo(null);
        table.integer('mens_doubles_size').defaultTo(null);
        table.integer('womens_doubles_size').defaultTo(null);
        table.integer('mixed_doubles_size').defaultTo(null);
        
        table.unique('tournament_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tournaments');
  };