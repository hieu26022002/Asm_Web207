const clientApp = angular.module("clientModule", ["ngRoute"]);

// Route client App
clientApp.config(($routeProvider, $locationProvider) => {
    $locationProvider.hashPrefix("")

    $routeProvider.when("/", {
        templateUrl: './pages/home.html'
    })
    .when("/products", {
        templateUrl: './pages/shop.html'
    }).when("/product/:id", {
        templateUrl: './pages/detail.html'
    }).when("/blogs", {
        templateUrl: './pages/blogs.html'
    }).when("/checkout", {
        templateUrl: './pages/checkout.html',
    })

})

const adminApp = angular.module("adminModule",["ngRoute"]);

// Route admin App
adminApp.config(($routeProvider, $location, $locationProvider) => {
    $locationProvider.hashPrefix("");

    // $routeProvider.when("/admin", {

    // })
})