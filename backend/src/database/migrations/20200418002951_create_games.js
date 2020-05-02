
exports.up = function(knex) {
  
    return  knex.schema.createTable('games', function(table){
        table.increments();
        table.string('player1');
        table.string('player2');
        table.string('status');
        table.integer('idCard_player1',5);
        table.integer('idCard_player2',5);
        table.string('player_turn');
        table.integer('idx_played')
        
  
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');

};
