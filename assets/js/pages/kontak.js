document.getElementById('kontak-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const nama       = document.getElementById('nama').value.trim();
  const wa         = document.getElementById('wa').value.trim();
  const organisasi = document.getElementById('organisasi').value.trim();
  const keperluan  = document.getElementById('keperluan').value;
  const pesan      = document.getElementById('pesan').value.trim();

  if (!nama || !wa || !keperluan || !pesan) {
    ['nama', 'wa', 'keperluan', 'pesan'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.style.borderColor = '#e05a3a';
        el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
      }
    });
    return;
  }

  const lines = [
    `Halo Pratani Creative! 👋`, ``,
    `*Nama:* ${nama}`,
    wa         ? `*No. WA:* ${wa}`         : null,
    organisasi ? `*Organisasi:* ${organisasi}` : null,
    `*Keperluan:* ${keperluan}`, ``,
    `*Pesan:*`, pesan, ``,
    `_(Dikirim via form website pratani.id)_`
  ].filter(l => l !== null).join('\n');

  const encoded = encodeURIComponent(lines);
  window.open(`https://wa.me/6285172107815?text=${encoded}`, '_blank', 'noopener');
});
