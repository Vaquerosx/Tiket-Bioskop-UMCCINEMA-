# Inisialisasi Denah Kursi (7 baris reguler + 1 baris VIP)
kursi_bioskop = [
    ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10"],
    ["B1","B2","B3","B4","B5","B6","B7","B8","B9","B10"],
    ["C1","C2","C3","C4","C5","C6","C7","C8","C9","C10"],
    ["D1","D2","D3","D4","D5","D6","D7","D8","D9","D10"],
    ["E1","E2","E3","E4","E5","E6","E7","E8","E9","E10"],
    ["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"],
    ["G1","G2","G3","G4","G5","G6","G7","G8","G9","G10"],
    ["VIP1", "VIP2", "VIP3", "VIP4", "VIP5", "VIP6"] # Baris VIP
]

riwayat_transaksi = []

data_film = {
    "1": {"judul": "Avatar Fire And Ash", "harga": 40000, "teater": "Teater 1", "jam": ["13:00", "15:00", "17:00", "19:00", "21:00"]},
    "2": {"judul": "Kang Mak (from pee mak)", "harga": 35000, "teater": "Teater 2", "jam": ["11:30", "13:30", "15:00", "17:30", "19:30"]},
    "3": {"judul": "AGAK LAEN: Menyala Pantiku", "harga": 35000, "teater": "Teater 3", "jam": ["12:00", "14:00", "16:00", "18:00", "20:00"]},
    "4": {"judul": "A Minecraft Movie", "harga": 40000, "teater": "Teater 4", "jam": ["13:00", "15:00", "17:00", "18:30", "20:30"]}
}

def tampilkan_kursi():
    print("\n          === DENAH KURSI BIOSKOP ===")
    print("              [ LAYAR DEPAN ]")
    
    # Tampilkan kursi baris A-G
    for baris in kursi_bioskop[:7]:
        # Bagian kiri (Kolom 1-7)
        kiri = "  ".join(baris[:7])
        # Bagian kanan (Kolom 8-10) dengan 6 spasi pemisah di tengah
        kanan = "  ".join(baris[7:])
        print(f" {kiri}      {kanan}")
    
    # Perbaikan Baris VIP agar sejajar dengan kolom reguler
    v = kursi_bioskop[7]
    # Penjelasan Spasi:
    # VIP1 sejajar A1, VIP2 sejajar A3, VIP3 sejajar A4, 
    # VIP4 sejajar A5, VIP5 sejajar A6, VIP6 sejajar A7
    print(f"  {v[0]}   {v[1]}    {v[2]}   {v[3]}    {v[4]}  {v[5]}")
    print("===========================================")

def pesan_tiket():
    print("\n--- Selamat Datang di UMCCINEMA ---")
    nama = input("Masukkan Nama Pembeli: ")
    
    keranjang = []
    total_seluruh_bayar = 0

    while True:
        print("\n--- DAFTAR FILM ---")
        for k, v in data_film.items():
            print(f"{k}. {v['judul']} (Rp {v['harga']})")
        
        pilihan = input("\nPilih nomor film (atau ketik 's' untuk lanjut ke pembayaran): ")
        if pilihan.lower() == 's':
            if not keranjang:
                print("Keranjang kosong!")
                continue
            break
        
        if pilihan in data_film:
            film_dipilih = data_film[pilihan]
            
            # Validasi Jam
            while True:
                print(f"\nJam Tayang untuk {film_dipilih['judul']}:")
                for i, jam in enumerate(film_dipilih['jam'], 1):
                    print(f"{i}. {jam}")
                try:
                    opsi_jam = int(input("Pilih nomor jam tayang: ")) - 1
                    if 0 <= opsi_jam < len(film_dipilih['jam']):
                        jam_final = film_dipilih['jam'][opsi_jam]
                        break
                    else: print("Opsi tidak tersedia!")
                except ValueError: print("Masukkan angka!")

            # Validasi Tipe & Pemilihan Kursi
            while True:
                print("\nTipe Tiket:\n1. VIP (+Rp 25k)\n2. Reguler (+Rp 0)")
                pilih_tipe = input("Pilih tipe (1/2): ")
                
                if pilih_tipe == "1":
                    tipe, tambahan = "VIP", 25000
                elif pilih_tipe == "2":
                    tipe, tambahan = "Reguler", 0
                else:
                    print("Input invalid!")
                    continue

                harga_per_tiket = film_dipilih['harga'] + tambahan
                tampilkan_kursi()
                
                try:
                    jumlah_kursi = int(input(f"Berapa tiket {film_dipilih['judul']}? "))
                    kursi_dipesan = []
                    error_vip = False
                    
                    for i in range(jumlah_kursi):
                        valid = False
                        while not valid:
                            pk = input(f"Pilih kode kursi ke-{i+1}: ").upper()
                            
                            # Cek apakah user Reguler mencoba memilih kursi VIP
                            if tipe == "Reguler" and pk.startswith("VIP"):
                                print("Change to VIP to sit in this seat.")
                                error_vip = True
                                break 
                            
                            # Cari kursi di denah
                            for r in range(len(kursi_bioskop)):
                                if pk in kursi_bioskop[r] and pk != "XX":
                                    idx = kursi_bioskop[r].index(pk)
                                    kursi_bioskop[r][idx] = "XX"
                                    kursi_dipesan.append(pk)
                                    valid = True
                                    break
                            
                            if error_vip: break
                            if not valid: print("Kursi tidak tersedia atau format salah!")
                        
                        if error_vip: break
                    
                    if error_vip:
                        continue

                    subtotal = harga_per_tiket * jumlah_kursi
                    total_seluruh_bayar += subtotal
                    keranjang.append({
                        "film": film_dipilih['judul'], "teater": film_dipilih['teater'],
                        "jam": jam_final, "tipe": tipe, "kursi": ", ".join(kursi_dipesan), "subtotal": subtotal
                    })
                    break 
                except ValueError: 
                    print("Input harus angka!")

        else: print("Pilihan tidak valid.")

    # --- BAGIAN PEMBAYARAN ---
    tipe_payment = ""
    is_online = False
    
    while True:
        print(f"\nTotal Pembayaran: Rp {total_seluruh_bayar}")
        print("Metode Pembayaran:")
        print("1. E-Wallet")
        print("2. Transfer Bank")
        print("3. QRIS (UMCCINEMA)")
        print("4. Alfamart / Indomaret")
        print("5. Credit/Debit Card (Visa/Mastercard)")
        print("6. Cash (Bayar di Kasir)")
        
        pilih_utama = input("Pilih metode (1-6): ")
        
        if pilih_utama == "1":
            while True:
                print("\n--- OPSI E-WALLET ---")
                print("1. Gopay\n2. Dana\n3. Shopeepay")
                ew = input("Pilih (1/2/3): ")
                if ew in ["1", "2", "3"]:
                    nama_ew = "Gopay" if ew=="1" else "Dana" if ew=="2" else "Shopeepay"
                    tipe_payment = f"E-Wallet ({nama_ew})"
                    print(f"\n[!] Silakan transfer ke {nama_ew}: 082115129852")
                    print("A/N: Fadilah Wildan Firdaus")
                    is_online = True
                    break
                else: print(">>> Opsi Invalid! Kembali ke menu E-Wallet.")
            if is_online: break
        elif pilih_utama == "2":
            while True:
                print("\n--- OPSI TRANSFER BANK ---")
                print("1. BRI\n2. Mandiri\n3. Seabank\n4. BSI")
                tb = input("Pilih (1-4): ")
                if tb == "1": tipe_payment, rek = "Transfer Bank (BRI)", "32950101593505"
                elif tb == "2": tipe_payment, rek = "Transfer Bank (Mandiri)", "1340023079691"
                elif tb == "3": tipe_payment, rek = "Transfer Bank (Seabank)", "901863607990"
                elif tb == "4": tipe_payment, rek = "Transfer Bank (BSI)", "7268594129"
                else:
                    print(">>> Opsi Invalid! Kembali ke menu Transfer Bank.")
                    continue
                print(f"\n[!] No Rekening {tipe_payment}: {rek}")
                print("A/N: Fadilah Wildan Firdaus")
                is_online = True
                break
            if is_online: break
        elif pilih_utama == "3":
            tipe_payment = "QRIS (UMCCINEMA)"
            print("\n[ GENERATING QRIS UMCCINEMA... ]")
            print("###########################")
            print("##                     ##")
            print("##   [ QRIS CODE ]     ##")
            print("##     UMCCINEMA       ##")
            print("##                     ##")
            print("###########################")
            is_online = True
            break
        elif pilih_utama == "6":
            tipe_payment = "Cash"
            print("\nSilakan bayar di kasir.")
            is_online = False
            break
        else:
            print("\n>>> Pilihan tidak tersedia atau sedang perbaikan. <<<")

    if is_online:
        input("\nTekan Enter jika sudah transfer...")
        input("Unggah bukti (Ketik 'ss' untuk simulasi): ")
    
    input("\nKlik 'Pesanan Diterima' (Enter) untuk mencetak tiket...")
    
    for item in keranjang:
        item['nama'] = nama
        item['payment'] = tipe_payment
        riwayat_transaksi.append(item)
    print("\n--- Transaksi Berhasil! ---")

def lihat_riwayat():
    print("\n=== RIWAYAT TRANSAKSI ===")
    if not riwayat_transaksi:
        print("Belum ada transaksi.")
    else:
        for trx in riwayat_transaksi:
            print(f"Nama: {trx['nama']}")
            print(f"Film: {trx['film']} ({trx['teater']})")
            print(f"Jam: {trx['jam']}")
            print(f"Tipe: {trx['tipe']}")
            print(f"Kursi: {trx['kursi']}")
            print(f"Total: Rp {trx['subtotal']}")
            print(f"Via: {trx['payment']}")
            print("-" * 35)

# Entry Point
while True:
    print("\n--- MENU UTAMA UMCCINEMA ---")
    print("1. Pesan Tiket\n2. Lihat Riwayat\n3. Keluar")
    m = input("Pilih menu: ")
    if m == "1": pesan_tiket()
    elif m == "2": lihat_riwayat()
    elif m == "3": break
    else: print("Menu tidak valid.")