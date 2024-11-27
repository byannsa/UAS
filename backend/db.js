const { Pool } = require('pg');

// Setup koneksi PostgreSQL
const pool = new Pool({
  user: 'postgres', // Ganti dengan username PostgreSQL Anda
  host: 'localhost',
  database: 'dbdonordarah', // Ganti dengan nama database Anda
  password: 'fabian123', // Ganti dengan password PostgreSQL Anda
  port: 5432,
});

// Fungsi untuk menjalankan query
const query = (text, params) => pool.query(text, params);

module.exports = { query };
