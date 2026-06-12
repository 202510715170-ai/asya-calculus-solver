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
        let langkahLangkah = "";
        
        if (operation === "derivative") {
            const turunan = math.derivative(exprInput, 'x');
            hasilRaw = turunan.toString();

            // LOGIKA LANGKAH-LANGKAH (Aturan Pangkat Dasar)
            // Mencoba mendeteksi format ax^n
            const match = exprInput.match(/(\d*)x\^(\d+)/);
            if (match) {
                const koefisien = match[1] === "" ? 1 : parseInt(match[1]);
                const pangkat = parseInt(match[2]);
                const hasilKali = koefisien * pangkat;
                const pangkatBaru = pangkat - 1;

                langkahLangkah = `
                    <div style="text-align: left; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px; font-size: 16px; border-left: 4px solid #00d2ff;">
                        <p style="margin-bottom: 5px;"><strong>Langkah Penyelesaian (Aturan Pangkat):</strong></p>
                        1. Kalikan koefisien (${koefisien}) dengan pangkat (${pangkat}) → ${koefisien} × ${pangkat} = <b>${hasilKali}</b><br>
                        2. Kurangi pangkat dengan 1 → ${pangkat} - 1 = <b>${pangkatBaru}</b><br>
                        3. Gabungkan hasilnya menjadi: <b>${hasilKali}x<sup>${pangkatBaru}</sup></b>
                    </div>
                `;
            } else {
                langkahLangkah = `<p style="text-align: left; font-size: 14px; opacity: 0.8;"><i>Langkah-langkah otomatis tersedia untuk format dasar ax^n.</i></p>`;
            }
            
        } else if (operation === "integral") {
            const disederhanakan = math.simplify(math.parse(exprInput)).toString();
            hasilRaw = disederhanakan;
            langkahLangkah = `<p style="text-align: left; font-size: 14px; opacity: 0.8;"><i>Langkah integral: Gunakan aturan [1/(n+1)]x^(n+1).</i></p>`;
        }

        // BERSIHKAN HASIL AKHIR (Bintang & Pangkat)
        let hasilBersih = hasilRaw.replaceAll(' * ', '').replaceAll('*', '');
        hasilBersih = hasilBersih.replace(/\s*\^\s*(\d+)/g, '<sup>$1</sup>');

        // TAMPILKAN LANGKAH + HASIL AKHIR
        outputResult.innerHTML = `
            ${langkahLangkah}
            <div style="font-size: 24px; margin-top: 10px;">
                Hasil Akhir: <strong>${hasilBersih}</strong>
            </div>
        `;

        // Update Riwayat
        const li = document.createElement('li');
        li.innerHTML = `[Turunan] ${exprInput} ➔ ${hasilBersih}`;
        historyList.prepend(li);

    } catch (error) {
        outputResult.innerHTML = `<span style="color: #ef4444;">Error: Format tidak valid.</span>`;
    }
}
