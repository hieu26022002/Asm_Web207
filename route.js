const clientApp = angular.module("clientModule", ["ngRoute"]);

// Route client App
clientApp.config(($routeProvider, $locationProvider,$location) => {
    $locationProvider.hashPrefix("")

    $routeProvider.when("/", {
        templateUrl: './index.html'
    })
    .when("/shop", {
        templateUrl: './shop.html'
    })
})

const adminApp = angular.module("adminModule",["ngRoute"]);

// Route admin App
adminApp.config(($routeProvider, $location, $locationProvider) => {
    $locationProvider.hashPrefix("");

    // $routeProvider.when("/admin", {

    // })
})