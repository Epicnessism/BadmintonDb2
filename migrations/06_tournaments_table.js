exports.up = function(knex) {
    return knex.schema.createTable('tournaments', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.string('tournament_name').notNullable();
        table.string('location');
        table.string('institution_hosting');
        table.bigInteger('hosting_date');
        table.string('tournament_type'); //* ABCD Dropdown - etc etc
        table.string('state').defaultTo('Not Started'); //* NOT STARTED, IN PROGRESS, FINISHED
        
        table.unique('tournament_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tournaments');
  };