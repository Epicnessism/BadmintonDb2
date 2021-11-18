exports.up = function(knex) {
    return knex.schema.createTable('tournaments_to_players', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.uuid('player_id').notNullable();
        
        table.unique(['tournament_id', 'player_id']);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tournaments_to_players');
  };