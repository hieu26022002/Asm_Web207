const clientApp = angular.module("clientApp", ["ngRoute"]);

clientApp.controller("paginateController",paginateController)
// Route client App
clientApp.config(($routeProvider, $locationProvider) => {
    $locationProvider.hashPrefix("")

    $routeProvider.when("/", {
        templateUrl: './pages/Client/home.html'
    })
    .when("/products", {
        templateUrl: './pages/Client/shop.html',
        controller: "paginateController"
    }).when("/product/:id", {
        templateUrl: './pages/Client/detail.html'
    }).when("/blogs", {
        templateUrl: './pages/Client/blogs.html'
    }).when("/checkout", {
        templateUrl: './pages/Client/checkout.html',
    })

})

const adminApp = angular.module("adminModule",["ngRoute"]);

// Route admin App
adminApp.config(($routeProvider, $location, $locationProvider) => {
    $locationProvider.hashPrefix("");

    // $routeProvider.when("/admin", {

    // })
})