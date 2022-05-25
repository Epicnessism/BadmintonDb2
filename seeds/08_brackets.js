
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('brackets').del()
    .then(function () {
      // Inserts seed entries
      return knex('brackets').insert([
        {bracket_id: 'edde8206-78cb-4c59-8125-dc8ca3c8fe97', event_id: 'beb62dce-caeb-4373-b722-8aaf5dda5fa2', bracket_size: 16, bracket_level:'A'},
        {bracket_id: '1ca913bb-0a6b-4991-88d9-594aedaf5e6c', event_id: 'beb62dce-caeb-4373-b722-8aaf5dda5fa2', bracket_size: 8, bracket_level:'C'},
        {bracket_id: '29b25062-cfc6-455c-a8bc-fb3361487337', event_id: 'beb62dce-caeb-4373-b722-8aaf5dda5fa2', bracket_size: 4, bracket_level:'B'},
        {bracket_id: 'b24a5651-db68-40b0-8e80-6194d9acb586', event_id: 'beb62dce-caeb-4373-b722-8aaf5dda5fa2', bracket_size: 4, bracket_level:'D'},
        {bracket_id: '783fdf65-f6bb-42b1-87f3-a01c52edabad', event_id: '68094d2c-108e-4a58-945c-9f260d5d7cf0', bracket_size: 16, bracket_level:'A'}
      ]);
    });
};
