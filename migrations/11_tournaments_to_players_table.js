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
        
        table.unique(['tournament_id', 'player_id']);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tournaments_to_players');
  };