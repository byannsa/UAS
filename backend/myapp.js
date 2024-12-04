const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth'); // Pastikan file ini sudah benar
const db = require('./db'); // Pastikan file ini sudah benar

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/data.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/auth/register.html'));
});


// Rute API
app.use('/api', authRoutes);

// Tambahkan rute logout
app.get('/logout', (req, res) => {
    res.redirect('/'); // Hapus token di client-side
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
