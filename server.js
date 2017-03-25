'use strict';

var express = require('express');
var routes = require('./server/routes/index.js');
var mongo = require('mongodb').MongoClient;

var app = express();


mongo.connect('mongodb://localhost:27017/clementinejs', function (err, db) {

	if (err) {
		throw new Error('Database failed to connect!');
	} else {
		console.log('MongoDB successfully connected on port 27017.');
	}

	app.use('/public', express.static(process.cwd() + '/public'));
   app.use('/controllers', express.static(process.cwd() + '/client/controllers'));
   app.use('/directives', express.static(process.cwd() + '/client/directives'));
   app.use('/views', express.static(process.cwd()+'/client/views')); 
   app.use('/services', express.static(process.cwd()+'/client/services')); 
   app.use('/', express.static(process.cwd()+'/client/'));
	routes(app, db);

	var port = process.env.PORT;
	app.listen(port, function () {
		console.log('Node.js listening on port ' + port + '...');
	});

});

