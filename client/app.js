'use strict';

angular.module('bestByMeApp', ['ngRoute'])

    .controller('HomeCtrl', ['$http','LocationFactory', 'lowerFilter', function($http, locationFactory, lowerFilter) {
        var self = this; 

        this.message = 'Welcome! Search for the best restaurants close by!';
        this.userLat; 
        this.userLong; 
        this.loading = false; 
        this.locations = []; 
        this.getLocations = function() {
            return $http.get('/api/restaurants').then(function(response) {
                console.log(response.data); 
                self.locations = response.data.businesses; 
            }); 
        }
        this.getLocations(); 

        this.successLocationInfo = function(position) {
            self.loading = false; 
            self.userLat = position.coords.latitude; 
            self.userLong = position.coords.longitude; 
        };
        this.failLocationInfo = function(err) {
            self.loading = false; 
            self.message = "We weren't able to get your location"; 
        }
        this.getUserLocation = function() {
            self.loading = true; 
            locationFactory.getUserLocation()
                .then(this.successLocationInfo, this.failLocationInfo);
        }
        this.getUserLocation(); 
    }]) 
    .factory('LocationFactory', ['$q', function($q) {
        var factory = {}; 

        factory.getUserLocation = function() {
            var deferred = $q.defer(); 
            if(!navigator.geolocation) {
                return "Unable to acquire location"; 
            } else {
                navigator.geolocation.getCurrentPosition(
                function(position) { deferred.resolve(position);  }, 
                function(err) { deferred.reject(err); }); 
            }

            return deferred.promise; 
        }

        return factory;
    }])
    .filter('lower', function() {
        return function(input) {
            return input.toLowerCase();
        };
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

