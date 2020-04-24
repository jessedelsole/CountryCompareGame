
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cards_game').del()
    .then(function () {
      // Inserts seed entries
    
    });
};
