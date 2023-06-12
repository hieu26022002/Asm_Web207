const detailProduct = function ($scope, $http, $routeParams) {
    const id = $routeParams.id
    $scope.detail = {}
    $http.get(API + '/products/' + id).then(function (res) {
        $scope.detail = res.data
    })
}

const paginateController = function ($scope, $http) {
    $scope.currentPage = 1; // Trang hiện tại
    $scope.itemsPerPage = 8; // Số sản phẩm hiển thị trên mỗi trang
    $scope.totalItems = 0; // Tổng số sản phẩm
    $scope.products = []; // Danh sách sản phẩm trên trang hiện tại
    $scope.allProducts = [];
    $scope.pagination = [];
    $scope.filter = false;

    // Lấy danh sách sản phẩm từ JSON Server
    $scope.getProducts = function () {
        $scope.filter = false;
        var url = API + `/products?_page=` + $scope.currentPage + `&_limit=` + $scope.itemsPerPage;
        $http.get(url)
            .then(function (response) {
                $scope.products = response.data;
                $scope.totalItems = parseInt(response.headers('X-Total-Count'));
                $scope.totalPages = Math.ceil(response.headers('X-Total-Count') / 8);
                $http.get(API + `/products`).then((res) => {
                    $scope.allProducts = res.data
                })
                $http.get(API + `/category`).then(function (res) {
                    $scope.categories = res.data
                    $scope.filterProducts();
                })
                generatePagination();
            })
            .catch(function (error) {
                console.log('Lỗi khi lấy danh sách sản phẩm:', error);
            });
        $scope.selectedCategory = '';
    };

    // Chuyển đến trang mới
    $scope.goToPage = function (page) {
        if (page < 1 || page > $scope.totalPages) {
            return;
        }
        $scope.currentPage = page;
        $scope.getProducts(page);
    };
    // Khởi tạo
    function generatePagination() {
        $scope.pagination = [];
        var startPage, endPage;
        var totalVisiblePages = 4; // Số trang cụ thể hiển thị
        if ($scope.totalPages <= totalVisiblePages) {
            startPage = 1;
            endPage = $scope.totalPages;
        } else {
            var currentPage = $scope.currentPage;
            var halfVisiblePages = Math.floor(totalVisiblePages / 2);

            if (currentPage <= halfVisiblePages) {
                startPage = 1;
                endPage = totalVisiblePages;
            } else if (currentPage + halfVisiblePages >= $scope.totalPages) {
                startPage = $scope.totalPages - totalVisiblePages + 1;
                endPage = $scope.totalPages;
            } else {
                startPage = currentPage - halfVisiblePages;
                endPage = currentPage + halfVisiblePages;
            }
        }

        for (var i = startPage; i <= endPage; i++) {
            $scope.pagination.push(i);
        }
    }
    $scope.filterProducts = function () {
        $scope.filter = true;
        $scope.filteredProducts = $scope.allProducts.filter(function (product) {
            return $scope.selectedCategory === '' || product.category_id === $scope.selectedCategory;
        });
        console.log($scope.filteredProducts);
    };
    $scope.getCategoryName = function (categoryId) {
        console.log(getCategoryName);
        var category = $scope.categories.find(function (cat) {
            return cat.id === categoryId;
        });
        return category ? category.name : '';
    };
    // Khởi tạo
    $scope.getProducts();
}

