function authController($scope, $http, $location) {
  $scope.registerData = {};
  $scope.loginData = {};
  $scope.message = '';

  $scope.registerData = {};
  $scope.register = function () {
    // Kiểm tra tài khoản tồn tại
    $http.get(API + '/users', { params: { email: $scope.registerData.email } })
      .then(function (response) {
        if (response.data.length > 0) {
          alert("Tài khoản này đã tồn tại!!!")
        } else {
          // Đăng ký tài khoản mới
          $http.post(API + '/register', $scope.registerData)
            .then(function (response) {
              // Đăng ký thành công, điều hướng đến trang đăng nhập
              alert("Đăng ký thành công!!!")
            }, function (error) {
              alert(`Đã có lỗi ${error} xảy ra!!!`)
            });
        }
      });
  };

  $scope.login = function () {
    if ($scope.loginForm.$valid) {
      $http.post(API + '/login', $scope.loginData)
        .then(function (response) {
          // Lưu thông tin đăng nhập vào localStorage
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('userId', response.data.userId);

          // Điều hướng đến trang chính của ứng dụng
          $location.path('/home');
        }, function (error) {
          $scope.message = error.data.message;
        });
    }
  };
}