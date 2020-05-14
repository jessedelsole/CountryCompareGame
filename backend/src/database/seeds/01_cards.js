
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
        {name: 'Italia', url: 'https://cdn.countryflags.com/thumbs/italy/flag-800.png',population:  62137000, area: 301000, hdi:0.883, pop_density:200, safety_index:55.74},
        {name: 'Russia', url: 'https://cdn.countryflags.com/thumbs/russia/flag-800.png',population:  142257000, area: 17098000,hdi: 0.824, pop_density:9, safety_index:58.88},
        {name: 'China' , url: 'https://cdn.countryflags.com/thumbs/china/flag-800.png',population:   1379302000, area: 9597000, hdi:0.758, pop_density:145, safety_index:68.17},
        {name: 'India' , url: 'https://cdn.countryflags.com/thumbs/india/flag-800.png',population: 1281935000, area: 3287000, hdi:0.647,pop_density:414, safety_index:56.68},
        {name: 'Noruega', url: 'https://cdn.countryflags.com/thumbs/norway/flag-800.png',population: 5328000, area: 323000, hdi:0.954,pop_density:16, safety_index:64.57},
        {name: 'Bangladesh', url: 'https://cdn.countryflags.com/thumbs/bangladesh/flag-800.png',population: 157826000, area: 147570, hdi:0.614,pop_density:1070 , safety_index:36.23},
        {name: 'Monaco', url: 'https://cdn.countryflags.com/thumbs/monaco/flag-800.png',population: 30645, area: 2, hdi:0.956,pop_density:39292 , safety_index:68.00},
        {name: 'Singapura', url: 'https://cdn.countryflags.com/thumbs/singapore/flag-800.png',population: 5888000, area: 716, hdi:0.935,pop_density:8225 , safety_index:69.43},
        {name: 'Africa do sul', url: 'https://cdn.countryflags.com/thumbs/south-africa/flag-800.png',population: 54841000, area: 1221000, hdi:0.705,pop_density:45 , safety_index:22.51},
        {name: 'Islândia', url: 'https://cdn.countryflags.com/thumbs/iceland/flag-800.png',population: 339000, area: 103000, hdi:0.938,pop_density:3 , safety_index:76.64},
        {name: 'Irã', url: 'https://cdn.countryflags.com/thumbs/iran/flag-800.png',population:  82021000, area: 1628000, hdi:0.797,pop_density:50 , safety_index:50.75},
        {name: 'Peru', url: 'https://cdn.countryflags.com/thumbs/peru/flag-800.png',population:  31036000, area: 1285000, hdi:0.759,pop_density:24 , safety_index:31.85},
        {name: 'Colombia', url: 'https://cdn.countryflags.com/thumbs/colombia/flag-800.png',population:  47698000, area: 1141000, hdi:0.761,pop_density:42 , safety_index:45.21},
        {name: 'Jamaica', url: 'https://cdn.countryflags.com/thumbs/jamaica/flag-800.png',population:  2990000, area: 10000 , hdi:0.726,pop_density:272 , safety_index:33.96},
        {name: 'Tailândia', url: 'https://cdn.countryflags.com/thumbs/thailand/flag-800.png',population:  68414135, area: 513000 , hdi:0.765,pop_density:133 , safety_index:59.52},
        {name: 'Cuba', url: 'https://cdn.countryflags.com/thumbs/cuba/flag-800.png',population:  11147000, area: 109000 , hdi:0.778,pop_density:101 , safety_index:72.55},
        {name: 'Espanha', url: 'https://cdn.countryflags.com/thumbs/spain/flag-800.png',population: 48958000, area: 505992 , hdi:0.893,pop_density:97 , safety_index:68.04},
        {name: 'Etiópia', url: 'https://cdn.countryflags.com/thumbs/ethiopia/flag-800.png',population: 105350000, area: 1104300 , hdi:0.470,pop_density:95 , safety_index:50.79},
        {name: 'Nova Zelândia', url: 'https://cdn.countryflags.com/thumbs/new-zealand/flag-800.png',population:  4510000, area: 275000 , hdi:0.921,pop_density:16 , safety_index:59.07},
        {name: 'Bulgaria', url: 'https://cdn.countryflags.com/thumbs/bulgaria/flag-800.png',population: 7101510, area: 110879, hdi:0.816,pop_density:64 , safety_index:61.50},
        {name: 'Marrocos', url: 'https://cdn.countryflags.com/thumbs/morocco/flag-800.png',population: 33986000, area: 446000, hdi:0.676,pop_density:76 , safety_index:51.31},
        {name: 'Australia', url: 'https://cdn.countryflags.com/thumbs/australia/flag-800.png',population: 23232000, area: 7692024, hdi:0.938,pop_density:3 , safety_index:58.64},
        {name: 'Canada', url: 'https://cdn.countryflags.com/thumbs/canada/flag-800.png',population: 35623000, area: 9984670, hdi:0.922,pop_density:4 , safety_index:60.33}


        

        
        
        
        
        
        
        

       

      ]);
    });
};
