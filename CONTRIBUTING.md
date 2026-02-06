# 🤝 Panduan Kontribusi

Terima kasih telah tertarik untuk berkontribusi pada proyek **UMCCINEMA**! Dokumen ini berisi panduan untuk berkontribusi pada repository ini.

---

## 📋 Daftar Isi

- [Cara Berkontribusi](#cara-berkontribusi)
- [Aturan Commit Message](#aturan-commit-message)
- [Struktur Kode](#struktur-kode)
- [Standar Coding](#standar-coding)

---

## 🚀 Cara Berkontribusi

### 1. Fork Repository
Klik tombol "Fork" di GitHub untuk membuat salinan repository ke akun Anda.

### 2. Clone ke Lokal
```bash
git clone https://github.com/username-anda/umccinema.git
cd umccinema
```

### 3. Buat Branch Baru
```bash
git checkout -b fitur/nama-fitur
# atau
git checkout -b perbaikan/nama-perbaikan
```

### 4. Lakukan Perubahan
Edit kode sesuai kebutuhan, pastikan mengikuti standar coding yang sudah ditetapkan.

### 5. Commit Perubahan
```bash
git add .
git commit -m "feat: menambahkan fitur baru"
```

### 6. Push ke Repository
```bash
git push origin fitur/nama-fitur
```

### 7. Buat Pull Request
Buka GitHub dan buat Pull Request dari branch Anda ke branch `main`.

---

## 📝 Aturan Commit Message

Gunakan format berikut untuk commit message:

```
<tipe>: <deskripsi singkat>

[deskripsi detail opsional]
```

### Tipe Commit:
| Tipe | Keterangan |
|------|------------|
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `docs` | Perubahan dokumentasi |
| `style` | Perubahan formatting, styling |
| `refactor` | Refactoring kode |
| `test` | Menambah/memperbaiki test |
| `chore` | Maintenance, update dependencies |

### Contoh:
```bash
feat: menambahkan fitur filter film berdasarkan genre
fix: memperbaiki bug pada pemilihan kursi VIP
docs: memperbarui README dengan screenshot baru
style: merapikan indentasi pada app.js
```

---

## 📁 Struktur Kode

```
umccinema/
├── index.html      # Struktur HTML utama
├── styles.css      # Semua styling CSS
├── app.js          # Logika JavaScript
└── images/         # Asset gambar
```

### Aturan Penempatan:
- **HTML**: Semua markup di `index.html`
- **CSS**: Semua styling di `styles.css`
- **JavaScript**: Semua logika di `app.js`
- **Gambar**: Semua gambar di folder `images/`

---

## 🎨 Standar Coding

### HTML
- Gunakan semantic HTML5
- Indentasi 4 spasi
- Gunakan lowercase untuk tag dan atribut
- Selalu tutup tag dengan benar

### CSS
- Gunakan naming convention yang deskriptif
- Kelompokkan properti terkait
- Gunakan CSS custom properties (variables)
- Indentasi 4 spasi

### JavaScript
- Gunakan `const` dan `let`, hindari `var`
- Gunakan arrow functions jika memungkinkan
- Tambahkan komentar untuk fungsi kompleks
- Indentasi 4 spasi

---

## 👥 Tim Pengembang

**Kelompok 3 - TI25C**

Untuk pertanyaan atau diskusi, silakan hubungi anggota tim melalui issue GitHub.

---

*Terima kasih atas kontribusi Anda! 🙏*
