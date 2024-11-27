// Mendeklarasikan modul AngularJS
var app = angular.module('donorApp', []);

// Controller Login
app.controller('LoginController', ['$scope', '$http', function($scope, $http) {
    $scope.user = {};

    $scope.register = function() {
        $http.post('/api/register', $scope.user)
            .then(function(response) {
                alert(response.data.message);
                window.location.href = '/'; // Redirect ke halaman login
            })
            .catch(function(error) {
                alert(error.data.message);
            });
    };

    $scope.login = function() {
        $http.post('/api/login', $scope.user)
            .then(function(response) {
                alert(response.data.message); // Tampilkan pesan sukses
                window.location.href = '/home'; // Redirect ke halaman home setelah login
            })
            .catch(function(error) {
                alert(error.data.message); // Tampilkan pesan error
            });
    };
}]);

// Controller Main
app.controller('MainController', ['$scope', '$window', '$http', function($scope, $window, $http) {
    // Fungsi untuk logout
    $scope.confirmLogout = function () {
        var isConfirmed = window.confirm("Anda yakin ingin logout?");
        if (isConfirmed) {
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userData');
            $http.get('/logout')  // Mengirim permintaan logout
                .then(function(response) {
                    alert("Anda telah berhasil logout.");
                    $window.location.href = '/'; // Redirect ke halaman login
                })
                .catch(function(error) {
                    console.error("Terjadi kesalahan saat logout:", error);
                    alert("Terjadi kesalahan saat logout.");
                });
        } else {
            alert("Logout dibatalkan.");
        }
    };
}]);

app.controller('UserProfileController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/user')
        .then(function(response) {
            $scope.user = response.data;
        })
        .catch(function(error) {
            console.error('Terjadi kesalahan:', error);
            $scope.errorMessage = 'Tidak dapat mengambil data pengguna.';
        });
}]);

