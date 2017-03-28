'use strict'

var Yelp = require('yelp'); 
var request = require('request'); 
var google = require('./googleAPIService.js'); 

class BusinessService {

    getBusinessByLocation(req, res) {
        const yelp = new Yelp({
            consumer_key: process.env.YELP_CONSUMER_KEY,
            consumer_secret: process.env.YELP_CONSUMER_SECRET,
            token: process.env.YELP_TOKEN,
            token_secret: process.env.YELP_TOKEN_SECRET,
        })
        const mapService = new google(process.env.GOOGLE_MAPS_API_KEY); 
        let loc = mapService.getAddressFromLatLng(38.7892800, -77.1872040).then(x => console.log(JSON.parse(x).results[0].formatted_address)); 
        let location = mapService.getAddressFromLatLng(38.7892800, -77.1872040)
            .then((data) => { 
                yelp.search({
                    term: "grocery", 
                    location: JSON.parse(data).results[0].formatted_address, 
                    sort: 2
                }).then(function(data) {
                    res.send(data); 
                }).catch(function(err) {
                    res.send(err); 
              }); 
        })
    }
    getBusinessDetail(req, res) {
        const yelp = new Yelp({
            consumer_key: process.env.YELP_CONSUMER_KEY,
            consumer_secret: process.env.YELP_CONSUMER_SECRET,
            token: process.env.YELP_TOKEN,
            token_secret: process.env.YELP_TOKEN_SECRET,
        }); 
        yelp.business(req.body.data.id).then(function(data) {
            res.send(data); 
        }).catch(function(err) {
            res.send(err); 
        }); 
    }
}



module.exports = BusinessService; 