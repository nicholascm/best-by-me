'use strict';

let angular = angular;

let bestByMeApp = angular.module('bestByMeApp', ['ngRoute']); 

bestByMeApp.controller('HomeCtrl', () => {
    this.sample = 'sample'; 
}); 
bestByMeApp.config(['$routeProvider'], ($routeProvider) => {
    $routeProvider.when('/home', {
        templateUrl: '../views/home.html',
        controller: 'HomeCtrl', 
        controllerAs: 'home', 
        access: {restricted: false}
    }); 
}); 

