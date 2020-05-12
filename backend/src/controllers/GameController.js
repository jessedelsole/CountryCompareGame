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


    const [game] = await connection('games').where('id', gameId).select('*');

    const idx_played = game.idx_played;
    const player_turn = game.player_turn;

    await connection('games').where({id:gameId}).update({idx_played:0} );
  
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
    

    //loads the opponent's card(first in his deck)
    const opponentCard = await connection('cards_game')
        .where({ game_id: gameId, seq: 1 })
        .andWhereNot({ player })
        .join('cards', 'cards.id', '=', 'cards_game.card_id')
        .first('*');
    

    //loads the values of the selected property
    let valuePlayed, valuePlayedOpponent;

    switch(idx_played){
        case 1 : 
           valuePlayed = card.population;
           valuePlayedOpponent = opponentCard.population; 
        break;
        case 2 :
           valuePlayed = card.area;
           valuePlayedOpponent = opponentCard.area;
        break;
        case 3 :
           valuePlayed = card.hdi;
           valuePlayedOpponent = opponentCard.hdi;
        break;
        case 4 :
            valuePlayed = card.safety_index;
            valuePlayedOpponent = opponentCard.safety_index;
        break
        case 5 :
            valuePlayed = card.pop_density;
            valuePlayedOpponent = opponentCard.pop_density;
        break;
    }
    
    console.log("value played: "+ card.safety_index);
    console.log("valuePlayedOpponent: " + opponentCard.safety_index);
    

    //finds out which player won 
    let roundWinner;
    let roundLooser;

    if ( valuePlayed  >  valuePlayedOpponent) {
        console.log("> roundwinner = " + player);
        roundWinner = player;
        roundLooser = otherPlayer;
    } else {
        console.log("< roundwinner = " + otherPlayer);
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


 //shuffle algorithm copied from : https://github.com/Daplie/knuth-shuffle.git
function shuffle(array) {
   
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


async function startGame(gameId, player1, player2) {

    const cards = await connection('cards').select('*');
    console.log(cards);

    shuffle(cards);

    console.log('cards were sorted!');
    console.log(cards);
   
    const length = cards.length;
    const half = Math.floor(length/2);
    
    let seq=1;
    for (let i =1; i<= half ;i++)
       await connection('cards_game').insert({ card_id: cards[i-1].id, game_id: gameId, player: player1, seq: seq++ });
    
    seq=1;
    for (let i = half+1; i<= length;i++)
      await connection('cards_game').insert({ card_id: cards[i-1].id, game_id: gameId, player: player2, seq: seq++ });

    await connection('games').where('id', gameId).update(
        {
            status: game_consts.GAME_READY,
            player2: player2,
            player_turn: player1
        });

    //debug
  
    const cards_game = await connection('cards_game').where('game_id', gameId).select('*');
   
    console.log('cards game:');    
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