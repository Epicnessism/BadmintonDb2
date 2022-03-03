exports.up = function(knex) {
    return knex.schema.createTable('sets', table => {
        table.increments('id');
        table.uuid('set_id').notNullable().unique();
        table.uuid('tournament_id').nullable();
        table.uuid('event_id').nullable();
        table.integer('event_game_number').nullable(); //game number to track bracket progress
        table.bigInteger('created_timestamp');

        table.uuid('team_id_1').nullable();
        table.uuid('team_id_2').nullable();

        table.string('game_type').notNullable(); //'singles'/'doubles' //TODO probably can get rid of this
        table.boolean('completed').defaultsTo(false);
        table.integer('winning_team').nullable(); //1,2

        table.foreign('team_id_1').references('teams_to_players.team_id');
        table.foreign('team_id_2').references('teams_to_players.team_id');
        table.foreign('tournament_id').references('tournaments.tournament_id');
        table.foreign('event_id').references('events.event_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sets');
  };