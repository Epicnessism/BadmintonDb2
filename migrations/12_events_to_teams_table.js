exports.up = function(knex) {
    return knex.schema.createTable('events_to_teams', table => {
        table.increments('id');
        table.uuid('event_id').notNullable();
        table.uuid('team_id').notNullable();
        table.integer('seeding').defaultTo(-1);
        table.boolean('fully_registered').defaultTo(false);

        table.integer('games_played').defaultTo(0);
        table.boolean('eliminated').defaultTo(false);
        table.uuid('current_bracket').defaultTo(null); //*should only really be used in dropdown tournaments

        table.foreign('event_id').references('events.event_id');
        table.foreign('team_id').references('teams_to_players.team_id');
        table.foreign('current_bracket').references('brackets.bracket_id');
        table.unique(['event_id', 'team_id']);
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('events_to_teams');
  };