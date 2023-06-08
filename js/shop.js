const listProductsController = ($scope, $http) => {
    $scope.productsList = [];

    $http.get(API + "/products?_limit=8").then((res) => {
        $scope.productsList = res.data
    }).catch(() => {
        alert("Đã có lỗi xảy ra!!!")
    })
}

const paginateController = function ($scope, $http) {
    $scope.currentPage = 1; // Trang hiện tại
    $scope.itemsPerPage = 8; // Số sản phẩm hiển thị trên mỗi trang
    $scope.totalItems = 0; // Tổng số sản phẩm
    $scope.products = []; // Danh sách sản phẩm trên trang hiện tại

    // Lấy danh sách sản phẩm từ JSON Server
    $scope.getProducts = function () {
        var url = API + `/products?_page=` + $scope.currentPage + `&_limit=` + $scope.itemsPerPage;
        $http.get(url)
            .then(function (response) {
                $scope.products = response.data;
                $scope.totalItems = parseInt(response.headers('X-Total-Count'));
            })
            .catch(function (error) {
                console.log('Lỗi khi lấy danh sách sản phẩm:', error);
            });
    };

    // Chuyển đến trang mới
    $scope.goToPage = function (pageNumber) {
            $scope.currentPage = pageNumber;
            $scope.getProducts();
    };
    // Khởi tạo
    $scope.getProducts();
}