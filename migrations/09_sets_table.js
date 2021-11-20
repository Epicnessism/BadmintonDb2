exports.up = function(knex) {
    return knex.schema.createTable('sets', table => {
        table.increments('id');
        table.uuid('set_id').notNullable().unique();
        table.uuid('tournament_id').nullable();
        table.uuid('event_id').nullable();
        table.integer('event_game_number').nullable();

        table.uuid('player_id_1').notNullable();
        table.uuid('player_id_2').nullable();
        table.uuid('player_id_3').notNullable();
        table.uuid('player_id_4').nullable();

        table.string('game_type').notNullable(); //'singles'/'doubles' //TODO probably can get rid of this
        table.boolean('completed').defaultsTo(false);

        table.foreign('player_id_1').references('users.user_id');
        table.foreign('player_id_2').references('users.user_id');
        table.foreign('player_id_3').references('users.user_id');
        table.foreign('player_id_4').references('users.user_id');
        table.foreign('tournament_id').references('tournaments.tournament_id');
        table.foreign('event_id').references('events.event_id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sets');
  };