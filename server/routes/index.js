'use strict';

var path = process.cwd();
var ClickHandler = require('../clickHandler.server.js'); 
var BusinessService = require('../businessService.js'); 

module.exports = function (app, db) {

const businessService = new BusinessService(); 
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
	app.route('/api/businesses')
		.get(businessService.getBusinessByLocation); 
	app.route('/api/business')
		.post(businessService.getBusinessDetail)

};
