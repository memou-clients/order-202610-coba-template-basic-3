// ============================================================
// USER CUSTOMIZATION CONFIG (Wajib berakhiran CONFIG)
// Properti ini otomatis dibaca & diubah oleh MemoU Controller Studio
// ============================================================
const BASIC_CONFIG = {
  "recipientName": "Clarissa Aurelia",
  "nickname": "Sayangku ❤️",
  "eventDate": "14 Oktober 2026",
  "senderName": "Rian Aditya",
  "loveLetter": "Selamat bertambah usia, sayangku. Terima kasih sudah hadir dan melengkapi setiap hariku dengan senyum, kehangatan, dan tawa yang selalu menenangkan. Bersamamu, hal-hal sederhana selalu terasa begitu berarti. Semoga di usiamu yang baru ini, langkahmu selalu dimudahkan, hatimu selalu dilapangkan, dan impian-impian terbaikmu satu per satu terwujud. Aku akan selalu ada di sini, menemanimu di setiap langkah.",
  "photoCaption1": "Setiap senyum kecilmu selalu jadi alasan terbaikku untuk bersyukur ✨",
  "photoCaption2": "Menghabiskan waktu denganmu selalu terasa seperti pulang ke tempat ternyaman 🤍",
  "music": "assets/audio/bgm.mp3",
  "backgroundColor": "#0f172a"
};

document.addEventListener('DOMContentLoaded', () => {
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.textContent = val;
  };

  // 1. Sinkronisasi data konfigurasi ke elemen DOM
  setText('recipientName', BASIC_CONFIG.recipientName);
  setText('eventDate', BASIC_CONFIG.eventDate);
  setText('letterText', BASIC_CONFIG.loveLetter);
  setText('senderName', BASIC_CONFIG.senderName);
  setText('photoCaption1', BASIC_CONFIG.photoCaption1);
  setText('photoCaption2', BASIC_CONFIG.photoCaption2);

  // 2. Setup audio latar
  const bgmAudio = document.getElementById('bgmAudio') || document.getElementById('bgMusic');
  if (bgmAudio && BASIC_CONFIG.music && !bgmAudio.src.includes('http')) {
    bgmAudio.src = BASIC_CONFIG.music;
  }

  // 3. Entrance Gimmick & Autoplay Unlock
  const entranceModal = document.getElementById('entranceModal');
  const enterBtn = document.getElementById('enterSiteBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');

  const enterCelebration = () => {
    if (entranceModal && !entranceModal.classList.contains('hidden')) {
      entranceModal.classList.add('hidden');
      document.body.classList.add('unlocked');
      if (bgmAudio) {
        bgmAudio.play().catch(e => console.log('Autoplay menunggu interaksi pengguna:', e));
      }
    }
  };

  if (enterBtn) {
    enterBtn.addEventListener('click', enterCelebration);
    enterBtn.addEventListener('touchstart', enterCelebration, { passive: true });
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && entranceModal && !entranceModal.classList.contains('hidden')) {
      enterCelebration();
    }
  });

  // 4. HUD Kontrol Musik
  if (soundToggleBtn && bgmAudio) {
    soundToggleBtn.addEventListener('click', () => {
      if (bgmAudio.paused) {
        bgmAudio.play().then(() => {
          soundToggleBtn.textContent = '🔊 AUDIO: ON';
          soundToggleBtn.setAttribute('aria-pressed', 'true');
        }).catch(err => {
          console.error('Pemutaran audio gagal:', err);
        });
      } else {
        bgmAudio.pause();
        soundToggleBtn.textContent = '🔇 AUDIO: OFF';
        soundToggleBtn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  // 5. Scroll Reveal halus
  const revealElements = document.querySelectorAll('.section-letter, .section-gallery');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});
