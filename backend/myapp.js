// Server Express (app.js)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mengatur file statis
app.use('/backend/frontend', express.static(path.join(__dirname, 'frontend')));

// Rute utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/auth/login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/auth/register.html'));
});

// Rute API untuk login dan register
app.use('/api', authRoutes);

// Tambahkan rute logout
app.get('/logout', (req, res) => {
    // Menghapus data session atau localStorage
    res.clearCookie('userData'); // Jika menggunakan cookie, bisa dihapus
    // Atau jika menggunakan sessionStorage, bisa dihapus di client-side
    res.redirect('/'); // Redirect ke halaman login
});

// Menambahkan middleware untuk memverifikasi apakah user sudah login
app.use((req, res, next) => {
    // Periksa apakah user terautentikasi (misalnya dengan JWT atau session)
    if (!req.user) {
        return res.status(401).json({ message: 'User belum login' });
    }
    next();
});

app.get('/api/user', (req, res) => {
    const userId = req.user.id;  // Asumsikan Anda memiliki ID pengguna yang disimpan di token
    db.query('SELECT name, email, phone FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Terjadi kesalahan.' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }
        return res.json(result[0]);  // Mengirimkan data pengguna
    });
});


// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
