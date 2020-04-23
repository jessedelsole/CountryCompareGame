
exports.up = function(knex, Promise) {

    return  knex.schema.createTable('cards', function(table){
        table.increments();
        table.string('name').notNullable();
        table.string('url');
    }).then( function(){
        
        
    // knex('cards').insert([ {name: 'Brazil'}, {name: 'Argentina'}])

    //   const  obj = knex('cards').select('*'); 
       
     //   console.log('cards :'  + obj[0])

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('cards');
};
