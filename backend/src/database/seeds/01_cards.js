
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {name: 'Brasil'},
        {name: 'Mexico'},
        {name: 'Uruguai'}
      ]);
    });
};
