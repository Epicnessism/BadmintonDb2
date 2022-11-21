exports.up = function(knex) {
    return knex.schema.createTable('games', table => {
        table.increments('id');
        table.uuid('tournament_id').notNullable();
        table.uuid('event_id').notNullable();
        table.uuid('bracket_id').notNullable();
        table.uuid('set_id').notNullable();

        //* tournament metadata
        table.string('tournament_name').notNullable();
        table.string('location');
        table.string('institution_hosting');
        table.bigInteger('hosting_date');
        table.string('tournament_type'); //* ABCD Dropdown - etc etc
        table.string('state').defaultTo('Not Started'); //* NOT STARTED, IN PROGRESS, FINISHED

        //* event metadata
        table.string('event_type',2).notNullable().defaultTo('NA'); //MS/WS/MD/WD/XD/SS/DD/NA?
        table.integer('best_of').defaultTo(3)
        table.integer('event_size').notNullable()
        table.string('event_name').defaultTo('')
        table.boolean('is_doubles').notNullable()
        table.string('state').notNullable().defaultTo('Not Started')

        //* bracket metadata
        table.integer('bracket_size').defaultTo(0).notNullable();
        table.string('bracket_level',1).defaultTo(null); //A/B/C/D/etc


        //* set metadata
        table.integer('event_game_number').nullable(); //game number to track bracket progress
        table.bigInteger('created_timestamp');
        table.uuid('team_1_id').nullable();
        table.uuid('team_2_id').nullable();
        table.string('game_type').notNullable(); //'singles'/'doubles' //TODO probably can get rid of this
        table.boolean('completed').defaultsTo(false);
        table.integer('winning_team').nullable(); //1,2
        table.unique(['bracket_id', 'event_game_number']); // todo do i need this in this new megatable?

        //* game metadata
        table.integer('team_1_points').defaultsTo(0);
        table.integer('team_2_points').defaultsTo(0);
        table.boolean('completed').defaultsTo(false);
        table.bigInteger('created_timestamp');
        table.integer('game_number');

    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('tournaments');
  };