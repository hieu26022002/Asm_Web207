function addController($scope, $http, $location) {
    $scope.account = {
        id: 0,
        name: "",
        price: 0,
        img: "",
        overview: "",
        description: "",
        address: "",
        category_id: 0,
    }

    $scope.onSubmit = function (event) {
        event.preventDefault();
        $http.post(API + 'account', $scope.account)
            .then(function () {
                $location.path('/user')
            })
            .catch(function (err) {
                console.log(err);
            })
    }
}

const listProducts = function ($scope, $http) {
    $scope.currentPage = 1; // Trang hiện tại
    $scope.itemsPerPage = 9; // Số sản phẩm hiển thị trên mỗi trang
    $scope.totalItems = 0; // Tổng số sản phẩm
    $scope.products = []; // Danh sách sản phẩm trên trang hiện tại
    $scope.pagination = [];

    $scope.getProducts = function (page) {
        var url = API + `/products?_page=` + page + `&_limit=` + $scope.itemsPerPage;
        $http.get(url)
            .then(function (response) {
                $scope.products = response.data;
                $scope.totalItems = parseInt(response.headers('X-Total-Count'));
                $scope.totalPages = Math.ceil(response.headers('X-Total-Count') / 9);
                generatePagination();
            })
            .catch(function (error) {
                console.log('Lỗi khi lấy danh sách sản phẩm:', error);
            });
    };
    $scope.goToPage = function (page) {
        if (page < 1 || page > $scope.totalPages) {
            return;
        }
        console.log("Chuyển trang");
        $scope.currentPage = page;
        $scope.getProducts(page);
    };

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
    // Khởi tạo
    $scope.getProducts();
}

function editController($scope, $http, $routeParams) {
    const id = $routeParams.id;
    $scope.product = {
        id: 0,
        name: "",
        price: 0,
        img: "",
        overview: "",
        description: "",
        address: "",
        category_id: 0,
    }
    $http.get(API + '/products/' + id).then(function (res) {
        $scope.product = res.product
    })

    $scope.accept = function () {
        $http.put(API + "/products/" + id, $scope.product).then(function () {
            alert("Sửa thành công");
        })
    }
}

function deleteController($scope, $http, $routeParams, $location) {
    $scope.id = $routeParams.id
    if (confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
        $http.delete(API + "/products" + `/${$scope.id}`).then(() => {
            $location.path("/products")
        }).catch(() => {
            alert("Xoá không thành công!!!")
        })
    } else {
        $location.path("/products")
    }
}