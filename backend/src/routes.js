const express = require('express');
const routes= express.Router();
const GameController = require('./controllers/GameController');

routes.post('/lookForOpponent', GameController.lookForOpponent);
routes.get ('/getCard'        , GameController.getCard);
routes.post('/cardPlayed'     , GameController.cardPlayed);



module.exports = routes;