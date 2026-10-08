// ============================================================
// USER CUSTOMIZATION CONFIG (Wajib berakhiran CONFIG)
// Properti ini otomatis dibaca & diubah oleh MemoU Controller Studio
// ============================================================
const BASIC_CONFIG = {
  recipientName: "Clarissa Aurelia",
  nickname: "Sayangku ❤️",
  eventDate: "14 Oktober 2026",
  senderName: "Rian Aditya",
  loveLetter: "Selamat bertambah usia, sayangku. Terima kasih sudah hadir dan melengkapi setiap hariku dengan senyum, kehangatan, dan tawa yang selalu menenangkan. Bersamamu, hal-hal sederhana selalu terasa begitu berarti. Semoga di usiamu yang baru ini, langkahmu selalu dimudahkan, hatimu selalu dilapangkan, dan impian-impian terbaikmu satu per satu terwujud. Aku akan selalu ada di sini, menemanimu di setiap langkah.",
  photoCaption1: "Setiap senyum kecilmu selalu jadi alasan terbaikku untuk bersyukur ✨",
  photoCaption2: "Menghabiskan waktu denganmu selalu terasa seperti pulang ke tempat ternyaman 🤍",
  music: "assets/audio/bgm.mp3",
  backgroundColor: "#0F172A",
  textColor: "#F8FAFC",
  elementColor: "#1E293B"
};

// Terapkan tema warna sedini mungkin agar tampilan konsisten tanpa flicker
(function applyThemeVariables(cfg) {
  if (typeof document === 'undefined' || !cfg) return;
  try {
    if (cfg.backgroundColor) {
      document.documentElement.style.setProperty('--bg-page', cfg.backgroundColor);
      document.documentElement.style.setProperty('--bg-color', cfg.backgroundColor);
      if (document.body) {
        document.body.style.setProperty('background-color', cfg.backgroundColor, 'important');
      }
    }
    if (cfg.elementColor) {
      document.documentElement.style.setProperty('--bg-surface', cfg.elementColor);
      document.documentElement.style.setProperty('--bg-subtle', cfg.elementColor);
    }
    if (cfg.textColor) {
      document.documentElement.style.setProperty('--text-main', cfg.textColor);
      document.documentElement.style.setProperty('--text-body', cfg.textColor);
    }
  } catch (e) {}
})(BASIC_CONFIG);

document.addEventListener('DOMContentLoaded', () => {
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.textContent = val;
  };

  // 1. Sinkronisasi tema warna (Latar belakang, Teks, & Elemen kartu)
  const applyTheme = () => {
    if (BASIC_CONFIG.backgroundColor) {
      document.documentElement.style.setProperty('--bg-page', BASIC_CONFIG.backgroundColor);
      document.documentElement.style.setProperty('--bg-color', BASIC_CONFIG.backgroundColor);
      document.body.style.setProperty('background-color', BASIC_CONFIG.backgroundColor, 'important');
    }

    if (BASIC_CONFIG.elementColor) {
      document.documentElement.style.setProperty('--bg-surface', BASIC_CONFIG.elementColor);
      document.documentElement.style.setProperty('--bg-subtle', BASIC_CONFIG.elementColor);

      var elemHex = String(BASIC_CONFIG.elementColor).replace('#', '').trim();
      if (elemHex.length === 3) elemHex = elemHex.split('').map(function(c) { return c + c; }).join('');
      if (elemHex.length === 6) {
        var eNum = parseInt(elemHex, 16);
        var eLum = 0.2126 * ((eNum >> 16) & 255) + 0.7152 * ((eNum >> 8) & 255) + 0.0722 * (eNum & 255);
        if (eLum < 130) {
          document.documentElement.style.setProperty('--rose-border', 'rgba(255, 255, 255, 0.15)');
          document.documentElement.style.setProperty('--gold-border', 'rgba(255, 255, 255, 0.2)');
        } else {
          document.documentElement.style.setProperty('--rose-border', 'rgba(179, 68, 90, 0.15)');
          document.documentElement.style.setProperty('--gold-border', 'rgba(196, 147, 90, 0.3)');
        }
      }
    }

    var bgHex = String(BASIC_CONFIG.backgroundColor || '#FAF6F2').replace('#', '').trim();
    if (bgHex.length === 3) bgHex = bgHex.split('').map(function(c) { return c + c; }).join('');
    var bgLum = 255;
    if (bgHex.length === 6) {
      var bNum = parseInt(bgHex, 16);
      bgLum = 0.2126 * ((bNum >> 16) & 255) + 0.7152 * ((bNum >> 8) & 255) + 0.0722 * (bNum & 255);
    }

    var chosenTextColor = BASIC_CONFIG.textColor || (bgLum < 130 ? '#FFFFFF' : '#331E23');
    document.documentElement.style.setProperty('--text-main', chosenTextColor);
    document.documentElement.style.setProperty('--text-body', chosenTextColor);

    if (bgLum < 130) {
      document.documentElement.style.setProperty('--text-muted', '#94A3B8');
      document.documentElement.style.setProperty('--rose-primary', '#FB7185');
      document.documentElement.classList.add('theme-dark-bg');
    } else {
      document.documentElement.style.setProperty('--text-muted', '#7E656A');
      document.documentElement.style.setProperty('--rose-primary', '#B3445A');
      document.documentElement.classList.remove('theme-dark-bg');
    }

    // Jaminan kontras teks dalam kartu
    var curElem = BASIC_CONFIG.elementColor || '#FFFFFF';
    var cHex = String(curElem).replace('#', '').trim();
    if (cHex.length === 3) cHex = cHex.split('').map(function(c) { return c + c; }).join('');
    if (cHex.length === 6) {
      var cNum = parseInt(cHex, 16);
      var cLum = 0.2126 * ((cNum >> 16) & 255) + 0.7152 * ((cNum >> 8) & 255) + 0.0722 * (cNum & 255);
      var cardTextEls = document.querySelectorAll('.memory-card .photo-caption, .letter-outer-card .letter-content, .header-tag-pill .event-tag');
      var cardInnerTextColor = (cLum < 130) ? (BASIC_CONFIG.textColor || '#FFFFFF') : (bgLum < 130 && chosenTextColor === '#FFFFFF' ? '#331E23' : chosenTextColor);
      for (var ti = 0; ti < cardTextEls.length; ti++) {
        cardTextEls[ti].style.color = cardInnerTextColor;
      }
    }
  };

  applyTheme();

  // 2. Sinkronisasi data konfigurasi ke elemen DOM
  setText('recipientName', BASIC_CONFIG.recipientName);
  setText('eventDate', BASIC_CONFIG.eventDate);
  setText('letterText', BASIC_CONFIG.loveLetter);
  setText('senderName', BASIC_CONFIG.senderName);
  setText('photoCaption1', BASIC_CONFIG.photoCaption1);
  setText('photoCaption2', BASIC_CONFIG.photoCaption2);

  // 3. Setup audio latar
  const bgmAudio = document.getElementById('bgmAudio') || document.getElementById('bgMusic');
  if (bgmAudio && BASIC_CONFIG.music && !bgmAudio.src.includes('http')) {
    bgmAudio.src = BASIC_CONFIG.music;
  }

  // 4. Entrance Gimmick & Autoplay Unlock
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

  // 5. HUD Kontrol Musik
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

  // 6. Scroll Reveal halus
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
