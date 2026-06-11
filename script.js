function hitungKalkulus() {
    const exprInput = document.getElementById('expression').value;
    const operation = document.getElementById('operation').value;
    const outputResult = document.getElementById('output-result');
    const historyList = document.getElementById('history-list');

    if (!exprInput) {
        alert('Mohon masukkan fungsi matematika terlebih dahulu!');
        return;
    }

    try {
        let hasilRaw = "";
        let hasilBersih = "";
        
        if (operation === "derivative") {
            // Menghitung turunan terhadap variabel x
            const turunan = math.derivative(exprInput, 'x');
            hasilRaw = turunan.toString();
            
            // 1. Hilangkan tanda bintang (*)
            hasilBersih = hasilRaw.replaceAll(' * ', '').replaceAll('*', '');
            
            // 2. KODE BARU: Kebal Spasi. Mengubah "x ^ 2" atau "x^2" menjadi x<sup>2</sup>
            hasilBersih = hasilBersih.replace(/\s*\^\s*(\d+)/g, '<sup>$1</sup>');
            
        } else if (operation === "integral") {
            const disederhanakan = math.simplify(math.parse(exprInput)).toString();
            
            // Bersihkan bintang dan ubah pangkat untuk integral
            let versiBersih = disederhanakan.replaceAll(' * ', '').replaceAll('*', '');
            versiBersih = versiBersih.replace(/\s*\^\s*(\d+)/g, '<sup>$1</sup>');
            
            hasilBersih = "∫ (" + exprInput + ") dx = " + versiBersih + " [Disederhanakan]";
            alert("Catatan: Untuk integral tak tentu kompleks, disarankan integrasi dengan library eksternal tambahan.");
        }

        // Tampilkan Hasil menggunakan innerHTML agar tag <sup> aktif
        outputResult.innerHTML = `<strong>${hasilBersih}</strong>`;

        // Tambah ke Riwayat
        const li = document.createElement('li');
        const opText = operation === "derivative" ? "Turunan" : "Integral";
        li.innerHTML = `[${opText}] ${exprInput} ➔ ${hasilBersih}`;
        historyList.prepend(li);

    } catch (error) {
        outputResult.innerHTML = `<span style="color: #ef4444;">Error: Format tidak valid atau tidak didukung.</span>`;
    }
}