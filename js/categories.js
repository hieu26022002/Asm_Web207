
function addCateController($scope, $http, $location) {
    $scope.category = {
        id: 0,
        name: "",
    }
    $scope.addCate = function () {
        $http.post(API + '/category', $scope.category)
            .then(function () {
                $location.path('/categories')
            })
            .catch(function (err) {
                console.log(err);
            })
    }
}

const listCategories = function ($scope, $http) {
    var url = API + `/category`;
    $scope.categories = []
    $http.get(url)
        .then(function (response) {
            $scope.categories = response.data;
        })
        .catch(function (error) {
            console.log('Lỗi khi lấy danh sách sản phẩm:', error);
        });
}

function deleteCateController($scope, $http, $routeParams, $location) {
    $scope.id = $routeParams.id
    if (confirm("Bạn có chắc chắn muốn xoá danh mục này?")) {
        $http.delete(API + "/category" + `/${$scope.id}`).then(() => {
            $location.path("/categories")
        }).catch(() => {
            alert("Xoá không thành công!!!")
        })
    } else {
        $location.path("/categories")
    }
}

function editCateController($scope, $http, $routeParams, $location) {
    const id = $routeParams.id;
    $scope.category = {}
    $http.get(API + '/category/' + id).then(function (res) {
        $scope.category = res.data
        console.log($scope.category);
    })
    $scope.accept = function () {
        $http.put(API + "/category/" + id, $scope.category).then(function () {
            alert("Sửa thành công");
            $location.path("/categories")
        })
    }
}