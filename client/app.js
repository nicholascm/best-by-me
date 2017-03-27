'use strict';

angular.module('bestByMeApp', ['ngRoute'])

    .controller('HomeCtrl', ['$http','LocationFactory', function($http,locationFactory) {
        var self = this; 

        self.message = 'Welcome! Search for the best restaurants close by!';
        this.userLat; 
        this.userLong; 
        self.locations = []; 
        self.getLocations = function() {
            return $http.get('/api/restaurants').then(function(response) {
                console.log(response.data); 
                self.locations = response.data.businesses; 
            }); 
        }
        self.getLocations(); 
        this.successLocationInfo = function(position) {
            self.userLat = position.coords.latitude; 
            self.userLong = position.coords.longitude; 
        };
        this.failLocationInfo = function(err) {
            self.message = "We weren't able to get your location"; 
        }

        locationFactory.getUserLocation(this.successLocationInfo, this.failLocationInfo); 
    }]) 
    .factory('LocationFactory', function() {
        var factory = {}; 

        factory.getUserLocation = function(success, error) {
            if(!navigator.geolocation) {
                return "Unable to acquire location"; 
            } else {
                navigator.geolocation.getCurrentPosition(
                function(position) { success(position) }, 
                function(err) { error(err); }); 
            }
        }

        return factory;
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: '../views/home.html',
            controller: 'HomeCtrl', 
            controllerAs: 'home', 
            access: {restricted: false}
         })
         .otherwise({
             redirectTo: '/home'
         });
}]); 

