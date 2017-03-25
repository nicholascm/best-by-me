bestByMeApp.config(['$routeProvider'], ($routeProvider) => {
    $routeProvider.when('/home', {
        templateUrl: '../views/home.html',
        controller: 'HomeCtrl', 
        controllerAs: 'home', 
        access: {restricted: false}
    }); 
}); 


