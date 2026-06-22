// =====================
// DATA KASIR
// =====================

let total = 0;

let totalPemasukan =
parseInt(localStorage.getItem("totalPemasukan")) || 0;

// =====================
// SAAT HALAMAN DIBUKA
// =====================

window.onload = function () {

    document.getElementById("totalPemasukan").innerText =
        totalPemasukan.toLocaleString("id-ID");

    cekMetode();

    const metode =
        document.getElementById("metodePembayaran");

    if (metode) {
        metode.addEventListener("change", cekMetode);
    }
};

// =====================
// CEK METODE PEMBAYARAN
// =====================

function cekMetode() {

    const metode =
        document.getElementById("metodePembayaran").value;

    const qrisBox =
        document.getElementById("qrisBox");

    const bayarInput =
        document.getElementById("bayar");

    if (metode === "QRIS") {

        if (qrisBox)
            qrisBox.style.display = "block";

        if (bayarInput)
            bayarInput.style.display = "none";

    } else {

        if (qrisBox)
            qrisBox.style.display = "none";

        if (bayarInput)
            bayarInput.style.display = "block";
    }
}

// =====================
// TAMBAH PESANAN
// =====================

function tambahItem(nama, harga) {

    const tbody =
        document.getElementById("daftarPesanan");

    tbody.innerHTML += `
        <tr>
            <td>${nama}</td>
            <td>Rp ${harga.toLocaleString("id-ID")}</td>
        </tr>
    `;

    total += harga;

    document.getElementById("total").innerText =
        total.toLocaleString("id-ID");
}

// =====================
// ABSENSI KARYAWAN
// =====================

function absen() {

    let nama =
        document.getElementById("nama").value;

    let shift =
        document.getElementById("shift").value;

    if (nama === "" || shift === "Pilih Shift") {

        alert("Lengkapi data absensi");
        return;
    }

    let waktu = new Date();

    let jam =
        waktu.toLocaleTimeString("id-ID");

    document.getElementById("dataAbsen").innerHTML += `
        <tr>
            <td>${nama}</td>
            <td>${shift}</td>
            <td>${jam}</td>
        </tr>
    `;

    document.getElementById("nama").value = "";
}

// =====================
// BAYAR
// =====================

function prosesPembayaran() {

    if (total <= 0) {

        alert("Belum ada pesanan");
        return;
    }

    const metode =
        document.getElementById("metodePembayaran").value;

    // QRIS
    function cekMetode() {
    const metode = document.getElementById("metodePembayaran").value;
    const qrisBox = document.getElementById("qrisBox");

    if (metode === "QRIS") {
        qrisBox.style.display = "block";
    } else {
        qrisBox.style.display = "none";
    }
}

    // TUNAI
    const bayar =
        parseInt(
            document.getElementById("bayar").value
        );

    if (isNaN(bayar)) {

        alert("Masukkan uang pembayaran");
        return;
    }

    if (bayar < total) {

        alert("Uang kurang");
        return;
    }

    const kembali =
        bayar - total;

    document.getElementById("kembalian").innerText =
        kembali.toLocaleString("id-ID");

    totalPemasukan += total;

    localStorage.setItem(
        "totalPemasukan",
        totalPemasukan
    );

    document.getElementById("totalPemasukan").innerText =
        totalPemasukan.toLocaleString("id-ID");

    alert(
        "Pembayaran Berhasil\nKembalian Rp " +
        kembali.toLocaleString("id-ID")
    );

    resetKasir();
}

// =====================
// RESET KASIR
// =====================

function resetKasir() {

    document.getElementById("daftarPesanan").innerHTML = "";

    total = 0;

    document.getElementById("total").innerText = "0";

    if (document.getElementById("bayar")) {
        document.getElementById("bayar").value = "";
    }

    document.getElementById("kembalian").innerText = "0";
}

// =====================
// RESET PEMASUKAN
// =====================

function resetPemasukan() {

    if (confirm("Reset total pemasukan hari ini?")) {

        totalPemasukan = 0;

        localStorage.setItem(
            "totalPemasukan",
            0
        );

        document.getElementById("totalPemasukan").innerText =
            "0";
    }
}