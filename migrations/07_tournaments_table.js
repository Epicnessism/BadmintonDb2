exports.up = function(knex) {
    return knex.schema.createTable('tournaments', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.string('location');
        table.string('institution_hosting');
        table.dateTime('hosting_date');
        
        table.unique('tournament_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tournaments');
  };