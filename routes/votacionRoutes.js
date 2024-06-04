const express = require('express');
const api = express.Router();
const votacionController = require('../controllers/votacionController.js');

api.post('/votacion', votacionController.createVotacion);
api.get('/votaciones', votacionController.getVotacion);
api.get('/votacion/search/:id', votacionController.getVotacion);
api.put('/votacion/update/:id', votacionController.updateVotacion);
api.delete('/votacion/delete/:id', votacionController.deleteVotacion);

module.exports = api;