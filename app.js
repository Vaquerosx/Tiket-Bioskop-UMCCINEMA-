// UMCCINEMA - Premium Cinema Booking System
// ==========================================

// Data Film (berdasarkan skrip Python)
const dataFilm = {
    "1": {
        judul: "Avatar Fire And Ash",
        harga: 40000,
        teater: "Teater 1",
        jam: ["13:00", "15:00", "17:00", "19:00", "21:00"],
        poster: "images/avatar.jpg",
        rating: 8.9
    },
    "2": {
        judul: "Kang Mak (from pee mak)",
        harga: 35000,
        teater: "Teater 2",
        jam: ["11:30", "13:30", "15:00", "17:30", "19:30"],
        poster: "images/kangmak.jpg",
        rating: 8.2
    },
    "3": {
        judul: "AGAK LAEN: Menyala Pantiku",
        harga: 35000,
        teater: "Teater 3",
        jam: ["12:00", "14:00", "16:00", "18:00", "20:00"],
        poster: "images/agaklaen.jpg",
        rating: 8.5
    },
    "4": {
        judul: "A Minecraft Movie",
        harga: 40000,
        teater: "Teater 4",
        jam: ["13:00", "15:00", "17:00", "18:30", "20:30"],
        poster: "images/minecraft.jpg",
        rating: 7.8
    }
};

// Denah Kursi
let kursiBioskop = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
    ["VIP1", "VIP2", "VIP3", "VIP4", "VIP5", "VIP6"]
];

// State
let riwayatTransaksi = JSON.parse(localStorage.getItem('umccinema_history') || '[]');
let currentBooking = {
    filmId: null,
    film: null,
    showtime: null,
    ticketType: 'regular',
    seats: [],
    payment: null
};
let currentStep = 1;

// Payment Info
const paymentInfo = {
    'Gopay': { type: 'E-Wallet', number: '082115129852', name: 'Fadilah Wildan Firdaus' },
    'Dana': { type: 'E-Wallet', number: '082115129852', name: 'Fadilah Wildan Firdaus' },
    'Shopeepay': { type: 'E-Wallet', number: '082115129852', name: 'Fadilah Wildan Firdaus' },
    'BRI': { type: 'Bank', number: '32950101593505', name: 'Fadilah Wildan Firdaus' },
    'Mandiri': { type: 'Bank', number: '1340023079691', name: 'Fadilah Wildan Firdaus' },
    'Seabank': { type: 'Bank', number: '901863607990', name: 'Fadilah Wildan Firdaus' },
    'BSI': { type: 'Bank', number: '7268594129', name: 'Fadilah Wildan Firdaus' },
    'QRIS': { type: 'QRIS', name: 'UMCCINEMA' },
    'Cash': { type: 'Cash', name: 'Bayar di Kasir' }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMovies();
    initSmoothScroll();
});

// Render Movies Grid
function renderMovies() {
    const grid = document.getElementById('moviesGrid');
    grid.innerHTML = '';

    Object.entries(dataFilm).forEach(([id, film]) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.onclick = () => openBookingModal(id);

        card.innerHTML = `
            <div class="movie-poster">
                <img src="${film.poster}" alt="${film.judul}" loading="lazy">
                <div class="movie-poster-overlay"></div>
                <div class="movie-rating">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    ${film.rating}
                </div>
            </div>
            <div class="movie-content">
                <h3 class="movie-title">${film.judul}</h3>
                <div class="movie-theater">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                        <path d="M3 21h18"/>
                        <path d="M9 7h6"/>
                        <path d="M9 11h6"/>
                    </svg>
                    ${film.teater}
                </div>
                <div class="movie-meta">
                    <span class="movie-price">Rp ${film.harga.toLocaleString('id-ID')}</span>
                    <div class="movie-showtimes">
                        ${film.jam.slice(0, 3).map(j => `<span class="showtime-badge">${j}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Open Booking Modal
function openBookingModal(filmId) {
    const film = dataFilm[filmId];
    currentBooking = {
        filmId,
        film,
        showtime: null,
        ticketType: 'regular',
        seats: [],
        payment: null
    };
    currentStep = 1;

    // Reset UI
    document.getElementById('customerName').value = '';
    document.getElementById('modalTitle').textContent = film.judul;
    document.getElementById('modalTheater').textContent = film.teater;
    document.getElementById('modalPrice').innerHTML = `Rp ${film.harga.toLocaleString('id-ID')} <span style="color: var(--text-muted); font-size: 14px;">/ tiket</span>`;
    document.getElementById('modalPoster').style.backgroundImage = `url(${film.poster})`;

    // Render showtimes
    const showtimeGrid = document.getElementById('showtimeGrid');
    showtimeGrid.innerHTML = film.jam.map(jam =>
        `<button class="showtime-btn" onclick="selectShowtime('${jam}')">${jam}</button>`
    ).join('');

    // Reset ticket type
    document.querySelectorAll('.ticket-type').forEach(el => el.classList.remove('active'));
    document.querySelector('[data-type="regular"]').classList.add('active');

    // Show modal
    updateProgressSteps();
    showStep(1);
    document.getElementById('bookingModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    document.getElementById('bookingModal').classList.remove('active');
    document.body.style.overflow = '';
    resetSeats();
}

// Select Showtime
function selectShowtime(time) {
    currentBooking.showtime = time;
    document.querySelectorAll('.showtime-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === time);
    });
}

// Select Ticket Type
function selectTicketType(type) {
    currentBooking.ticketType = type;
    document.querySelectorAll('.ticket-type').forEach(el => {
        el.classList.toggle('active', el.dataset.type === type);
    });
}

// Go to Step
function goToStep(step) {
    // Validation
    if (step === 2 && currentStep === 1) {
        const name = document.getElementById('customerName').value.trim();
        if (!name) {
            alert('Silakan masukkan nama Anda');
            return;
        }
        if (!currentBooking.showtime) {
            alert('Silakan pilih jam tayang');
            return;
        }
        currentBooking.customerName = name;
        renderSeats();
    }

    if (step === 3 && currentStep === 2) {
        if (currentBooking.seats.length === 0) {
            alert('Silakan pilih minimal 1 kursi');
            return;
        }
        updatePaymentSummary();
    }

    currentStep = step;
    showStep(step);
    updateProgressSteps();
}

// Show Step
function showStep(step) {
    document.querySelectorAll('.booking-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
}

// Update Progress Steps
function updateProgressSteps() {
    document.querySelectorAll('.progress-step').forEach(el => {
        const stepNum = parseInt(el.dataset.step);
        el.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
            el.classList.add('active');
        } else if (stepNum < currentStep) {
            el.classList.add('completed');
        }
    });
}

// Render Seats
function renderSeats() {
    const container = document.getElementById('seatsContainer');
    container.innerHTML = '';

    const isVIP = currentBooking.ticketType === 'vip';

    // Regular rows (A-G)
    for (let r = 0; r < 7; r++) {
        const row = kursiBioskop[r];
        const rowLabel = row[0].charAt(0);

        const rowDiv = document.createElement('div');
        rowDiv.className = 'seat-row';

        // Row label
        const labelSpan = document.createElement('span');
        labelSpan.className = 'row-label';
        labelSpan.textContent = rowLabel;
        rowDiv.appendChild(labelSpan);

        // Left seats (1-7)
        for (let i = 0; i < 7; i++) {
            const seat = row[i];
            const seatEl = createSeatElement(seat, false);
            if (isVIP) seatEl.classList.add('taken'); // VIP cant select regular
            rowDiv.appendChild(seatEl);
        }

        // Aisle (using createElement to preserve event listeners)
        const aisleDiv = document.createElement('div');
        aisleDiv.className = 'aisle';
        rowDiv.appendChild(aisleDiv);

        // Right seats (8-10)
        for (let i = 7; i < 10; i++) {
            const seat = row[i];
            const seatEl = createSeatElement(seat, false);
            if (isVIP) seatEl.classList.add('taken');
            rowDiv.appendChild(seatEl);
        }

        container.appendChild(rowDiv);
    }

    // VIP row
    const vipRow = kursiBioskop[7];
    const vipRowDiv = document.createElement('div');
    vipRowDiv.className = 'seat-row vip-row';

    const vipLabel = document.createElement('span');
    vipLabel.className = 'row-label';
    vipLabel.textContent = '👑';
    vipRowDiv.appendChild(vipLabel);

    vipRow.forEach(seat => {
        const seatEl = createSeatElement(seat, true);
        if (!isVIP) seatEl.classList.add('taken');
        vipRowDiv.appendChild(seatEl);
    });

    container.appendChild(vipRowDiv);

    updateSeatsSummary();
}

// Create Seat Element
function createSeatElement(seatCode, isVIPSeat) {
    const seatEl = document.createElement('div');
    seatEl.className = 'seat';
    if (isVIPSeat) seatEl.classList.add('vip');

    // Check if taken (XX)
    if (seatCode === 'XX') {
        seatEl.classList.add('taken');
        seatEl.textContent = 'X';
    } else {
        seatEl.textContent = seatCode.replace('VIP', 'V');
        seatEl.onclick = () => toggleSeat(seatCode, seatEl);
    }

    // Check if already selected
    if (currentBooking.seats.includes(seatCode)) {
        seatEl.classList.add('selected');
    }

    return seatEl;
}

// Toggle Seat
function toggleSeat(seatCode, element) {
    if (element.classList.contains('taken')) return;

    const index = currentBooking.seats.indexOf(seatCode);
    if (index > -1) {
        currentBooking.seats.splice(index, 1);
        element.classList.remove('selected');
    } else {
        currentBooking.seats.push(seatCode);
        element.classList.add('selected');
    }

    updateSeatsSummary();
}

// Update Seats Summary
function updateSeatsSummary() {
    const seatsText = currentBooking.seats.length > 0
        ? currentBooking.seats.join(', ')
        : 'None';
    document.getElementById('selectedSeatsText').textContent = seatsText;

    const total = calculateTotal();
    document.getElementById('summaryTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Calculate Total
function calculateTotal() {
    const basePrice = currentBooking.film.harga;
    const vipExtra = currentBooking.ticketType === 'vip' ? 25000 : 0;
    const perTicket = basePrice + vipExtra;
    return perTicket * currentBooking.seats.length;
}

// Update Payment Summary
function updatePaymentSummary() {
    document.getElementById('summaryMovie').textContent = currentBooking.film.judul;
    document.getElementById('summaryShowtime').textContent = currentBooking.showtime;
    document.getElementById('summarySeats').textContent = currentBooking.seats.join(', ');
    document.getElementById('summaryType').textContent = currentBooking.ticketType === 'vip' ? 'VIP' : 'Regular';

    const total = calculateTotal();
    document.getElementById('paymentTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;

    // Reset payment selection
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('active'));
    document.getElementById('paymentInfo').style.display = 'none';
    document.getElementById('confirmBtn').disabled = true;
}

// Select Payment
function selectPayment(method) {
    currentBooking.payment = method;

    document.querySelectorAll('.payment-option').forEach(el => {
        el.classList.toggle('active', el.dataset.method === method);
    });

    const info = paymentInfo[method];
    const paymentInfoEl = document.getElementById('paymentInfo');

    if (info.type === 'Cash') {
        paymentInfoEl.innerHTML = `
            <p>💵 <strong>Cash Payment</strong></p>
            <p class="account-name">Silakan bayar langsung di kasir UMCCINEMA</p>
        `;
    } else if (info.type === 'QRIS') {
        paymentInfoEl.innerHTML = `
            <p>📱 <strong>QRIS ${info.name}</strong></p>
            <div style="background: white; padding: 20px; border-radius: 12px; display: inline-block; margin: 16px 0;">
                <div style="width: 150px; height: 150px; background: linear-gradient(45deg, #333 25%, #666 50%, #333 75%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">QRIS CODE</div>
            </div>
            <p class="account-name">Scan QR code di atas untuk pembayaran</p>
        `;
    } else {
        paymentInfoEl.innerHTML = `
            <p>${info.type === 'E-Wallet' ? '💳' : '🏦'} <strong>${method}</strong></p>
            <p class="account-number">${info.number}</p>
            <p class="account-name">A/N: ${info.name}</p>
        `;
    }

    paymentInfoEl.style.display = 'block';
    document.getElementById('confirmBtn').disabled = false;
}

// Confirm Payment
function confirmPayment() {
    // Mark seats as taken
    currentBooking.seats.forEach(seat => {
        for (let r = 0; r < kursiBioskop.length; r++) {
            const idx = kursiBioskop[r].indexOf(seat);
            if (idx > -1) {
                kursiBioskop[r][idx] = 'XX';
                break;
            }
        }
    });

    // Save transaction
    const transaction = {
        id: Date.now(),
        nama: currentBooking.customerName,
        film: currentBooking.film.judul,
        teater: currentBooking.film.teater,
        jam: currentBooking.showtime,
        tipe: currentBooking.ticketType === 'vip' ? 'VIP' : 'Regular',
        kursi: currentBooking.seats.join(', '),
        subtotal: calculateTotal(),
        payment: currentBooking.payment,
        tanggal: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };

    riwayatTransaksi.push(transaction);
    localStorage.setItem('umccinema_history', JSON.stringify(riwayatTransaksi));

    // Close booking modal
    closeModal();

    // Show success modal
    showSuccessModal(transaction);
}

// Show Success Modal
function showSuccessModal(transaction) {
    const ticketPreview = document.getElementById('ticketPreview');
    ticketPreview.innerHTML = `
        <div class="ticket-header">
            <span class="ticket-movie">${transaction.film}</span>
            <span class="ticket-type-badge">${transaction.tipe}</span>
        </div>
        <div class="ticket-details">
            <div class="ticket-row">
                <span>Nama</span>
                <span>${transaction.nama}</span>
            </div>
            <div class="ticket-row">
                <span>Teater</span>
                <span>${transaction.teater}</span>
            </div>
            <div class="ticket-row">
                <span>Tanggal</span>
                <span>${transaction.tanggal}</span>
            </div>
            <div class="ticket-row">
                <span>Jam</span>
                <span>${transaction.jam}</span>
            </div>
            <div class="ticket-row">
                <span>Kursi</span>
                <span>${transaction.kursi}</span>
            </div>
            <div class="ticket-row" style="color: var(--gold-400); font-weight: 600;">
                <span>Total</span>
                <span>Rp ${transaction.subtotal.toLocaleString('id-ID')}</span>
            </div>
        </div>
    `;

    document.getElementById('successModal').classList.add('active');
}

// Close Success Modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
}

// Show History
function showHistory() {
    const historyList = document.getElementById('historyList');

    if (riwayatTransaksi.length === 0) {
        historyList.innerHTML = '<div class="history-empty"><p>🎬 Belum ada tiket yang dipesan</p></div>';
    } else {
        historyList.innerHTML = riwayatTransaksi.slice().reverse().map(trx => `
            <div class="history-item">
                <h4>${trx.film}</h4>
                <p>👤 ${trx.nama}</p>
                <p>📍 ${trx.teater} | 🕐 ${trx.jam}</p>
                <p>💺 Kursi: ${trx.kursi} (${trx.tipe})</p>
                <p>💳 ${trx.payment}</p>
                <p style="color: var(--gold-400); font-weight: 600; margin-top: 8px;">Rp ${trx.subtotal.toLocaleString('id-ID')}</p>
            </div>
        `).join('');
    }

    document.getElementById('historyModal').classList.add('active');
}

// Close History Modal
function closeHistoryModal() {
    document.getElementById('historyModal').classList.remove('active');
}

// Reset Seats
function resetSeats() {
    currentBooking.seats = [];
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
