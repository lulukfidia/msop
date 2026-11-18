document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle Menu Navigasi Mobile (Berlaku di Semua Halaman)
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 2. Pencarian & Filter Kategori SOP (Halaman services.html)
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sopCards = document.querySelectorAll('.sop-item');
  let activeCategory = 'all';

  function filterSOP() {
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';

    sopCards.forEach((card) => {
      const text = card.innerText.toLowerCase();
      const category = card.getAttribute('data-category');
      const matchKeyword = text.includes(keyword);
      const matchCategory = activeCategory === 'all' || category === activeCategory;

      card.style.display = matchKeyword && matchCategory ? 'block' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterSOP);
  }

  if (filterButtons.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        filterButtons.forEach((b) => b.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.getAttribute('data-filter');
        filterSOP();
      });
    });
  }

  // 3. Simulasi Pengiriman Formulir Pengajuan SOP (Halaman create.html)
  const requestForm = document.getElementById('requestForm');
  if (requestForm) {
    requestForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nama = document.getElementById('nama')?.value || 'Pengguna';
      const judulInput = document.getElementById('judulSop');
      const msg = document.getElementById('formMessage');

      if (msg) {
        const infoJudul = judulInput ? ` untuk "${judulInput.value}"` : '';
        msg.innerText = `Terima kasih, ${nama}. Pengajuan SOP${infoJudul} berhasil dikirim ke tim validasi.`;
      }
      requestForm.reset();
    });
  }

  // 4. Accordion Pertanyaan Umum / FAQ (Halaman faq.html)
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const symbol = btn.querySelector('span');
        item.classList.toggle('open');

        if (symbol) {
          symbol.innerText = item.classList.contains('open') ? '−' : '+';
        }
      });
    });
  }

  // 5. Simulasi Login & Pengalihan ke Dashboard (Opsional jika login.html dipakai)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email')?.value || '';
      const loginMsg = document.getElementById('loginMessage');

      if (loginMsg) {
        loginMsg.innerText = `Berhasil masuk sebagai ${email}. Mengalihkan ke Dashboard...`;
      }

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }
});

// 6. Fungsi Global Modal Detail SOP (Opsional jika menggunakan pop-up modal)
function openModal(title, content) {
  const modal = document.getElementById('sopModal');
  if (!modal) return;
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalBody').innerText = content;
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('sopModal');
  if (modal) modal.style.display = 'none';
}

window.addEventListener('click', (event) => {
  const modal = document.getElementById('sopModal');
  if (modal && event.target === modal) {
    closeModal();
  }
});
