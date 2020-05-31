
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {card_code:1, name: 'Brasil',population: 209300000, area: 8511000, hdi:0.761, pop_density:25, safety_index:31.12,language:'Português', currency: 'real'},
        {card_code:2, name: 'EUA'   ,population: 326625000, area: 9826000, hdi:0.920, pop_density:34, safety_index:52.80, language:'Inglês', currency:'Dólar'},
        {card_code:3, name: 'México', population: 124574000, area: 1964000, hdi:0.767, pop_density:64, safety_index:46.03, language:'Espanhol', currency:'Peso Mexicano'},
        {card_code:4, name: 'Japão' ,population:  126451000, area: 377000, hdi: 0.915, pop_density:334, safety_index:79.34, language: 'Japonês', currency:'Iene'},
        {card_code:5, name: 'França',population:  62814000, area: 212000, hdi:0.891, pop_density:123, safety_index:53.08, language:'Francês', currency: 'Euro'},
        {card_code:6, name: 'Itália',population:  62137000, area: 301000, hdi:0.883, pop_density:200, safety_index:55.74, language:'Italiano', currency:'Euro'},
        {card_code:7, name: 'Rússia',population:  142257000, area: 17098000,hdi: 0.824, pop_density:9, safety_index:58.88, language:'Russo', currency: 'Rublo'},
        {card_code:8, name: 'China' , population:   1379302000, area: 9597000, hdi:0.758, pop_density:145, safety_index:68.17, language:'Mandarim', currency: 'Renminbi'},
        {card_code:9, name: 'India' ,population: 1281935000, area: 3287000, hdi:0.647,pop_density:414, safety_index:56.68,language:'Hindi/Inglês', currency: 'Rupia'},
        {card_code:10, name: 'Noruega',population: 5328000, area: 323000, hdi:0.954,pop_density:16, safety_index:64.57, language:'Norueguês', currency:'Coroa Norueguesa'},
        {card_code:11, name: 'Bangladesh',population: 157826000, area: 147570, hdi:0.614,pop_density:1070 , safety_index:36.23,language:'Bengali', currency:'Taka'},
        {card_code:12, name: 'Mônaco',population: 30645, area: 2, hdi:0.956,pop_density:39292 , safety_index:68.00, language: 'Francês', currency: 'Euro'},
        {card_code:13, name: 'Singapura',population: 5888000, area: 716, hdi:0.935,pop_density:8225 , safety_index:69.43, language: 'Malaio/Inglês/Mandarin', currency:'Dolar de Singapura'},
        {card_code:14, name: 'África do sul',population: 54841000, area: 1221000, hdi:0.705,pop_density:45 , safety_index:22.51, language:'Africâner/Inglês', currency: 'Rand'},
        {card_code:15, name: 'Islândia',population: 339000, area: 103000, hdi:0.938,pop_density:3 , safety_index:76.64, language:'Islandês', currency: 'Coroa Islandesa'},
        {card_code:16, name: 'Irã',population:  82021000, area: 1628000, hdi:0.797,pop_density:50 , safety_index:50.75, language:'Persa', currency:'Rial iraniano'},
        {card_code:17, name: 'Peru',population:  31036000, area: 1285000, hdi:0.759,pop_density:24 , safety_index:31.85, language:'Castelhano', currency:'Sol'},
        {card_code:18, name: 'Colômbia',population:  47698000, area: 1141000, hdi:0.761,pop_density:42 , safety_index:45.21, language:'Espanhol', currency:'Peso colombiano'},
        {card_code:19, name: 'Jamaica',population:  2990000, area: 10000 , hdi:0.726,pop_density:272 , safety_index:33.96, language:'Inglês', currency: 'Dólar jamaicano'},
        {card_code:20, name: 'Tailândia', population:  68414135, area: 513000 , hdi:0.765,pop_density:133 , safety_index:59.52, language:'Tailandês', currency:'Bate'},
        {card_code:21, name: 'Cuba',population:  11147000, area: 109000 , hdi:0.778,pop_density:101 , safety_index:72.55, language:'Espanhol', currency:'Peso'},
        {card_code:22, name: 'Espanha',population: 48958000, area: 505992 , hdi:0.893,pop_density:97 , safety_index:68.04, language:'Espanhol', currency: 'Euro'},
        {card_code:23, name: 'Etiópia',population: 105350000, area: 1104300 , hdi:0.470,pop_density:95 , safety_index:50.79, language:'Amárico',currency: 'Birr etíope'},
        {card_code:24, name: 'Nova Zelândia',population:  4510000, area: 275000 , hdi:0.921,pop_density:16 , safety_index:59.07, language: 'Inglês/Maori', currency: 'Dólar da Nova Zelândia'},
        {card_code:25, name: 'Bulgária',population: 7101510, area: 110879, hdi:0.816,pop_density:64 , safety_index:61.50, language:'Búlgaro', currency:'Lev'},
        {card_code:26, name: 'Marrocos',population: 33986000, area: 446000, hdi:0.676,pop_density:76 , safety_index:51.31, language:'Árabe/Bérbere', currency: 'Dirham marroquino'},
        {card_code:27, name: 'Austrália',population: 23232000, area: 7692024, hdi:0.938,pop_density:3 , safety_index:58.64, language:'Inglês', currency:'Dólar australiano'},
        {card_code:28, name: 'Canadá',population: 35623000, area: 9984670, hdi:0.922,pop_density:4 , safety_index:60.33, language:'Inglês/Francês', currency:'Dólar canadense'},
        {card_code:29, name: 'Bósnia e Herzegovina',population: 3502000, area: 51000, hdi:0.769,pop_density:68 , safety_index:56.97,language:'Bósnio, croata e sérvio', currency:'Marco convertível'},
        {card_code:30, name: 'Alemanha',population: 80594000, area: 357000 , hdi:0.939,pop_density:226 , safety_index:65.19, language:'Alemão',currency:'Euro'},
        {card_code:31, name: 'Portugal',population: 10839000, area: 92090 , hdi:0.830,pop_density:118 , safety_index:70.37, language:'Português',currency:'Euro'},
        {card_code:32, name: 'Myamar',population: 55123000, area: 676000 , hdi:0.584,pop_density:81 , safety_index:54.14, language:'Birmanês',currency:'Quiate'},
        {card_code:33, name: 'Groelândia',population: 56000, area: 2166000 , hdi:0.803,pop_density:1 , safety_index:68.69, language:'Groelandês',currency:'Coroa dinamarquesa'},
        {card_code:34, name: 'Indonésia',population: 260580000, area: 1910000 , hdi:0.684,pop_density:136 , safety_index:54.16, language:'Indonésio',currency:'Rupia indonésia'},
        {card_code:35, name: 'Coréia do Norte',population: 25248000, area: 120000 , hdi:0.564,pop_density:209 , safety_index:54.16, language:'Coreano',currency:'Won norte-coreano'},
        {card_code:36, name: 'Coréia do Sul',population:  51181000, area: 100000  , hdi:0.906,pop_density:511 , safety_index:72.61, language:'Coreano',currency:'Won'},
        {card_code:37, name: 'Inglaterra',population:  55619000, area: 130395 , hdi:0.920,pop_density:307 , safety_index:56.29, language:'Inglês',currency:'Libra esterlina'},
        {card_code:38, name: 'Turquia',population:  75627000, area: 783562 , hdi:0.806,pop_density:96 , safety_index:56.29, language:'Turco',currency:'Lira turca'},        
        {card_code:39, name: 'Brunei', population:  411000 , area: 5000 , hdi:0.845, pop_density:64 , safety_index:71.25, language:'Malaio/Inglês',currency:'Dólar de Brunei'},        
        {card_code:40, name: 'Eritreia',population:  4954000 , area: 121320 , hdi:0.434, pop_density:37 , safety_index:72.24, language:'Árabe/Tigríneo/Inglês',currency:'Nakfa'},         

        

      ]);
    });
};
