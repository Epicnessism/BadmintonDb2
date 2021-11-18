exports.up = function(knex) {
    return knex.schema.createTable('sets', table => {
        table.increments('id');
        table.uuid('set_id').notNullable();
        table.uuid('game_id').notNullable();
        
        table.uuid('tournament_id').nullable();
        
        table.foreign('game_id').references('games.game_id');

        table.foreign('tournament_id').references('tournaments.tournament_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sets');
  };