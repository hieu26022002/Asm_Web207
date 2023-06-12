function showCart($scope, $location) {
    const cartItems = sessionStorage.getItem("cartItems")
    $scope.cartItems = cartItems ? JSON.parse(cartItems) : []
    $scope.totalItem = $scope.cartItems.length
    sessionStorage.setItem("totalProducts", $scope.totalItem)
    $scope.cateName = ""
    $scope.cartItems.map(item => {
        switch (item.category) {
            case 1:
                $scope.cateName = "T-shirt"
                break;
            case 2:
                $scope.cateName = "Shirts"
                break;
            case 3:
                $scope.cateName = "Jeans"
                break;
            case 4:
                $scope.cateName = "Polo"
                break;
            case 5:
                $scope.cateName = "Blazers"
                break;
            case 6:
                $scope.cateName = "Hoodie"
                break;
            case 7:
                $scope.cateName = "Bomber"
                break;
            case 9:
                $scope.cateName = "Tank-top"
                break;
            case 10:
                $scope.cateName = "Cuban shirt"
                break;
            case 8:
                $scope.cateName = "Shorts"
                break;
            default:
                $scope.cateName = "Nothing!!!"
                break;
        }
    })

    $scope.getTotalPrice = function () {
        var total = 0;
        for (var i = 0; i < $scope.cartItems.length; i++) {
            var item = $scope.cartItems[i];
            total += item.price * item.quantity;
        }
        sessionStorage.setItem("totalPrice", total)
        return total;
    };

    $scope.incrementQuantity = function (item) {
        item.quantity++;
        sessionStorage.setItem('cartItems', JSON.stringify($scope.cartItems));
    };

    $scope.decrementQuantity = function (item) {
        if (item.quantity > 1) {
            item.quantity--;
            sessionStorage.setItem('cartItems', JSON.stringify($scope.cartItems));
        }
    };

    $scope.removeCartItem = function (item) {
        var index = $scope.cartItems.indexOf(item);
        if (index !== -1) {
            $scope.cartItems.splice(index, 1);
            sessionStorage.setItem('cartItems', JSON.stringify($scope.cartItems));
        }
    };
    $scope.toCheckout = function () {
        $location.path("checkout")
    }
}

function checkoutController($scope, $http) {
    const price = sessionStorage.getItem("totalPrice");
    const products = sessionStorage.getItem("totalProducts")
    $scope.totalPrice = price 
    $scope.totalProducts = products
    $scope.estimatedPrice = Number(price - 90)
    console.log($scope.estimatedPrice);
    $scope.customer = {};
    const cartItems = sessionStorage.getItem("cartItems")
    $scope.cartItems = cartItems ? JSON.parse(cartItems) : []
    $scope.placeOrder = function () {
        // Lưu đơn hàng vào Json-server
        var order = {
            customer: $scope.customer,
            products: $scope.cartItems,
            finalPrice: $scope.estimatedPrice,
            totalProducts: $scope.totalProducts
        };

        $http.post('http://localhost:3001/orders', order)
            .then(function (response) {
                // Đơn hàng đã được lưu thành công
                // Tiến hành xóa giỏ hàng và thông báo thành công cho người dùng
                sessionStorage.removeItem('cartItems');
                sessionStorage.removeItem('totalPrice');
                sessionStorage.removeItem('totalProducts');
                alert('Đơn hàng đã được gửi thành công!');

            }, function (error) {
                // Xử lý lỗi nếu có
                console.log(error);
                alert('Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại sau.');
            });
    };
}