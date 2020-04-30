
exports.up = function(knex) {
  
    return  knex.schema.createTable('games', function(table){
        table.increments();
        table.string('player1');
        table.string('player2');
        table.string('status');
        table.integer('idCard_player1',5);
        table.integer('idCard_player2',5);
        table.string('player_turn');
        
  
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');

};
