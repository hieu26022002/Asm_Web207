const clientApp = angular.module("clientApp", ["ngRoute"]);

clientApp.controller("paginateController", paginateController)
clientApp.controller("listBestSellerController", listBestSellerController)
// Route client App
clientApp.config(($routeProvider, $locationProvider) => {
    $locationProvider.hashPrefix("")

    $routeProvider.when("/", {
        templateUrl: './pages/Client/home.html',
        controller: "listBestSellerController"
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
        }).otherwise({
            redirectTo: "/"
        })

})

// const adminApp = angular.module("adminApp",["ngRoute"]);

// // Route admin App
// adminApp.config(($routeProvider, $locationProvider) => {
//     $locationProvider.hashPrefix("");

//     $routeProvider.when("/", {
//         templateUrl: "./pages/Admin/home.html"
//     })
// })