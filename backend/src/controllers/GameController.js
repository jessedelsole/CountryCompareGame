const connection = require('../database/connection');
const game_consts = require('../../src/game_consts');

module.exports = {

    async lookForOpponent(request, response) {

        const { player, gameId } = request.body;
        console.log(player);
        console.log(gameId);

        if ( gameId > 0 ) {

            return response.json( await returnGameStatusById( gameId ));

        } else {

            return response.json( await waitForOpponent_StartGame( player ));
        }
    }
}


async function returnGameStatusById(gameId) {

    const games = await connection('games').where('id', gameId).select('*');

    return new ReturnObj_lookForOpponent(games[0].id, games[0].status, 'JUST_CHECKED');
}


async function waitForOpponent_StartGame(player) {

    const games = await connection('games').where('status', game_consts.WAITING_OPONENT).select('*');

    if (games.length === 0) {

        const [gameId] = await connection('games').insert({ player1: player,  player2: "", status: game_consts.WAITING_OPONENT });
        return new ReturnObj_lookForOpponent(gameId, game_consts.WAITING_OPONENT, 'INSERTED');

    } else {

        await startGame(games[0].id, games[0].player1, player);
        return new ReturnObj_lookForOpponent(games[0].id, game_consts.GAME_READY, 'UPDATE');
    }

}


async function startGame(gameId, player1, player2){

   const cards = await connection('cards').select('*');
   console.log(cards);

   let tempPlayer = player1;  
   for (let i=0; i<= cards.length-1;i++){

     if (tempPlayer===player1)
      tempPlayer=player2; else
        tempPlayer=player1;

      await connection('cards_game').insert({card_id:cards[i].id, game_id: gameId, player:tempPlayer });   
   }

   const cards_game_player1 = await connection('cards_game').where('player',player1).select('*');
   console.log(cards_game_player1);
   const cards_game_player2 = await connection('cards_game').where('player',player2).select('*');
   console.log(cards_game_player2);
  
  
   await connection('games').where('id', gameId).update(
       { status: game_consts.GAME_READY,  
         player2: player2, 
         idCard_player1: cards_game_player1[0].id,
         idCard_player2: cards_game_player2[0].id
         });

   const game = await connection('games').where('id', gameId).select('*');
   console.log(game);

}




class ReturnObj_lookForOpponent {
    constructor(return_gameId, return_status, return_operation) {

        this.return_gameId = return_gameId;
        this.return_status = return_status;
        this.return_operation = return_operation;
    }
}