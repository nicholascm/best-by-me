'use strict'
var Yelp = require('yelp'); 

class RestaurantService {

    constructor(consumer_key, consumer_secret, token, token_secret) {
        const _consumerKey = consumer_key; 
        const _consumerSecret = consumer_secret; 
        const _token = token; 
        const _tokenSecret = token_secret;

        this.yelpService = new Yelp({
            consumer_key: _consumerKey,
            consumer_secret: _consumerSecret,
            token: _token,
            token_secret: _tokenSecret,
        });
    }
    getRestaurantsByLocation(req, res) {
        const yelp = new Yelp({
            consumer_key: '8WuYG1u2c4uc2kmjgQRCHg',
            consumer_secret: 'IL8ft9-a2pEV9sRvwCT2DbLvJZs',
            token: 'HnOYcs1CUCn6WCKBN5bRxb5tN3nSRCRc',
            token_secret: 'wKScvflHu5aShgOCTBr1qG6EERM',
        })
        yelp.search({
            term: "food", 
            location: "Springfield, VA"
        }).then(function(data) {
            res.send(data); 
        }).catch(function(err) {
            res.send(err); 
        }); 
    }
}



module.exports = RestaurantService; 