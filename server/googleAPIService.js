var request = require('request-promise'); 

class GoogleAPIService {
    constructor(apiKey){
        this.apiKey = apiKey; 
    }
    getAddressFromLatLng(latitude, longitude) {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?';
        let queryParams = {
            latlng: latitude + ',' + longitude, 
            key: this.apiKey
        }

        return request.get({url: url, qs: queryParams});
    }
}

module.exports = GoogleAPIService; 