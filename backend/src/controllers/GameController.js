const connection = require('../database/connection');
const game_consts = require('../../src/game_consts');

module.exports = {

   async wannaPlay(request, response){
        
     
    
    const { player } = request.body;

    const games =  await connection ('games').where('player1', player).select('*');
  
     console.log(games);
 
     const size = games.length;

     let gameId=0;

    if (size===0){
       
        //someone wants to play

       const player1 = player;
       const player2 = '';
       let status  = game_consts.WAITING_OPONENT; 
        
        result = await connection('games').insert({
            player1,
            player2,
            status
        }); 

        console.log(result);

        gameId=result[0];


    } else {
        gameId = games[0].id;

    }

    const status = 1;
    return  response.json({ gameId, status });
  }
}