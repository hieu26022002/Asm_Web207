const clientApp = angular.module("clientApp", ["ngRoute"]);

clientApp.run(function ($rootScope) {
    $rootScope.isLogin = false;
    $rootScope.nameUser = "";
    $rootScope.avatarUser = "";
    $rootScope.email = "";
    const token = localStorage.getItem("accessToken");
    if (token) {
        $rootScope.isLogin = true
        $rootScope.nameUser = sessionStorage.getItem("userName");
        $rootScope.avatarUser = sessionStorage.getItem("img");
        $rootScope.email = sessionStorage.getItem("email")
    } else {
        $rootScope.isLogin = false;
        $rootScope.nameUser = ""
        $rootScope.avatarUser = ""
        $rootScope.email = ""
    }
})

clientApp.controller("headerController", function ($scope, $rootScope) {
    $scope.isLogin = $rootScope.isLogin;
    $scope.nameUser = $rootScope.nameUser;
    $scope.avatarUser = $rootScope.avatarUser;
    $scope.email = $rootScope.email;

})

clientApp.controller("paginateController", paginateController)
clientApp.controller("listBestSellerController", listBestSellerController)
clientApp.controller("detailProduct", detailProduct)
// Route client App
clientApp.config(($routeProvider, $locationProvider) => {
    $locationProvider.hashPrefix("")

    $routeProvider.when("/", {
        templateUrl: './pages/Client/home.html',
        controller: "listBestSellerController",
    })
        .when("/products", {
            templateUrl: './pages/Client/shop.html',
            controller: "paginateController"
        }).when("/product/:id", {
            templateUrl: './pages/Client/detail.html',
            controller: "detailProduct"
        }).when("/blogs", {
            templateUrl: './pages/Client/blogs.html'
        }).when("/checkout", {
            templateUrl: './pages/Client/checkout.html',
        })
        .when("/cart", {
            templateUrl: './pages/Client/cart.html',
        }).otherwise({
            redirectTo: "/"
        })

})
