(function () {
    var myApp = angular.module('myApp', ['ui.router']);
    myApp.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home')
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.hbs'
            })
            .state('query', {
                url:'/query',
                templateUrl:'query.hbs'
            })
            .state('accomplishments', {
                url:'/accomplishements',
                templateUrl:'accomplishment.hbs'
            })
            .state('aboutus', {
                url:'/about-us',
                templateUrl:'aboutus.hbs'
            })
            .state('profile', {
                url:'/profile',
                templateUrl:'profile.hbs'
            })
            
        })
})();