exports.up = function(knex) {
    return knex.schema.createTable('events_to_teams', table => {
        table.increments('id');
        table.uuid('event_id').notNullable();
        table.uuid('team_id').notNullable();
        table.integer('seeding').defaultTo(-1);

        table.foreign('event_id').references('events.event_id');
        table.foreign('team_id').references('teams_to_players.team_id');
        table.unique(['event_id', 'team_id']);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('events_to_teams');
  };