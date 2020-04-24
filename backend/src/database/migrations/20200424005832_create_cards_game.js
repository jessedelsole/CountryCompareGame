
exports.up = function(knex) {
   
    return  knex.schema.createTable('cards_game', function(table_games){
        table_games.increments();
        table_games.string('card_id').notNullable();
        table_games.string('game_id').notNullable();
        table_games.string('player').notNullable();
  
    })
};

exports.down = function(knex) {
  
    return knex.schema.dropTable('cards_game');
};
