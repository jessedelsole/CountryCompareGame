const express = require('express');
const routes= express.Router();
const GameController = require('./controllers/GameController');

routes.get('/startgame', GameController.startGame);

module.exports = routes;