
exports.up = function(knex) {

    return  knex.schema.createTable('cards', function(table){
        table.increments();
        table.string('name');
        table.string('url');
        table.integer('population');
        table.integer('area');
        table.float('hdi',4,3);
        table.integer('pop_density');
        table.float('safety_index',4,2);
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('cards');
};
