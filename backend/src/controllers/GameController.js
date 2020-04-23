const connection = require('../database/connection');
const game_consts = require('../../src/game_consts');

module.exports = {

    // returns game's id  and status's (waiting for opponent or  game_ready, also starts the logic of the match when there are two players ready
    async lookForOpponent(request, response) {
       
        const { player, gameId } = request.body;

        if ( gameId > 0 ) {

            return response.json(await returnGameStatusById(gameId));

        } else {

            return response.json(await returnGameStatusByPlayerName(player));
        }
    }
}


async function returnGameStatusById(gameId) {

    //if the user already knows its gameID, just check the status of the game:
    //used by player 1 after first call, to check if there's a player2 ready

    const games = await connection('games').where('id', gameId).select('*');

    return new ReturnObj_lookForOpponent(games[0].id, games[0].status, 'JUST_CHECKED');
}


async function returnGameStatusByPlayerName(player) {

    //user doesn't know its game id yet
    //check if there's already anyone waiting for opponent

    const games = await connection('games').where('status', game_consts.WAITING_OPONENT).select('*');

    if (games.length === 0) {

        result = await connection('games').insert({
            player1: player,
            player2: "",
            status: game_consts.WAITING_OPONENT
        });

        return new ReturnObj_lookForOpponent(result[0], game_consts.WAITING_OPONENT, 'INSERTED');

    } else {
        //somebody was already waiting for oppoent, update table, change status to "PLAYING", and start the logic of the game
        await connection('games').where('id', games[0].id).update({
            status: game_consts.GAME_READY,
            player2: player
        });


        return new ReturnObj_lookForOpponent(games[0].id, game_consts.GAME_READY, 'UPDATE');
    }

}





class ReturnObj_lookForOpponent {
    constructor(return_gameId, return_status, return_operation) {

        this.return_gameId = return_gameId;
        this.return_status = return_status;
        this.return_operation = return_operation;
    }
}