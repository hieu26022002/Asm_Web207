const clientApp = angular.module("clientApp", ["ngRoute"]);

clientApp.run(function ($rootScope) {
    $rootScope.isLogin = false;
    $rootScope.nameUser = "";
    $rootScope.avatarUser = "";
    $rootScope.email = "";
    const token = localStorage.getItem("accessToken");
    if (token) {
        $rootScope.isLogin = true
        $rootScope.nameUser = localStorage.getItem("userName");
        $rootScope.avatarUser = localStorage.getItem("img");
        $rootScope.email = localStorage.getItem("email")
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

clientApp.controller("addCartController", function ($scope) {
    var cartItems = sessionStorage.getItem('cartItems');
    $scope.cartItems = cartItems ? JSON.parse(cartItems) : [];

    $scope.addToCart = function (product) {
        const existingProduct = $scope.cartItems.find((item) => {
            return item.id === product.id
        });
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                category: product.category_id,
                quantity: 1
            }
            $scope.cartItems.push(newProduct)
        }
        sessionStorage.setItem('cartItems', JSON.stringify($scope.cartItems));
    }
})

clientApp.controller("paginateController", paginateController)
clientApp.controller("listBestSellerController", listBestSellerController)
clientApp.controller("detailProduct", detailProduct)
clientApp.controller('showCart', showCart)
clientApp.controller("checkoutController", checkoutController)
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
            controller: 'checkoutController'
        })
        .when("/cart", {
            templateUrl: './pages/Client/cart.html',
            controller: 'showCart'
        }).otherwise({
            redirectTo: "/"
        })

})
