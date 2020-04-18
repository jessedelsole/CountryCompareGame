const express = require('express');
const routes= express.Router();
const GameController = require('./controllers/GameController');

routes.post('/wannaPlay', GameController.wannaPlay);


module.exports = routes;