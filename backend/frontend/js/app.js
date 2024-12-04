// Mendeklarasikan modul AngularJS
var app = angular.module('donorApp', []);

// Controller Login
app.controller('LoginController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.user = {};

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


app.controller('DonorController', ['$scope', '$http', function($scope, $http) {
    $scope.donor = {}; // Objek untuk data donor
    $scope.donorsList = []; // Array untuk menyimpan daftar pendonor

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







app.controller("MainController", function ($scope) {
  $scope.profilData = [
    { nama: "Geraldus Raja",
        email: "raja@gmail.com",
        notelp: "0812535230171",
        golongan: "O",
        pesan: "Siap donor darah" },
    { nama: "Fabian",
        email: "fabian@gmail.com",
        notelp: "081253523108",
        golongan: "A",
        pesan: "Semoga bisa donor darah" },
    { nama: "Dennis Ananda",
        email: "nanda@gmail.com",
        notelp: "0812353523003",
        golongan: "AB",
        pesan: "Mau donor darah" },
    { nama: "Geraldus Raja",
        email: "raja@gmail.com",
        notelp: "0812535230171",
        golongan: "O",
        pesan: "Siap donor darah" },
    { nama: "Fabian",
        email: "fabian@gmail.com",
        notelp: "081253523108",
        golongan: "A",
        pesan: "Semoga bisa donor darah" },
    { nama: "Dennis Ananda",
        email: "nanda@gmail.com",
        notelp: "0812353523003",
        golongan: "AB",
        pesan: "Mau donor darah" },
    { nama: "Geraldus Raja",
        email: "raja@gmail.com",
        notelp: "0812535230171",
        golongan: "O",
        pesan: "Siap donor darah" },
    { nama: "Fabian",
        email: "fabian@gmail.com",
        notelp: "081253523108",
        golongan: "A",
        pesan: "Semoga bisa donor darah" },
    { nama: "Dennis Ananda",
        email: "nanda@gmail.com",
        notelp: "0812353523003",
        golongan: "AB",
        pesan: "Mau donor darah" },
    { nama: "Geraldus Raja",
        email: "raja@gmail.com",
        notelp: "0812535230171",
        golongan: "O",
        pesan: "Siap donor darah" },
    { nama: "Fabian",
        email: "fabian@gmail.com",
        notelp: "081253523108",
        golongan: "A",
        pesan: "Semoga bisa donor darah" },
    { nama: "Dennis Ananda",
        email: "nanda@gmail.com",
        notelp: "0812353523003",
        golongan: "AB",
        pesan: "Mau donor darah" },
    { nama: "Geraldus Raja",
        email: "raja@gmail.com",
        notelp: "0812535230171",
        golongan: "O",
        pesan: "Siap donor darah" },
    { nama: "Fabian",
        email: "fabian@gmail.com",
        notelp: "081253523108",
        golongan: "A",
        pesan: "Semoga bisa donor darah" },
    { nama: "Dennis Ananda",
        email: "nanda@gmail.com",
        notelp: "0812353523003",
        golongan: "AB",
        pesan: "Mau donor darah" },
  ];

  $scope.tambahProfil = function () {
    const nama = prompt("Masukkan Nama:");
    const email = prompt("Masukkan Email:");
    const notelp = prompt("Masukkan Nomor Telepon:");
    const golongan = prompt("Masukkan Golongan Darah:");
    const pesan = prompt("Masukkan Pesan:");
    if (nama && email && notelp && golongan && pesan) {
      $scope.profilData.push({ nama, email, notelp, golongan, pesan });
    } else {
      alert("Harap lengkapi semua data!");
    }
  };

  $scope.editProfil = function (index) {
    const profil = $scope.profilData[index];
    profil.nama = prompt("Edit Nama:", profil.nama) || profil.nama;
    profil.email = prompt("Edit Email:", profil.email) || profil.email;
    profil.notelp = prompt("Edit No Telepon:", profil.notelp) || profil.notelp;
    profil.golongan = prompt("Edit Golongan Darah:", profil.golongan) || profil.golongan;
    profil.pesan = prompt("Edit Pesan:", profil.pesan) || profil.pesan;
  };

  $scope.hapusProfil = function (index) {
    if (confirm("Yakin ingin menghapus data ini?")) $scope.profilData.splice(index, 1);
  };

  $scope.unduhData = function () {
    const csvHeader = "Nama,Email,Nomor Telepon,Golongan Darah,Pesan\n";
    const csvContent = $scope.profilData
      .map((profil) =>
        `${profil.nama},${profil.email},${profil.notelp},${profil.golongan},${profil.pesan}`
      )
      .join("\n");
    const blob = new Blob([csvHeader + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "data_profil_donor.csv";
    downloadLink.click();
    URL.revokeObjectURL(url);
  };
});

