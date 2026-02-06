# 🎬 UMCCINEMA - Sistem Pemesanan Tiket Bioskop Premium

<div align="center">

![UMCCINEMA Banner](https://img.shields.io/badge/UMCCINEMA-Premium%20Movie%20Experience-gold?style=for-the-badge&logo=film&logoColor=white)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Aplikasi Web Pemesanan Tiket Bioskop dengan Desain Premium dan Modern**

[Demo](#demo) • [Fitur](#-fitur-utama) • [Instalasi](#-instalasi) • [Tim Pengembang](#-tim-pengembang)

</div>

---

## 📋 Deskripsi Proyek

**UMCCINEMA** adalah aplikasi web untuk sistem pemesanan tiket bioskop yang dirancang dengan tampilan premium dan modern. Aplikasi ini dibuat sebagai tugas kelompok untuk mata kuliah **Dasar Algoritma dan Pemrograman** di kelas **TI25C**.

Aplikasi ini memungkinkan pengguna untuk:
- Melihat daftar film yang sedang tayang
- Memilih jadwal tayang dan tipe tiket
- Memilih kursi secara interaktif
- Melakukan pembayaran melalui berbagai metode
- Menyimpan riwayat transaksi

---

## ✨ Fitur Utama

### 🎥 Manajemen Film
- Menampilkan katalog film dengan poster, rating, dan info teater
- Informasi harga dan jadwal tayang lengkap
- Desain kartu film yang menarik dengan animasi hover

### 💺 Pemilihan Kursi Interaktif
- Denah kursi visual dengan layout bioskop nyata
- Kursi Regular (A1-G10) dan VIP (VIP1-VIP6)
- Indikator status kursi (tersedia, dipilih, terisi)
- Perhitungan harga otomatis berdasarkan kursi yang dipilih

### 💳 Multi Metode Pembayaran
- **E-Wallet**: GoPay, Dana, ShopeePay
- **Bank Transfer**: BRI, Mandiri, SeaBank, BSI
- **Lainnya**: QRIS, Cash (bayar di kasir)

### 🎫 Sistem Tiket
- Dua tipe tiket: Regular dan VIP (+Rp 25.000)
- Tiket digital dengan detail lengkap
- Riwayat transaksi tersimpan di localStorage

### 🎨 Desain Premium
- Tema dark mode dengan aksen emas
- Animasi smooth dan transisi halus
- Responsive design untuk berbagai ukuran layar
- Glassmorphism effect pada komponen UI

---

## 🎬 Daftar Film

| No | Judul Film | Harga | Teater | Jadwal Tayang |
|----|------------|-------|--------|---------------|
| 1 | Avatar Fire And Ash | Rp 40.000 | Teater 1 | 13:00, 15:00, 17:00, 19:00, 21:00 |
| 2 | Kang Mak (from pee mak) | Rp 35.000 | Teater 2 | 11:30, 13:30, 15:00, 17:30, 19:30 |
| 3 | AGAK LAEN: Menyala Pantiku | Rp 35.000 | Teater 3 | 12:00, 14:00, 16:00, 18:00, 20:00 |
| 4 | A Minecraft Movie | Rp 40.000 | Teater 4 | 13:00, 15:00, 17:00, 18:30, 20:30 |

---

## 🚀 Instalasi

### Prasyarat
- Web browser modern (Chrome, Firefox, Edge, Safari)
- Text editor (opsional, untuk pengembangan)

### Cara Menjalankan

1. **Clone repository ini**
   ```bash
   git clone https://github.com/username/umccinema.git
   cd umccinema
   ```

2. **Buka aplikasi**
   - Klik dua kali pada file `index.html`, atau
   - Gunakan Live Server di VS Code, atau
   - Jalankan server lokal:
     ```bash
     # Menggunakan Python
     python -m http.server 8000
     
     # Atau menggunakan Node.js
     npx serve .
     ```

3. **Akses aplikasi**
   - Buka browser dan akses `http://localhost:8000`

---

## 📁 Struktur Proyek

```
umccinema/
├── 📄 index.html        # Halaman utama aplikasi
├── 📄 styles.css        # Stylesheet dengan desain premium
├── 📄 app.js            # Logika aplikasi JavaScript
├── 📁 images/           # Folder gambar poster film
│   ├── avatar.jpg
│   ├── kangmak.jpg
│   ├── agaklaen.jpg
│   └── minecraft.jpg
├── 📄 README.md         # Dokumentasi proyek (file ini)
├── 📄 LICENSE           # Lisensi MIT
└── 📄 .gitignore        # File yang diabaikan Git
```

---

## 🖥️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
|-----------|----------|
| **HTML5** | Struktur halaman web dan semantic markup |
| **CSS3** | Styling, animasi, dan responsive design |
| **JavaScript (ES6+)** | Logika aplikasi dan DOM manipulation |
| **LocalStorage API** | Penyimpanan data transaksi di browser |
| **Google Fonts** | Typography (Playfair Display, Outfit) |

---

## 🔄 Alur Penggunaan

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Pilih     │───▶│   Pilih     │───▶│   Pilih     │───▶│  Konfirmasi │
│   Film      │    │   Jadwal    │    │   Kursi     │    │  Pembayaran │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                          │                                      │
                          │                                      ▼
                          │                              ┌─────────────┐
                          └─ Masukkan Nama ─────────────▶│   Selesai!  │
                          └─ Pilih Tipe Tiket ──────────▶│   (Tiket)   │
                                                         └─────────────┘
```

---

## 👥 Tim Pengembang

<div align="center">

### **KELOMPOK 3 - TI25C**
**Mata Kuliah: Dasar Algoritma dan Pemrograman**

</div>

| No | Nama Lengkap | NIM |
|----|--------------|-----|
| 1 | **Fadilah Wildan Firdaus** | 250511125 |
| 2 | **Faqih Hidayatus Salam** | 250511067 |
| 3 | **M. Fathurrohman Sidiq** | 250511014 |
| 4 | **Mahdi Alven Nur** | 250511039 |
| 5 | **Vega Dua Ananta** | 250511063 |
| 6 | **Faisal Novranto** | 250511032 |

---

## 📸 Screenshot

<details>
<summary>Klik untuk melihat screenshot</summary>

### Halaman Utama
![Homepage](https://via.placeholder.com/800x400/1a1a2e/d4af37?text=UMCCINEMA+Homepage)

### Pemilihan Kursi
![Seat Selection](https://via.placeholder.com/800x400/1a1a2e/d4af37?text=Seat+Selection)

### Pembayaran
![Payment](https://via.placeholder.com/800x400/1a1a2e/d4af37?text=Payment+Methods)

</details>

---

## 📝 Catatan Pengembangan

### Fitur yang Sudah Diimplementasikan
- [x] Tampilan katalog film
- [x] Modal booking multi-step
- [x] Pemilihan kursi interaktif
- [x] Multiple payment methods
- [x] Riwayat transaksi
- [x] Responsive design
- [x] Animasi dan transisi

### Pengembangan Selanjutnya (Opsional)
- [ ] Backend integration
- [ ] User authentication
- [ ] Database untuk menyimpan data
- [ ] Print/Download tiket
- [ ] Notifikasi email

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 🙏 Ucapan Terima Kasih

Terima kasih kepada:
- Dosen pengampu mata kuliah Dasar Algoritma dan Pemrograman
- Universitas Muhammadiyah Cirebon
- Semua anggota Kelompok 3 TI25C yang telah berkontribusi

---

<div align="center">

**Made with ❤️ by Kelompok 3 TI25C**

*© 2026 UMCCINEMA - Dasar Algoritma dan Pemrograman*

</div>
