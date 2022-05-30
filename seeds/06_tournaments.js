
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tournaments').del()
    .then(function () {
      // Inserts seed entries
      return knex('tournaments').insert([
        { tournament_id: '6984c10a-7d68-400c-a655-d5e40ea9404b', tournament_name: 'GMU OPEN 2021 SEED', location: 'GMU RAC', institution_hosting: 'GMU Club', hosting_date: 1637485200000, tournament_type: 'ABCD Dropdown' },
        { tournament_id: '5a1c2ce6-044a-4e15-8ee1-ea89c62c65cc', tournament_name: 'VCU OPEN 2021', institution_hosting: 'VCU Club', tournament_type: 'ABCD Dropdown' },
        { tournament_id: '58d0579d-7539-4da5-b88a-a9184b13158a', tournament_name: 'Some tournament 2021', location: 'some place not here' }
      ]);
    });
};
