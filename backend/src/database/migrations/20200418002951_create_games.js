
exports.up = function(knex) {
  
    return  knex.schema.createTable('games', function(table){
        table.increments();
        table.string('player1');
        table.string('player2');
        table.string('status'); //status of the match
        table.string('player_turn');
        table.integer('idx_played');
        table.integer('status_player1'); 
        table.integer('status_player2');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');

};
