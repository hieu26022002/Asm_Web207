const listProducts = function ($scope, $http) {
    $scope.productsList = [];

    $http.get(API + "/products").then((res) => {
        $scope.productsList = res.data
    }).catch(() => {
        alert("Đã có lỗi xảy ra!!!!")
    })
}

function viewDetail($scope, $http, $routeParams, $location) {
    $scope.id = $routeParams.id
    $scope.item = {};
    $http.get(API + "/products" + `/${$scope.id}`).then(function (res) {
        $scope.item = res.data
    }).catch(() => {
        alert("Không thành công!!!")
    })
}

function addController($scope, $http, $location) {
    $scope.account = {
        id: 0,
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
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