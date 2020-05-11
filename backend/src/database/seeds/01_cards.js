
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {name: 'Brasil', url: 'https://cdn.countryflags.com/thumbs/brazil/flag-400.png',population: 209300000, area: 8511000, hdi:0.761, pop_density:25, safety_index:31.12},
        {name: 'EUA'   , url: 'https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png',population: 326625000, area: 9826000, hdi:0.920, pop_density:34, safety_index:52.80},
        {name: 'Mexico', url: 'https://cdn.countryflags.com/thumbs/mexico/flag-800.png',population: 124574000, area: 1964000, hdi:0.767, pop_density:64, safety_index:46.03},
        {name: 'Japan' , url: 'https://cdn.countryflags.com/thumbs/japan/flag-800.png',population:  126451000, area: 377000, hdi: 0.915, pop_density:334, safety_index:79.34 },
        {name: 'França', url: 'https://cdn.countryflags.com/thumbs/france/flag-800.png',population:  62814000, area: 212000, hdi:0.891, pop_density:123, safety_index:53.08},
        {name: 'Italia', url: 'https://cdn.countryflags.com/thumbs/italy/flag-800.png',population:  62137000, area: 551000, hdi:0.883, pop_density:200, safety_index:55.74},
        {name: 'Russia', url: 'https://cdn.countryflags.com/thumbs/russia/flag-800.png',population:  142257000, area: 17098000,hdi: 0.824, pop_density:9, safety_index:58.88},
        {name: 'China' , url: 'https://cdn.countryflags.com/thumbs/china/flag-800.png',population:   1379302000, area: 9597000, hdi:0.758, pop_density:145, safety_index:68.17},
        {name: 'India' , url: 'https://cdn.countryflags.com/thumbs/india/flag-800.png',population: 1281935000, area: 3287000, hdi:0.647,pop_density:414, safety_index:56.68},
        {name: 'Noruega', url: 'https://cdn.countryflags.com/thumbs/norway/flag-800.png',population: 5328000, area: 323000, hdi:0.954,pop_density:16, safety_index:64.57},
        
        {name: 'Bangladesh', url: 'https://cdn.countryflags.com/thumbs/bangladesh/flag-800.png',population: 157826000, area: 147570, hdi:0.614,pop_density:1070 , safety_index:36.23},
        {name: 'Monaco', url: 'https://cdn.countryflags.com/thumbs/monaco/flag-800.png',population: 30645, area: 2, hdi:0.956,pop_density:39292 , safety_index:68.00},
        {name: 'Singapura', url: 'https://cdn.countryflags.com/thumbs/singapore/flag-800.png',population: 5888000, area: 716, hdi:0.935,pop_density:8225 , safety_index:69.43},
        {name: 'Africa do sul', url: 'https://cdn.countryflags.com/thumbs/south-africa/flag-800.png',population: 54841000, area: 1221000, hdi:0.705,pop_density:45 , safety_index:22.51},
        {name: 'Islândia', url: 'https://cdn.countryflags.com/thumbs/iceland/flag-800.png',population: 339000, area: 103000, hdi:0.938,pop_density:3 , safety_index:76.64},
        {name: 'Irã', url: 'https://cdn.countryflags.com/thumbs/iran/flag-800.png',population:  82021000, area: 1628750, hdi:0.797,pop_density:50 , safety_index:50.75}

        
        
        

       

      ]);
    });
};
