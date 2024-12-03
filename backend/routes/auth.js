const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { query } = require('../db'); // Koneksi database
const router = express.Router();

// Rute untuk registrasi pengguna
router.post('/register', async (req, res) => {
    const { nama, email, phone, password } = req.body;
    try {
        if (!nama || !email || !phone || !password) {
            return res.status(400).json({ message: 'Semua kolom harus diisi!' });
        }

        const userExists = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await query(
            `INSERT INTO users (nama, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [nama, email, phone, hashedPassword]
        );

        res.status(201).json({
            message: 'Registrasi berhasil!',
            user: {
                id: newUser.rows[0].id,
                nama: newUser.rows[0].nama,
                email: newUser.rows[0].email,
                phone: newUser.rows[0].phone
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// Rute untuk login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan Password wajib diisi!' });
        }

        const user = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Email tidak terdaftar!' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Password salah!' });
        }

        res.status(200).json({
            message: 'Login berhasil!',
            userId: user.rows[0].id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// Rute untuk registrasi pendonor
router.post('/registerDonor', async (req, res) => {
    const { nama, email, phone, golongan, pesan } = req.body;
    if (!nama || !email || !phone || !golongan) {
        return res.status(400).json({ success: false, pesan: 'Semua kolom wajib diisi' });
    }

    try {
        const insertResult = await query(
            'INSERT INTO donor (nama, email, phone, golongan, pesan) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [nama, email, phone, golongan, pesan]
        );

        if (insertResult.rows.length > 0) {
            res.json({ success: true, pesan: 'Pendaftaran pendonor berhasil!' });
        } else {
            res.status(500).json({ success: false, pesan: 'Gagal menyimpan data pendonor' });
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ success: false, pesan: 'Terjadi kesalahan saat mendaftar pendonor' });
    }
});

// Rute untuk mendapatkan daftar pendonor
router.get('/getDonors', async (req, res) => {
    try {
        const result = await query('SELECT * FROM donor');
        res.json({ donors: result.rows });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ pesan: 'Gagal mengambil data pendonor.' });
    }
});

module.exports = router;
