// Mendeklarasikan modul AngularJS
var app = angular.module('donorApp', []);

// Controller Login
app.controller('LoginController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.user = {};

    // Fungsi untuk melakukan registrasi
    $scope.register = function() {
        $http.post('/api/register', $scope.user)
            .then(function(response) {
                alert(response.data.message);
                $window.location.href = '/'; // Redirect ke halaman login
            })
            .catch(function(error) {
                alert(error.data.message || 'Terjadi kesalahan saat registrasi.');
            });
    };

    // Fungsi untuk login
    $scope.login = function() {
        $http.post('/api/login', $scope.user)
            .then(function(response) {
                alert(response.data.message); // Tampilkan pesan sukses
                localStorage.setItem('userId', response.data.userId); // Simpan ID pengguna ke localStorage
                $window.location.href = '/home'; // Redirect ke halaman home setelah login
            })
            .catch(function(error) {
                alert(error.data.message || 'Terjadi kesalahan saat login.');
            });
    };
}]);

// Controller Donor
app.controller('DonorController', ['$scope', '$http', function($scope, $http) {
    $scope.donor = {}; // Objek untuk data donor
    $scope.donorsList = []; // Array untuk menyimpan daftar pendonor
    $scope.filterGolongan = ''; // Menyimpan nilai filter golongan darah

    // Fungsi untuk mendaftarkan pendonor baru
    $scope.registerDonor = function() {
        $http.post('/api/registerDonor', $scope.donor)
            .then(function(response) {
                alert(response.data.pesan); // Tampilkan pesan sukses
                $scope.donor = {}; // Reset form
                $scope.getDonors(); // Refresh daftar pendonor
            })
            .catch(function(error) {
                alert(error.data.pesan || 'Terjadi kesalahan saat mendaftarkan pendonor.');
            });
    };

    // Fungsi untuk mengambil daftar pendonor
    $scope.getDonors = function() {
        $http.get('/api/getDonors')
            .then(function(response) {
                $scope.donorsList = response.data.donors; // Ambil data pendonor dari respons
            })
            .catch(function(error) {
                console.error("Terjadi kesalahan saat mengambil data pendonor:", error);
                alert("Gagal mengambil data pendonor.");
            });
    };

    // Panggil fungsi untuk mengambil daftar pendonor saat controller diinisialisasi
    $scope.getDonors();

    // Fungsi untuk filter golongan darah
    $scope.filterByGolongan = function(donor) {
        if (!$scope.filterGolongan) return true; // Jika filter kosong, tampilkan semua data
        return donor.golongan === $scope.filterGolongan; // Memastikan golongan darah sesuai dengan filter
    };
}]);

// Controller Main
app.controller('MainController', ['$scope', '$window', '$http', function($scope, $window, $http) {
    // Fungsi untuk logout
    $scope.confirmLogout = function() {
        var isConfirmed = window.confirm("Anda yakin ingin logout?");
        if (isConfirmed) {
            localStorage.removeItem('userId'); // Hapus ID pengguna
            $http.get('/logout')  // Mengirim permintaan logout ke backend
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