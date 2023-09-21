// Import modul dotenv untuk mengonfigurasi variabel lingkungan dari file .env
require('dotenv').config();

const { Pool } = require('pg');

// Konfigurasi koneksi database berdasarkan variabel lingkungan dari .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to database');
    client.release();
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    pool.end();
  }
}

testConnection();
