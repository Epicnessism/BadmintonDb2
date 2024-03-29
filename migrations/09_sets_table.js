exports.up = function(knex) {
    return knex.schema.createTable('sets', table => {
        table.increments('id');
        table.uuid('set_id').notNullable().unique();
        // table.uuid('tournament_id').nullable();
        table.uuid('bracket_id').nullable();
        table.integer('event_game_number').nullable(); //game number to track bracket progress
        table.bigInteger('created_timestamp');

        table.uuid('team_1_id').nullable();
        table.uuid('team_2_id').nullable();

        table.string('game_type').notNullable(); //'singles'/'doubles' //TODO probably can get rid of this
        table.boolean('completed').defaultsTo(false);
        table.integer('winning_team').nullable(); //1,2

        table.foreign('team_1_id').references('teams_to_players.team_id');
        table.foreign('team_2_id').references('teams_to_players.team_id');
        // table.foreign('tournament_id').references('tournaments.tournament_id');
        table.foreign('bracket_id').references('brackets.bracket_id');

        table.unique(['bracket_id', 'event_game_number']);
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('sets');
  };