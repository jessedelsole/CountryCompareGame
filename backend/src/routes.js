const express = require('express');
const routes= express.Router();
const GameController = require('./controllers/GameController');

routes.post('/lookForOpponent', GameController.lookForOpponent);


module.exports = routes;