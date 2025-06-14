const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // ganti jika username kamu beda
  password: '',         // ganti kalau pakai password
  database: 'pengaduan' // pastikan sesuai dengan nama database kamu
});

db.connect((err) => {
  if (err) throw err;
  console.log('Terhubung ke database');
});

// Setup penyimpanan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Endpoint menerima laporan
app.post('/api/reports', upload.single('image'), (req, res) => {
  const {
    name,
    description,
    province,
    city,
    district,
    subdistrict,
    address,
  } = req.body;

  const image = req.file ? 'uploads/' + req.file.filename : null;

  const sql = `INSERT INTO reports 
    (name, description, image, province, city, district, subdistrict, address) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [name, description, image, province, city, district, subdistrict, address];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Gagal menyimpan ke database:', err);
      return res.status(500).json({ error: 'Gagal menyimpan data' });
    }
    res.status(200).json({ message: 'Laporan berhasil disimpan' });
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
