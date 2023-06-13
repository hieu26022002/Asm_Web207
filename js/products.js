// function addController($scope, $http, $location) {
//     $scope.newProduct = {};
//     $scope.file = null;
//     $scope.categories = [];
//     // Hàm lấy danh sách danh mục sản phẩm từ API
//     $scope.getCategories = function () {
//         $http.get(API + '/categories')
//             .then(function (response) {
//                 $scope.categories = response.data;
//             });
//     };

//     // Hàm thêm sản phẩm
//     $scope.addProduct = function () {
//         // Kiểm tra xem đã chọn ảnh hay chưa
//         if ($scope.file) {
//             alert("Vào if")
//             // Tải ảnh lên Cloudinary
//             var uploadUrl = 'https://api.cloudinary.com/v1_1/dielvkumg/upload';
//             var formData = new FormData();
//             formData.append('file', $scope.file);
//             formData.append('upload_preset', 'b1yuxfnb');

//             $http.post(uploadUrl, formData, {
//                 transformRequest: angular.identity,
//                 headers: { 'Content-Type': undefined }
//             })
//                 .then(function (response) {
//                     var imageUrl = response.data.secure_url;

//                     // Thêm sản phẩm vào API Json-Server
//                     var productData = {
//                         // id: 0,
//                         name: $scope.newProduct.name,
//                         price: $scope.newProduct.price,
//                         overview: $scope.newProduct.overview,
//                         description: $scope.newProduct.description,
//                         category_id: $scope.newProduct.category_id,
//                         img: imageUrl
//                     };
//                     console.log("productData line 41:", productData);
//                     $http.post(API + '/products', productData)
//                         .then(function (response) {
//                             // Xóa dữ liệu và ảnh đã chọn
//                             $scope.newProduct = {};
//                             $scope.file = null;

//                             // Refresh danh sách sản phẩm
//                             $scope.getProducts();
//                         });
//                 });
//         } else {
//             alert("Vào else")
//             // Nếu không có ảnh, thêm sản phẩm vào API Json-Server trực tiếp
//             var productData = {
//                 // id: 0,
//                 name: $scope.newProduct.name,
//                 price: $scope.newProduct.price,
//                 overview: $scope.newProduct.overview,
//                 description: $scope.newProduct.description,
//                 category_id: $scope.newProduct.category_id,
//             };
//             console.log("productData line 62:", productData);
//             $http.post(API + '/products', productData)
//                 .then(function (response) {
//                     // Xóa dữ liệu
//                     $scope.newProduct = {};

//                     // Refresh danh sách sản phẩm
//                     // $scope.getProducts();
//                 });
//         }
//     };

//     // Hàm xử lý khi chọn ảnh
//     $scope.onFileSelect = function (event) {
//         const fileForm = event.files[0]
//         console.log("event:", event);
//         $scope.file = fileForm;
//         console.log($scope.file);
//     };

//     // Hàm lấy danh sách sản phẩm từ API
//     $scope.getProducts = function () {
//         $http.get(API + '/products')
//             .then(function (response) {
//                 $scope.products = response.data;
//             });
//     };

//     // Gọi hàm lấy danh sách danh mục và danh sách sản phẩm khi khởi tạo controller
//     $scope.getCategories();
//     $scope.getProducts();
// }


function addController($scope, $http, $location) {
    $scope.products = {
        id: 0,
        name: "",
        price: 0,
        img: "",
        overview: "",
        description: "",
        category_id: 0,
    }
    $scope.categories = [];
    // Hàm lấy danh sách danh mục sản phẩm từ API
    $scope.getCategories = function () {
        $http.get(API + '/category')
            .then(function (response) {
                $scope.categories = response.data;
            });
    };
    $scope.addProduct = function () {
        $http.post(API + '/products', $scope.products)
            .then(function () {
                $location.path('/products')
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    $scope.getCategories();
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

function editController($scope, $http, $routeParams,$location) {
    const id = $routeParams.id;
    $scope.categories = [];
    $scope.product = {}
    $http.get(API + '/products/' + id).then(function (res) {
        $scope.product = res.data
    })

    $scope.getCategories = function () {
        $http.get(API + '/category')
            .then(function (response) {
                $scope.categories = response.data;
            });
    };
    $scope.getCategories()
    $scope.accept = function () {
        $http.put(API + "/products/" + id, $scope.product).then(function () {
            alert("Sửa thành công");
            $location.path("/products")
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