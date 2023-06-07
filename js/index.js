const listCatalogController = ($scope, $http) => {
    $scope.catalogList = [];

    $http.get(API + "/catalog").then((res) => {
        $scope.catalogList = res.data
    }).catch(() => {
        alert("Đã có lỗi xảy ra!!!!")
    })
}

const listBestSellerController = ($scope, $http) => {
    $scope.bestSellerList = [];

    $http.get(API + "/products?_limit=8").then((res) => {
        $scope.bestSellerList = res.data
    }).catch(() => {
        alert("Đã có lỗi xảy ra!!!")
    })
}