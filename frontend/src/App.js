import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [report, setReport] = useState({
    name: '',
    description: '',
    province: '',
    city: '',
    district: '',
    subdistrict: '',
    address: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleImageChange = (e) => {
    setReport({ ...report, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', report.name);
    formData.append('description', report.description);
    formData.append('province', report.province);
    formData.append('city', report.city);
    formData.append('district', report.district);
    formData.append('subdistrict', report.subdistrict);
    formData.append('address', report.address);
    formData.append('image', report.image);

    try {
      await axios.post('http://localhost:5000/api/reports', formData);
      toast.success('✅ Laporan berhasil dikirim');

      setReport({
        name: '',
        description: '',
        province: '',
        city: '',
        district: '',
        subdistrict: '',
        address: '',
        image: null,
      });
    } catch (error) {
      toast.error('❌ Terjadi kesalahan, coba lagi');
    }
  };

  return (
    <div className="form-container">
      <h2>Formulir Pengaduan Masyarakat</h2>

      <form onSubmit={handleSubmit}>
        <label>Nama</label>
        <input
          type="text"
          name="name"
          value={report.name}
          onChange={handleChange}
          placeholder="Masukkan nama Anda"
          required
        />

        <label>Deskripsi Pengaduan</label>
        <textarea
          name="description"
          value={report.description}
          onChange={handleChange}
          placeholder="Jelaskan pengaduan Anda"
          required
        ></textarea>

        <label>Provinsi</label>
        <input
          type="text"
          name="province"
          value={report.province}
          onChange={handleChange}
          placeholder="Masukkan provinsi"
          required
        />

        <label>Kota/Kabupaten</label>
        <input
          type="text"
          name="city"
          value={report.city}
          onChange={handleChange}
          placeholder="Masukkan kota atau kabupaten"
          required
        />

        <label>Kecamatan</label>
        <input
          type="text"
          name="district"
          value={report.district}
          onChange={handleChange}
          placeholder="Masukkan kecamatan"
          required
        />

        <label>Kelurahan</label>
        <input
          type="text"
          name="subdistrict"
          value={report.subdistrict}
          onChange={handleChange}
          placeholder="Masukkan kelurahan"
          required
        />

        <label>Alamat Lengkap</label>
        <textarea
          name="address"
          value={report.address}
          onChange={handleChange}
          placeholder="Masukkan alamat lengkap"
          required
        ></textarea>

        <label>Upload Foto (Opsional)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Kirim Laporan</button>
      </form>

      {/* Container untuk notifikasi */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
