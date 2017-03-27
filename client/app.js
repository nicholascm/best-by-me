'use strict';

angular.module('bestByMeApp', ['ngRoute'])

    .controller('HomeCtrl', function() {
        this.sample = 'sample'; 
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

