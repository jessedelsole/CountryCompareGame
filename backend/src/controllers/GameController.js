const connection = require('../database/connection');
const game_consts = require('../../src/game_consts');


module.exports = {

    async lookForOpponent(request, response) {

        const { player, gameId } = request.body;
        return response.json(await _lookForOpponent(player, gameId));
    },
    async cardPlayed(request, response) {

        const { gameId, idx_played, player } = request.body;
        return response.json(await _cardPlayed(gameId, idx_played, player));
    },
    async getCard(request, response) {

        const { player, gameId } = request.query;
        return response.json(await _getCard(player, gameId));
    },
    async checkCardPlayed(request, response){
        
        const { gameId } = request.query;    
        return response.json(await _checkCardPlayed(gameId));  
    }
}

async function _checkCardPlayed(gameId){

    console.log('check card played : ' + gameId);

    const [game] = await connection('games').where('id', gameId).select('*');

    const idx_played = game.idx_played;
    const player_turn = game.player_turn;

    await connection('games').where({id:gameId}).update({idx_played:0} );


    console.log(game);
    return { idx_played, player_turn };

}

async function _cardPlayed(gameId, idx_played, player) {

    //gets the other player's name
    const [game] = await connection('games').where('id', gameId).select('*');

    let otherPlayer;
    if (game.player1 == player)
        otherPlayer = game.player2; else
        otherPlayer = game.player1;

    //loads the player card (first in his deck)
    const card = await connection('cards_game')
        .where({ player, game_id: gameId, seq: 1 })
        .join('cards', 'cards.id', '=', 'cards_game.card_id')
        .first('*');
    console.log(card);

    //loads the opponent's card(first in his deck)
    const opponentCard = await connection('cards_game')
        .where({ game_id: gameId, seq: 1 })
        .andWhereNot({ player })
        .join('cards', 'cards.id', '=', 'cards_game.card_id')
        .first('*');
    console.log(opponentCard);

    //loads the values of the selected property
    let valuePlayed, valuePlayedOpponnent;

    switch(idx_played){
        case 1 : 
          valuePlayed = card.population;
          valuePlayedOpponnent = opponentCard.population; 
        break;
        case 2 :
          valuePlayed = card.area;
          valuePlayedOpponnent = opponentCard.area;
        break;
        case 3 :
          valuePlayed = card.hdi;
          valuePlayedOpponnent = opponentCard.hdi;
        break;
        case 5 :
            valuePlayed = card.pop_density;
            valuePlayedOpponnent = opponentCard.pop_density;
        break;


    }
    
    

    //finds out which player won 
    let roundWinner;
    let roundLooser;

    if (valuePlayed > valuePlayedOpponnent) {
        roundWinner = player;
        roundLooser = otherPlayer;
    } else {
        roundWinner = otherPlayer;
        roundLooser = player;
    }

    //take the looser's card, and prepare for next round :

    const [maxSeq] = await connection('cards_game')
        .where({ player: roundWinner, game_id: gameId })
        .max('seq', { as: 'maxSeq' });

    let newSeqCardWon = maxSeq.maxSeq + 1;

    //(set new owner for looser's card, sets its sequence to last of winner's deck)
    await connection('cards_game').where({ game_id: gameId, seq: 1, player: roundLooser }).update({ player: roundWinner, seq: newSeqCardWon });
    //(put winner's first card in the end of its deck)
    await connection('cards_game').where({ game_id: gameId, seq: 1, player: roundWinner }).update({ seq: newSeqCardWon + 1 });
    //(moves the queue of card's, second will become first, and so forth. lets it prepared for next round)
    await connection('cards_game').where({ game_id: gameId }).decrement('seq', 1);

    //defines who should play next, and let the other player know which option was selected
    await connection('games').where({ id: gameId }).update({ player_turn: roundWinner, idx_played });

    return { roundWinner }
}

async function _lookForOpponent(player, gameId) {
    console.log(player);
    console.log(gameId);

    if (gameId > 0) {

        return await returnGameStatusById(gameId);

    } else {

        return await waitForOpponent_StartGame(player);
    }
}


async function _getCard(player, gameId) {

    

    const [game] = await connection('games').where('id', gameId).select('*');

    const player_turn = game.player_turn;

    const card = await connection('cards_game')
        .where({ player, game_id: gameId, seq: 1 })
        .join('cards', 'cards.id', '=', 'cards_game.card_id')
        .first('*');

    const opponentCard = await connection('cards_game')
        .where({ game_id: gameId, seq: 1 })
        .andWhereNot({ player })
        .join('cards', 'cards.id', '=', 'cards_game.card_id')
        .first('*');


    const [cardCount] = await connection('cards_game')
        .where({ player, game_id: gameId })
        .count();

    count = cardCount['count(*)'];

    const [opponentCardCount] = await connection('cards_game')
        .where({ game_id: gameId })
        .andWhereNot({ player })
        .count();

    opponentCount = opponentCardCount['count(*)'];

    return { card, opponentCard, count, opponentCount, player_turn };
}


async function returnGameStatusById(gameId) {

    const games = await connection('games').where('id', gameId).select('*');

    return new ReturnObj_lookForOpponent(games[0].id, games[0].status, 'JUST_CHECKED', games[0].player2);
}


async function waitForOpponent_StartGame(player) {

    const games = await connection('games').where('status', game_consts.WAITING_OPONENT).select('*');

    if (games.length === 0) {

        const [gameId] = await connection('games').insert({ player1: player, player2: "", status: game_consts.WAITING_OPONENT, idx_played: 0 });
        return new ReturnObj_lookForOpponent(gameId, game_consts.WAITING_OPONENT, 'INSERTED', '');

    } else {

        await startGame(games[0].id, games[0].player1, player);
        return new ReturnObj_lookForOpponent(games[0].id, game_consts.GAME_READY, 'UPDATE', games[0].player1);
    }

}


async function startGame(gameId, player1, player2) {

    const cards = await connection('cards').select('*');
    console.log(cards);

    
    await connection('cards_game').insert({ card_id: cards[7].id, game_id: gameId, player: player1, seq: 1 });
    await connection('cards_game').insert({ card_id: cards[6].id, game_id: gameId, player: player1, seq: 2 });
    await connection('cards_game').insert({ card_id: cards[5].id, game_id: gameId, player: player1, seq: 3 });
    await connection('cards_game').insert({ card_id: cards[4].id, game_id: gameId, player: player1, seq: 4 });
   
    await connection('cards_game').insert({ card_id: cards[3].id, game_id: gameId, player: player2, seq: 1 });
    await connection('cards_game').insert({ card_id: cards[2].id, game_id: gameId, player: player2, seq: 2 });
    await connection('cards_game').insert({ card_id: cards[1].id, game_id: gameId, player: player2, seq: 3 });
    await connection('cards_game').insert({ card_id: cards[0].id, game_id: gameId, player: player2, seq: 4 });

    await connection('cards_game').insert({ card_id: cards[8].id, game_id: gameId, player: player1, seq: 5 });
    await connection('cards_game').insert({ card_id: cards[9].id, game_id: gameId, player: player2, seq: 5 });

    


    await connection('games').where('id', gameId).update(
        {
            status: game_consts.GAME_READY,
            player2: player2,
            player_turn: player1
        });

    //debug
    const cards_game = await connection('cards_game').where('game_id', gameId).select('*');
    console.log(cards_game);

}


class ReturnObj_lookForOpponent {
    constructor(return_gameId, return_status, return_operation, opponentName) {
        this.return_gameId = return_gameId;
        this.return_status = return_status;
        this.return_operation = return_operation;
        this.opponentName = opponentName;
    }
}