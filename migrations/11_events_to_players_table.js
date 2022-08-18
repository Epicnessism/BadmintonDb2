exports.up = function(knex) {
    return knex.schema.createTable('events_to_players', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.uuid('event_id').notNullable();
        table.uuid('player_id').notNullable();

        table.foreign('tournament_id').references('tournaments.tournament_id');
        table.foreign('event_id').references('events.event_id');
        table.foreign('player_id').references('users.user_id'); //TODO FIX THIS SHIT, swap to users? or add registration for players
        table.unique(['tournament_id', 'event_id', 'player_id']);
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('events_to_players');
  };