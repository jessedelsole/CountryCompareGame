
exports.up = function(knex) {
  
    return  knex.schema.createTable('games', function(table_games){
        table_games.increments();
        table_games.string('player1').notNullable();
        table_games.string('player2').notNullable();
        table_games.string('status').notNullable();
  
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');

};
