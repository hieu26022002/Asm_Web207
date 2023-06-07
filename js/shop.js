const listProductsController = ($scope, $http) => {
    $scope.productsList = [];

    $http.get(API + "/products?_limit=8").then((res) => {
        $scope.productsList = res.data
    }).catch(() => {
        alert("Đã có lỗi xảy ra!!!")
    })
}

const paginateController = ($scope, $http) => {
    $scope.currentPage = 1; // Trang hiện tại
    $scope.itemsPerPage = 8; // Số sản phẩm hiển thị trên mỗi trang
    $scope.totalItems = 0; // Tổng số sản phẩm
    $scope.products = []; // Danh sách sản phẩm

    // Gửi yêu cầu GET để lấy dữ liệu sản phẩm từ server
    $http.get(API + `/products?_page=${$scope.currentPage}&_limit=8`)
        .then(function (response) {
            // Gán dữ liệu sản phẩm và tính toán số trang
            $scope.products = response.data;
            $scope.totalItems = $scope.products.length;
            $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
        })
        .catch(function (error) {
            // Xử lý khi xảy ra lỗi trong quá trình lấy dữ liệu
        });

    // Hàm chuyển đổi trang
    $scope.goToPage = function (pageNumber) {
        if (pageNumber >= 1 && pageNumber <= $scope.totalPages) {
            $scope.currentPage = pageNumber;
        }
    };

    // Lấy danh sách sản phẩm hiển thị trên trang hiện tại
    $scope.getProductsForCurrentPage = function () {
        var startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endIndex = startIndex + $scope.itemsPerPage;
        return $scope.products.slice(startIndex, endIndex);
    };
}