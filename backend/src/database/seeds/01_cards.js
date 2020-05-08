
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {name: 'Brasil', url: 'https://cdn.countryflags.com/thumbs/brazil/flag-400.png',population: 209300000, area: 8511000, hdi:0.761, pop_density:25, military_power:9},
        {name: 'EUA'   , url: 'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png',population: 326625000, area: 9826000, hdi:0.920, pop_density:34, military_power:9},
        {name: 'Mexico', url: 'https://cdn.countryflags.com/thumbs/mexico/flag-800.png',population: 124574000, area: 1964000, hdi:0.767, pop_density:64, military_power:9},
        {name: 'Japan' , url: 'https://cdn.countryflags.com/thumbs/japan/flag-800.png',population:  126451000, area: 377000, hdi: 0.915, pop_density:334, military_power:9 },
        {name: 'França', url: 'https://cdn.countryflags.com/thumbs/france/flag-800.png',population:  62814000, area: 212000, hdi:0.891, pop_density:123, military_power:9},
        {name: 'Italia', url: 'https://cdn.countryflags.com/thumbs/italy/flag-800.png',population:  62137000, area: 551000, hdi:0.883, pop_density:200, military_power:9},
        {name: 'Russia', url: 'https://cdn.countryflags.com/thumbs/russia/flag-800.png',population:  142257000, area: 17098000,hdi: 0.824, pop_density:9, military_power:9},
        {name: 'China' , url: 'https://cdn.countryflags.com/thumbs/china/flag-800.png',population:   1379302000, area: 9597000, hdi:0.758, pop_density:145, military_power:9},
        {name: 'India' , url: 'https://cdn.countryflags.com/thumbs/india/flag-800.png',population: 1281935000, area: 3287000, hdi:0.647,pop_density:414, military_power:9},
        {name: 'Noruega', url: 'https://cdn.countryflags.com/thumbs/norway/flag-800.png',population: 5328000, area: 323000, hdi:0.954,pop_density:16, military_power:9}


       

      ]);
    });
};
