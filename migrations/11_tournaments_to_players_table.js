exports.up = function(knex) {
    return knex.schema.createTable('tournaments_to_players', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.uuid('player_id').notNullable();

        table.boolean('gender_singles').defaultTo(false);
        table.boolean('gender_doubles').defaultTo(false);
        table.boolean('mixed_doubles').defaultTo(false);

        table.integer('seed_gender_singles').defaultTo(null);
        table.integer('seed_gender_doubles').defaultTo(null);
        table.integer('seed_mixed_doubles').defaultTo(null);

        table.uuid('gender_doubles_partner_id').defaultTo(null);
        table.uuid('mixed_doubles_partner_id').defaultTo(null);

        table.foreign('gender_doubles_partner_id').references('players.player_id');
        table.foreign('mixed_doubles_partner_id').references('players.player_id');
        table.foreign('tournament_id').references('tournaments.tournament_id');
        table.foreign('player_id').references('players.player_id');
        table.unique(['tournament_id', 'player_id']);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tournaments_to_players');
  };