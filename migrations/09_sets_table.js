exports.up = function(knex) {
    return knex.schema.createTable('sets', table => {
        table.increments('id');
        table.uuid('set_id').notNullable();
        // table.uuid('game_id').notNullable();
        table.uuid('tournament_id').nullable();
        table.uuid('event_id').nullable();
        table.integer('event_game_number').nullable();

        //MS/WS/MD/WD/XD/NA //I think we should have this for better data readability and accessibility
        table.string('event_type',2).notNullable(); //todo maybe get rid of this?
        table.foreign('event_type').references('events.event_type'); //todo maybe get rid of this?

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
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sets');
  };