const { Router } = require('express');

const devController = require('./controllers/devController');
const searchController = require('./controllers/searchController');

const routes = Router();

routes.get(['/', '/status'], (req, res) => res.send('active'));

routes.post('/dev', devController.store);
routes.get('/dev', devController.list);

routes.get('/search', searchController.list);

module.exports = routes;