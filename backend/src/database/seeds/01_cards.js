
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {name: 'Brasil', url: 'https://cdn.countryflags.com/thumbs/brazil/flag-400.png',population: 209300000, area: 8511000},
        {name: 'EUA'   , url: 'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png',population: 326625791, area: 9826675},
        {name: 'Mexico', url: 'https://cdn.countryflags.com/thumbs/mexico/flag-800.png',population: 124574795, area: 1964375},
        {name: 'Japan' , url: 'https://cdn.countryflags.com/thumbs/japan/flag-800.png',population:  126451398, area: 377930}
      ]);
    });
};
