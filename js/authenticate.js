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
              $location.path("/login.html")
            }, function (error) {
              alert(`Đã có lỗi xảy ra!!!`)
            });
        }
      });
  };

  $scope.login = function () {
    $http.post(API + '/login', $scope.loginData)
      .then(function (response) {
        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('userId', response.data.user.id);
        sessionStorage.setItem('userName', response.data.user.name);
        sessionStorage.setItem('email', response.data.user.email);
        sessionStorage.setItem('img', response.data.user.img);
        alert("Đăng nhập thành công!!!")
        // Điều hướng đến trang chính của ứng dụng
        window.location.href = "/";
      }, function (error) {
        alert(`Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!!!`)
      });
  };
}