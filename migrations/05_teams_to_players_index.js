
exports.up = function(knex) {
  return knex.schema.raw(
    `CREATE UNIQUE INDEX on teams_to_players (least(player_id_1, player_id_2), greatest(player_id_1, player_id_2))`
  );
};

exports.down = function(knex) {
    //TODO RETURN SOMETHING??? OR MOVE THIS INTO THE TTP FILE, WHATEVER
};
