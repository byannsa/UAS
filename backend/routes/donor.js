const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { query } = require('../db'); // Menggunakan koneksi dari db.js

const router = express.Router()

// Rute untuk mendaftar pendonor
router.post('/registerDonor', async (req, res) => {
  const {  nama, email, phone, golongan,  pesan } = req.body;

  // Validasi jika ada data yang kosong
  if (! nama || !email || !phone || !golongan) {
    return res.status(400).json({ success: false, pesan: 'Semua kolom wajib diisi' });
  }

  try {
    // Menyimpan data pendonor ke database
    const insertResult = await pool.query(
      'INSERT INTO donor ( nama, email, phone, golongan,  pesan) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [ nama, email, phone, golongan,  pesan]
    );

    if (insertResult.rows.length > 0) {
      res.json({ success: true,  pesan: 'Pendaftaran pendonor berhasil!' });
    } else {
      res.status(500).json({ success: false,  pesan: 'Gagal menyimpan data pendonor' });
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ success: false,  pesan: 'Terjadi kesalahan saat mendaftar pendonor' });
  }
});

module.exports = router;
