const express = require('express');
const bcrypt = require('bcryptjs');
const { query } = require('../db'); // Menggunakan koneksi dari db.js

const router = express.Router();

// Rute untuk register
router.post('/register', async (req, res) => {
  const { nama, email, phone, password } = req.body;

  try {
      // Validasi input: pastikan semua field terisi
      if (!nama || !email || !phone || !password) {
          return res.status(400).json({ message: 'Semua kolom harus diisi!' });
      }

      // Cek apakah email sudah terdaftar
      const userExists = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (userExists.rows.length > 0) {
          return res.status(400).json({ message: 'Email sudah terdaftar!' });
      }

      // Hash password menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan data pengguna ke database
      const newUser = await query(
          `INSERT INTO users (nama, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *`,
          [nama, email, phone, hashedPassword]
      );

      // Kirim respon sukses
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

// Rute untuk Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Validasi input
      if (!email || !password) {
          return res.status(400).json({ message: 'Email dan Password wajib diisi!' });
      }

      // Cek apakah email terdaftar
      const user = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
          return res.status(400).json({ message: 'Email tidak terdaftar!' });
      }

      // Verifikasi password
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
          return res.status(400).json({ message: 'Password salah!' });
      }

      // Jika login berhasil
      res.status(200).json({
          message: 'Login berhasil!',
          user: {
              id: user.rows[0].id,
              nama: user.rows[0].nama,
              email: user.rows[0].email,
              phone: user.rows[0].phone
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

module.exports = router;
