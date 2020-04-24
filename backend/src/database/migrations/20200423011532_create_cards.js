
exports.up = function(knex) {

    return  knex.schema.createTable('cards', function(table){
        table.increments();
        table.string('name');
        table.string('url');
        table.integer('population',10);
        table.integer('area',7);
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('cards');
};
