const connection = require('../database/connection');
const game_consts = require('../../src/game_consts');

module.exports = {

    //lookForOpponent :
    // returns game's id  and status's (waiting for opponent or  game_ready)
    // also starts the logic of the match when there're two players ready
    async lookForOpponent(request, response) {

        console.log(request.body);

        let return_operation = 'INITIAL';
        let return_gameId = 0;
        let return_status = 0;

        const { player, gameId } = request.body;


        //if the user already knows its gameID, just check the status of the game:

        if (gameId > 0) {

            const games = await connection('games').where('id', gameId).select('*');
            console.log(games);

            return_gameId = games[0].id;
            return_status = games[0].status;
            return_operation = 'JUST_CHECKED';

        } else {

            //user doesn't know its game id yet
            //check if there's already anyone waiting for opponent

            const games = await connection('games').where('status', game_consts.WAITING_OPONENT).select('*');
            console.log(games);


            if (games.length === 0) {

                //nobody is waiting for opponent yet, insert record in database and wait for opponent

                const player1 = player;
                let player2 = '';
                let status = game_consts.WAITING_OPONENT;

                result = await connection('games').insert({
                    player1,
                    player2,
                    status
                });

                [return_gameId] = result;
                return_status = status;
                return_operation = 'INSERTED';

            } else {
                //somebody was already waiting for oppoent, update table, change status to "PLAYING", and start the logic of the game


                return_gameId = games[0].id;


                //check if it's not the user itself who is waiting for opponent
                if (player != games[0].player1) {

                    let player2 = player;
                    let status = game_consts.GAME_READY;
                    await connection('games').where('id', return_gameId).update({ status, player2 });


                    return_operation = 'UPDATE';

                } else {
                    return_operation = 'NONE';
                    return_status = games[0].status;
                }

            }

        }

        return response.json({ return_gameId, return_status, return_operation });

    }
}