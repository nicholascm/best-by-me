'use strict';

var path = process.cwd();
var ClickHandler = require('../clickHandler.server.js'); 
var RestaurantService = require('../restaurantService.js'); 

module.exports = function (app, db) {

const restaurantService = new RestaurantService('8WuYG1u2c4uc2kmjgQRCHg','IL8ft9-a2pEV9sRvwCT2DbLvJZs', 'HnOYcs1CUCn6WCKBN5bRxb5tN3nSRCRc', 'wKScvflHu5aShgOCTBr1qG6EERM'); 
const clickHandler = new ClickHandler(db);
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/clicks')
		.get(clickHandler.getClicks)
		.post(clickHandler.addClick)
		.delete(clickHandler.resetClicks);
		
	app.route('/test')
		.get(function(req, res) {
			res.send('test route!'); 
		})
	app.route('/api/restaurants')
		.get(restaurantService.getRestaurantsByLocation)
};
