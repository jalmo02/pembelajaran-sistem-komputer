import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserItem, setUserItem, removeUserItem } from "./utils/userStorage";

import level1Img from "../assets/puzzle/level/level1.png";
import level2Img from "../assets/puzzle/level/level2.png";
import level3Img from "../assets/puzzle/level/level3.png";
import level4Img from "../assets/puzzle/level/level4.png";
import level5Img from "../assets/puzzle/level/level5.png";
import level6Img from "../assets/puzzle/level/level6.png";
import level7Img from "../assets/puzzle/level/level7.png";
import level8Img from "../assets/puzzle/level/level8.png";
import level9Img from "../assets/puzzle/level/level9.png";
import level10Img from "../assets/puzzle/level/level10.png";
import lockImg from "../assets/puzzle/level/lock.png";

const LEVEL_IMAGES = {
  1: level1Img,
  2: level2Img,
  3: level3Img,
  4: level4Img,
  5: level5Img,
  6: level6Img,
  7: level7Img,
  8: level8Img,
  9: level9Img,
  10: level10Img,
};

const TOTAL_LEVELS = 10;
const STORAGE_KEY = "game_unlocked_levels";
const STORAGE_SCORES = "game_scores";

// Key ini dipakai per-level (di masing-masing file Level*.js, mis. Level1.js
// pakai "game_level1_ever_done") untuk nandain "sudah pernah selesai sekali",
// yang menentukan apakah modal "LEVEL X TERBUKA!" ditampilkan.
// Harus ikut dihapus saat reset, kalau tidak badge itu ga akan muncul lagi
// walau progress sudah direset.
const STORAGE_LEVEL_DONE_PREFIX = "game_level";
const STORAGE_LEVEL_DONE_SUFFIX = "_ever_done";

// Titik-titik partikel mengambang di background — posisi & timing tetap (deterministik)
// biar tidak ada mismatch render, tapi terlihat acak secara visual.
const PARTICLES = [
  { left: "4%",  top: "82%", size: "3px", duration: "9s",  delay: "0s",   drift: "18px" },
  { left: "11%", top: "20%", size: "2px", duration: "12s", delay: "1.2s", drift: "-14px" },
  { left: "18%", top: "60%", size: "4px", duration: "10s", delay: "2.4s", drift: "22px" },
  { left: "27%", top: "35%", size: "2px", duration: "14s", delay: "0.6s", drift: "-10px" },
  { left: "35%", top: "88%", size: "3px", duration: "8s",  delay: "3s",   drift: "16px" },
  { left: "44%", top: "12%", size: "2px", duration: "11s", delay: "1.8s", drift: "-20px" },
  { left: "53%", top: "70%", size: "3px", duration: "13s", delay: "0.3s", drift: "14px" },
  { left: "61%", top: "28%", size: "2px", duration: "9.5s",delay: "2.1s", drift: "-16px" },
  { left: "69%", top: "55%", size: "4px", duration: "10.5s",delay: "3.6s",drift: "20px" },
  { left: "77%", top: "18%", size: "2px", duration: "12.5s",delay: "0.9s",drift: "-12px" },
  { left: "84%", top: "78%", size: "3px", duration: "8.5s", delay: "2.7s",drift: "18px" },
  { left: "91%", top: "40%", size: "2px", duration: "11.5s",delay: "1.5s",drift: "-18px" },
  { left: "8%",  top: "48%", size: "2px", duration: "10s",  delay: "4s",  drift: "12px" },
  { left: "58%", top: "92%", size: "3px", duration: "13.5s",delay: "0.2s",drift: "-14px" },
  { left: "95%", top: "8%",  size: "2px", duration: "9s",   delay: "3.3s",drift: "16px" },
  { left: "23%", top: "6%",  size: "3px", duration: "10.8s",delay: "1s",  drift: "-16px" },
  { left: "40%", top: "50%", size: "2px", duration: "12.2s",delay: "2.9s",drift: "20px" },
  { left: "49%", top: "78%", size: "4px", duration: "9.2s", delay: "0.7s",drift: "-18px" },
  { left: "65%", top: "8%",  size: "2px", duration: "11.8s",delay: "3.8s",drift: "14px" },
  { left: "73%", top: "92%", size: "3px", duration: "8.8s", delay: "1.6s",drift: "-20px" },
  { left: "88%", top: "58%", size: "2px", duration: "13s",  delay: "0.4s",drift: "16px" },
  { left: "2%",  top: "30%", size: "3px", duration: "10.2s",delay: "2.6s",drift: "-14px" },
];

export default function Game() {
  const navigate = useNavigate();

  const [unlockedLevels, setUnlockedLevels] = useState(() =>
    getUserItem(STORAGE_KEY, 1)
  );

  // FIX: scores sekarang punya setter, supaya bisa dikosongkan pas reset
  const [scores, setScores] = useState(() => getUserItem(STORAGE_SCORES, {}));

  const [showResetModal, setShowResetModal] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);

  // Modal panduan game — tampil otomatis begitu halaman dibuka,
  // dan bisa dibuka lagi lewat tombol ikon tanda tanya di header.
  const [showGuideModal, setShowGuideModal] = useState(true);
  const [guideClosing, setGuideClosing] = useState(false);

  useEffect(() => {
    setUserItem(STORAGE_KEY, unlockedLevels);
  }, [unlockedLevels]);

  // ✅ FIX: navigate ke halaman level yang sesuai
  const handleLevelClick = (level) => {
    if (level <= unlockedLevels) {
      navigate(`/game/level/${level}`);
    }
  };

  const handleReset = () => {
    setModalClosing(false);
    setShowResetModal(true);
  };

  // ✅ FIX: reset progress sekarang juga menghapus skor,
  // jadi badge "completed" (centang hijau) ikut hilang, bukan cuma level yang ke-lock lagi.
  const confirmReset = () => {
    setUnlockedLevels(1);
    setUserItem(STORAGE_KEY, 1);

    setScores({});
    removeUserItem(STORAGE_SCORES);

    // Hapus juga flag "pernah diselesaikan" tiap level (1..TOTAL_LEVELS)
    // supaya modal "LEVEL X TERBUKA!" bisa muncul lagi setelah reset.
    for (let lvl = 1; lvl <= TOTAL_LEVELS; lvl++) {
      removeUserItem(`${STORAGE_LEVEL_DONE_PREFIX}${lvl}${STORAGE_LEVEL_DONE_SUFFIX}`);
    }

    closeModal();
  };

  const closeModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setShowResetModal(false);
      setModalClosing(false);
    }, 300);
  };

  const openGuideModal = () => {
    setGuideClosing(false);
    setShowGuideModal(true);
  };

  const closeGuideModal = () => {
    setGuideClosing(true);
    setTimeout(() => {
      setShowGuideModal(false);
      setGuideClosing(false);
    }, 300);
  };

  const levels = Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1);

  return (
    <div className="game-page">
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="bg-sweep" />
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />
      <div className="bg-orb orb-4" />
      <div className="particle-field">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              "--drift": p.drift,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="game-header">
        <button
          className="back-btn px-4 py-2 rounded-xl text-white text-base font-bold flex items-center gap-2"
          onClick={() => navigate("/")}
          style={{ background:'#1E1B4B', border:'1px solid #7c3aed55' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>KEMBALI</span>
        </button>

        <div className="header-title">
          <span className="title-tag font-bold">&lt;GAME/&gt;</span>
          <h1 className="title-glitch">
            {"PILIH LEVEL".split("").map((char, i) => (
              char === " "
                ? <span key={i} className="title-space"> </span>
                : <span key={i} className="title-char" style={{"--i": i}}>{char}</span>
            ))}
          </h1>
          <div className="title-underline">
            <span className="underline-left" />
            <span className="underline-dot" />
            <span className="underline-right" />
          </div>
        </div>

        <div className="header-actions">
          <button className="guide-btn" onClick={openGuideModal} title="Panduan Game">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>

          <button className="reset-btn" onClick={handleReset} title="Reset Progress">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.34" />
            </svg>
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="progress-section">
        <div className="progress-label">
          <span>PROGRESS</span>
          <span className="progress-count">{unlockedLevels - 1}/{TOTAL_LEVELS} SELESAI</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((unlockedLevels - 1) / TOTAL_LEVELS) * 100}%` }}
          />
        </div>
      </div>

      {/* Level Grid */}
      <main className="levels-container">
        <div className="levels-grid">
          {levels.map((level) => {
            const isUnlocked = level <= unlockedLevels;
            const isCompleted = isUnlocked && !!scores[level];
            const status = isCompleted ? "completed" : isUnlocked ? "unlocked" : "locked";

            return (
              <div
                key={level}
                className={`level-card ${status}`}
                onClick={() => handleLevelClick(level)}
              >
                <span className="corner tl" />
                <span className="corner tr" />
                <span className="corner bl" />
                <span className="corner br" />

                {/* Gambar level SELALU tampil, baik unlocked maupun locked */}
                <img
                  src={LEVEL_IMAGES[level]}
                  alt={`Level ${level}`}
                  className="level-img"
                />
                <div className="level-glow-ring" />

                {/* Overlay tint + gembok kalau masih terkunci */}
                {!isUnlocked && (
                  <div className="lock-tint">
                    <img src={lockImg} alt="Terkunci" className="lock-img" />
                  </div>
                )}

                {/* Badge centang kalau level sudah diselesaikan */}
                {isCompleted && (
                  <div className="completed-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}

                <div className={`level-label ${status}`}>LEVEL {level}</div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Reset Modal */}
      {showResetModal && (
        <div className={`modal-overlay ${modalClosing ? "closing" : "opening"}`}>
          <div className={`modal-box ${modalClosing ? "closing" : "opening"}`}>
            <span className="modal-corner mtl" />
            <span className="modal-corner mtr" />
            <span className="modal-corner mbl" />
            <span className="modal-corner mbr" />

            <div className="modal-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.34" />
              </svg>
            </div>
            <h2 className="modal-title">RESET PROGRESS</h2>
            <p className="modal-desc">
              Apakah kamu yakin ingin mereset semua progress?<br />
              <span className="modal-warn">Semua level akan terkunci kembali kecuali Level 1.</span>
            </p>
            <div className="modal-actions">
              <button className="modal-btn confirm" onClick={confirmReset}>
                <span>YA, RESET</span>
              </button>
              <button className="modal-btn cancel" onClick={closeModal}>
                <span>TIDAK</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal — muncul otomatis saat halaman dibuka, dan bisa dibuka
          ulang lewat tombol ikon tanda tanya di header. Layout horizontal. */}
      {showGuideModal && (
        <div className={`guide-modal-overlay ${guideClosing ? "closing" : "opening"}`}>
          <div className={`guide-modal-box ${guideClosing ? "closing" : "opening"}`}>
            <button className="guide-close-btn" onClick={closeGuideModal} title="Tutup">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <span className="modal-corner mtl" />
            <span className="modal-corner mtr" />
            <span className="modal-corner mbl" />
            <span className="modal-corner mbr" />

            <div className="guide-header">
              <div className="guide-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h2 className="modal-title guide-modal-title">CARA BERMAIN</h2>
                <p className="guide-subtitle">Susun keping puzzle, jawab pertanyaannya, kumpulkan skor tertinggi.</p>
              </div>
            </div>

            <div className="guide-steps">
              <div className="guide-step">
                <span className="guide-step-num">01</span>
                <p>Susun kepingan puzzle ke dalam slot yang tersedia hingga semua keping terisi.</p>
              </div>
              <div className="guide-step">
                <span className="guide-step-num">02</span>
                <p>Jika susunan puzzle <b>benar</b>, sebuah pertanyaan beserta pilihan jawaban akan muncul.</p>
              </div>
              <div className="guide-step">
                <span className="guide-step-num">03</span>
                <p>Benar di soal pertama = nilai <b>100</b>. Kalau salah, soal berikutnya muncul dengan nilai berkurang (90, 80, dst).</p>
              </div>
              <div className="guide-step">
                <span className="guide-step-num">04</span>
                <p>Jika semua keping sudah masuk tapi susunannya <b>salah</b>, muncul animasi listrik error dan pertanyaan tidak ditampilkan.</p>
              </div>
            </div>

            <button className="guide-start-btn" onClick={closeGuideModal}>
              <span>MULAI BERMAIN</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .game-page {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(ellipse 120% 90% at 50% 0%, #1b0f3d 0%, #120a28 45%, #0c0620 100%);
          display: flex;
          flex-direction: column;
          position: relative;
          font-family: 'Orbitron', 'Courier New', monospace;
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(168, 85, 247, 0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.13) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 20s linear infinite, gridPulse 6s ease-in-out infinite;
          z-index: 0;
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .bg-glow {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 65% 45% at 18% 15%, rgba(139, 0, 255, 0.28) 0%, transparent 70%),
            radial-gradient(ellipse 55% 65% at 85% 85%, rgba(217, 70, 239, 0.2) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(56, 130, 246, 0.1) 0%, transparent 75%);
          z-index: 0;
          pointer-events: none;
          animation: glowBreathe 8s ease-in-out infinite;
        }
        @keyframes glowBreathe {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }

        /* Sapuan cahaya diagonal yang lewat perlahan, kayak refleksi kaca */
        .bg-sweep {
          position: fixed;
          inset: -20%;
          background: linear-gradient(
            115deg,
            transparent 0%,
            transparent 42%,
            rgba(217, 70, 239, 0.05) 48%,
            rgba(180, 0, 255, 0.09) 50%,
            rgba(217, 70, 239, 0.05) 52%,
            transparent 58%,
            transparent 100%
          );
          background-size: 250% 250%;
          animation: sweepMove 11s ease-in-out infinite;
          z-index: 0;
          pointer-events: none;
        }
        @keyframes sweepMove {
          0%   { background-position: 100% 0%; }
          50%  { background-position: 0% 100%; }
          100% { background-position: 100% 0%; }
        }

        /* Orb cahaya besar yang mengambang pelan — memberi kedalaman & rasa hidup */
        .bg-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(50px);
          z-index: 0;
          pointer-events: none;
          opacity: 0.75;
        }
        .orb-1 {
          width: 420px; height: 420px;
          top: -6%; left: -6%;
          background: radial-gradient(circle, rgba(139, 40, 255, 0.6), transparent 70%);
          animation: orbFloat1 16s ease-in-out infinite;
        }
        .orb-2 {
          width: 360px; height: 360px;
          bottom: -8%; right: -4%;
          background: radial-gradient(circle, rgba(232, 90, 249, 0.5), transparent 70%);
          animation: orbFloat2 19s ease-in-out infinite;
        }
        .orb-3 {
          width: 280px; height: 280px;
          top: 45%; left: 50%;
          background: radial-gradient(circle, rgba(80, 150, 255, 0.35), transparent 70%);
          animation: orbFloat3 22s ease-in-out infinite;
        }
        .orb-4 {
          width: 220px; height: 220px;
          top: 12%; right: 12%;
          background: radial-gradient(circle, rgba(217, 70, 239, 0.4), transparent 70%);
          animation: orbFloat4 17s ease-in-out infinite;
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(60px, 40px) scale(1.15); }
          66%      { transform: translate(20px, 80px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%      { transform: translate(-50px, -60px) scale(1.1); }
          70%      { transform: translate(-20px, -20px) scale(0.9); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50%      { transform: translate(-45%, -55%) scale(1.3); opacity: 0.65; }
        }
        @keyframes orbFloat4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-40px, 50px) scale(1.2); }
        }

        /* Partikel mengambang — kesan debu digital / bintang kecil */
        .particle-field {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: #f3e8ff;
          box-shadow: 0 0 8px 2px rgba(217, 70, 239, 0.9), 0 0 18px 4px rgba(139, 40, 255, 0.5);
          animation-name: particleFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes particleFloat {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          15%  { opacity: 0.9; }
          50%  { transform: translateY(-26px) translateX(var(--drift)); opacity: 0.6; }
          85%  { opacity: 0.9; }
          100% { transform: translateY(0) translateX(0); opacity: 0; }
        }

        .game-header {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 28px;
          border-bottom: 1px solid rgba(180, 0, 255, 0.4);
          background: linear-gradient(180deg, rgba(35, 15, 75, 0.75), rgba(18, 8, 40, 0.7));
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(139, 0, 255, 0.15);
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(180, 0, 255, 0.4);
          color: #c084fc;
          padding: 8px 16px;
          cursor: pointer;
          font-family:'Orbitron',sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .back-btn { transition:all 0.3s; position:relative; overflow:hidden; }
        .back-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,#a78bfa22,transparent); transform:translateX(-100%); transition:transform 0.4s; }
        .back-btn:hover::after { transform:translateX(100%); }
        .back-btn:hover { border-color:#a78bfa !important; box-shadow:0 0 16px #7c3aed66; transform:translateX(-3px); }

        .header-title {
          text-align: center;
          display: flex;
          flex-direction: column;
          margin-left: -100px;
        }
        .title-tag {
          display: block;
          font-family: 'Orbitron', sans-serif;
          font-size: 9px;
          color: rgba(217, 70, 239, 0.7);
          letter-spacing: 5px;
          margin-bottom: 4px;
          animation: tagPulse 3s ease-in-out infinite;
        }
        @keyframes tagPulse {
          0%, 100% { opacity: 0.5; letter-spacing: 5px; }
          50% { opacity: 1; letter-spacing: 7px; color: rgba(217, 70, 239, 1); }
        }

        .title-glitch {
          font-family: 'Orbitron', sans-serif;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 4px;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 2px;
          position: relative;
          cursor: default;
        }
        .title-glitch::before,
        .title-glitch::after {
          content: 'PILIH LEVEL';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          gap: 2px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 22px;
          letter-spacing: 4px;
          pointer-events: none;
        }
        .title-glitch::before {
          color: #f0abfc;
          animation: glitchTop 5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
        }
        .title-glitch::after {
          color: #7c3aed;
          animation: glitchBot 5s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        }
        @keyframes glitchTop {
          0%, 90%, 100% { transform: translate(0); opacity: 0; }
          91% { transform: translate(-3px, -2px); opacity: 0.8; }
          93% { transform: translate(3px, 1px); opacity: 0.6; }
          95% { transform: translate(-2px, 0); opacity: 0.9; }
          97% { transform: translate(0); opacity: 0; }
        }
        @keyframes glitchBot {
          0%, 88%, 100% { transform: translate(0); opacity: 0; }
          89% { transform: translate(3px, 2px); opacity: 0.7; }
          91% { transform: translate(-3px, -1px); opacity: 0.5; }
          94% { transform: translate(2px, 0); opacity: 0.8; }
          96% { transform: translate(0); opacity: 0; }
        }

        .title-space { display: inline-block; width: 12px; }

        .title-char {
          display: inline-block;
          color: #fff;
          text-shadow:
            0 0 10px rgba(180, 0, 255, 0.9),
            0 0 25px rgba(180, 0, 255, 0.5),
            0 0 50px rgba(180, 0, 255, 0.2);
          animation: charFloat 3s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.1s);
          transition: color 0.2s, transform 0.2s, text-shadow 0.2s;
        }
        @keyframes charFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .title-glitch:hover .title-char {
          animation: charZap 0.4s ease forwards;
          animation-delay: calc(var(--i) * 0.06s);
          color: #f0abfc;
          text-shadow:
            0 0 6px #fff,
            0 0 15px #e879f9,
            0 0 30px #a855f7,
            0 0 60px #7c3aed;
        }
        @keyframes charZap {
          0% { transform: translateY(0) scaleY(1); filter: brightness(1); }
          20% { transform: translateY(-6px) scaleY(1.2); filter: brightness(2); }
          40% { transform: translateY(3px) scaleY(0.9); filter: brightness(1.5); }
          60% { transform: translateY(-3px) scaleY(1.1); filter: brightness(2.5); }
          80% { transform: translateY(1px) scaleY(1); filter: brightness(1.8); }
          100% { transform: translateY(-3px) scaleY(1); filter: brightness(1); }
        }

        .title-underline {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 5px;
          width: 220px;
        }
        .underline-left, .underline-right {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180, 0, 255, 0.7));
          animation: lineExpand 2s ease-out forwards;
        }
        .underline-right {
          background: linear-gradient(90deg, rgba(180, 0, 255, 0.7), transparent);
        }
        .underline-dot {
          width: 5px;
          height: 5px;
          background: #d946ef;
          border-radius: 50%;
          box-shadow: 0 0 8px #d946ef, 0 0 16px #a855f7;
          animation: dotPulse 1.5s ease-in-out infinite;
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 8px #d946ef; }
          50% { transform: scale(1.5); box-shadow: 0 0 16px #e879f9, 0 0 30px #a855f7; }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .reset-btn, .guide-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: transparent;
          border: 1px solid rgba(180, 0, 255, 0.4);
          color: #c084fc;
          cursor: pointer;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .reset-btn:hover, .guide-btn:hover {
          background: rgba(180, 0, 255, 0.15);
          color: #e879f9;
          border-color: #a855f7;
        }
        .reset-btn:hover svg { animation: spin 0.5s linear; }
        .guide-btn:hover svg { animation: pulseIcon 0.5s ease; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .progress-section {
          position: relative;
          z-index: 10;
          padding: 10px 28px;
          border-bottom: 1px solid rgba(180, 0, 255, 0.15);
        }
        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          color: rgba(180, 0, 255, 0.6);
          margin-bottom: 5px;
        }
        .progress-count { color: #c084fc; }
        .progress-track {
          height: 3px;
          background: rgba(180, 0, 255, 0.15);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed, #d946ef, #a855f7);
          border-radius: 2px;
          transition: width 0.5s ease;
          box-shadow: 0 0 8px rgba(180, 0, 255, 0.8);
        }

        .levels-container {
          flex: 1;
          overflow: hidden;
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
        }

        .levels-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 14px;
          width: 100%;
          max-width: 900px;
          height: 100%;
          max-height: 380px;
        }

        .level-card {
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(45, 20, 90, 0.4);
          border: 1px solid rgba(180, 0, 255, 0.25);
          transition: all 0.25s ease;
          overflow: hidden;
          aspect-ratio: 1;
        }

        /* ── UNLOCKED (belum selesai) — ungu ── */
        .level-card.unlocked {
          border-color: rgba(180, 0, 255, 0.3);
        }
        .level-card.unlocked:hover {
          border-color: rgba(217, 70, 239, 0.8);
          background: rgba(120, 0, 200, 0.15);
          transform: translateY(-3px) scale(1.02);
          box-shadow:
            0 0 20px rgba(180, 0, 255, 0.4),
            0 0 40px rgba(180, 0, 255, 0.15),
            inset 0 0 20px rgba(180, 0, 255, 0.05);
        }

        /* ── COMPLETED — hijau emerald ── */
        .level-card.completed {
          border-color: rgba(52, 211, 153, 0.45);
          box-shadow: 0 0 14px rgba(52, 211, 153, 0.15);
        }
        .level-card.completed:hover {
          border-color: rgba(52, 211, 153, 0.9);
          background: rgba(16, 120, 80, 0.15);
          transform: translateY(-3px) scale(1.02);
          box-shadow:
            0 0 22px rgba(52, 211, 153, 0.45),
            0 0 44px rgba(52, 211, 153, 0.15),
            inset 0 0 20px rgba(52, 211, 153, 0.05);
        }

        /* ── LOCKED — biru cyan, gambar tetap kelihatan ── */
        .level-card.locked {
          cursor: not-allowed;
          border-color: rgba(56, 130, 246, 0.3);
        }
        .level-card.locked .level-img {
          filter: saturate(1.15) brightness(0.6) drop-shadow(0 0 8px rgba(56, 130, 246, 0.4));
        }

        .corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-style: solid;
          z-index: 2;
          transition: border-color 0.25s;
        }
        .level-card.unlocked .corner { border-color: rgba(180, 0, 255, 0.6); }
        .level-card.unlocked:hover .corner { border-color: rgba(217, 70, 239, 0.9); }
        .level-card.completed .corner { border-color: rgba(52, 211, 153, 0.6); }
        .level-card.completed:hover .corner { border-color: rgba(110, 231, 183, 0.95); }
        .level-card.locked .corner { border-color: rgba(56, 130, 246, 0.45); }
        .corner.tl { top: 4px; left: 4px; border-width: 2px 0 0 2px; }
        .corner.tr { top: 4px; right: 4px; border-width: 2px 2px 0 0; }
        .corner.bl { bottom: 4px; left: 4px; border-width: 0 0 2px 2px; }
        .corner.br { bottom: 4px; right: 4px; border-width: 0 2px 2px 0; }

        .level-img {
          width: 75%;
          height: 75%;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 10px rgba(180, 0, 255, 0.5));
          transition: filter 0.25s, transform 0.25s;
        }
        .level-card.unlocked:hover .level-img {
          filter: drop-shadow(0 0 16px rgba(217, 70, 239, 0.9));
          transform: scale(1.05);
        }
        .level-card.completed .level-img {
          filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.55));
        }
        .level-card.completed:hover .level-img {
          filter: drop-shadow(0 0 18px rgba(110, 231, 183, 0.9));
          transform: scale(1.05);
        }

        .level-glow-ring {
          position: absolute;
          inset: 10%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(180, 0, 255, 0.08) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        /* Overlay tint + gembok di atas gambar level yang masih locked */
        .lock-tint {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgba(15,23,55,0.35), rgba(8,15,40,0.65));
          backdrop-filter: blur(0.5px);
        }
        .lock-img {
          width: 34%;
          height: 34%;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.7)) brightness(1.1);
        }

        /* Badge centang untuk level yang sudah diselesaikan */
        .completed-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(6, 60, 40, 0.85);
          border: 1px solid rgba(52, 211, 153, 0.8);
          color: #34D399;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          box-shadow: 0 0 10px rgba(52, 211, 153, 0.6);
        }

        .level-label {
          position: absolute;
          bottom: 6px;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 2px;
          z-index: 4;
        }
        .level-label.unlocked { color: rgba(200, 150, 255, 0.7); }
        .level-label.completed { color: rgba(110, 231, 183, 0.85); }
        .level-label.locked { color: rgba(147, 197, 253, 0.75); }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 0, 15, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .modal-overlay.opening { animation: fadeIn 0.3s ease; }
        .modal-overlay.closing { animation: fadeOut 0.3s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }

        .modal-box {
          position: relative;
          background: linear-gradient(135deg, rgba(20, 5, 45, 0.98), rgba(10, 2, 30, 0.98));
          border: 1px solid rgba(180, 0, 255, 0.5);
          padding: 40px 44px;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow:
            0 0 40px rgba(180, 0, 255, 0.3),
            0 0 80px rgba(120, 0, 200, 0.15),
            inset 0 0 30px rgba(180, 0, 255, 0.05);
        }
        .modal-box.opening { animation: slideUp 0.3s ease; }
        .modal-box.closing { animation: slideDown 0.3s ease forwards; }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(0); opacity: 1; } to { transform: translateY(30px); opacity: 0; } }

        .modal-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(217, 70, 239, 0.8);
          border-style: solid;
        }
        .modal-corner.mtl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
        .modal-corner.mtr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
        .modal-corner.mbl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
        .modal-corner.mbr { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }

        .modal-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          border: 1px solid rgba(180, 0, 255, 0.4);
          background: rgba(120, 0, 200, 0.1);
          color: #d946ef;
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
        }

        .modal-title {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 4px;
          color: #fff;
          text-shadow: 0 0 20px rgba(217, 70, 239, 0.7);
          margin-bottom: 14px;
        }

        .modal-desc {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(200, 160, 255, 0.8);
          margin-bottom: 28px;
        }
        .modal-warn {
          color: rgba(217, 70, 239, 0.9);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .modal-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
        }

        .modal-btn {
          position: relative;
          padding: 12px 28px;
          font-family: 'Orbitron', 'Courier New', monospace;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
          border: none;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .modal-btn.confirm {
          background: linear-gradient(135deg, #7c3aed, #a855f7, #d946ef);
          color: #fff;
          box-shadow: 0 0 20px rgba(180, 0, 255, 0.5);
        }
        .modal-btn.confirm:hover {
          box-shadow: 0 0 30px rgba(217, 70, 239, 0.8);
          transform: translateY(-2px);
        }
        .modal-btn.cancel {
          background: transparent;
          color: #c084fc;
          border: 1px solid rgba(180, 0, 255, 0.4);
        }
        .modal-btn.cancel:hover {
          background: rgba(180, 0, 255, 0.1);
          border-color: rgba(180, 0, 255, 0.7);
          color: #e879f9;
        }

        /* ───────────────────── Guide Modal (horizontal) ───────────────────── */
        .guide-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 0, 15, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }
        .guide-modal-overlay.opening { animation: fadeIn 0.3s ease; }
        .guide-modal-overlay.closing { animation: fadeOut 0.3s ease forwards; }

        .guide-modal-box {
          position: relative;
          background: linear-gradient(135deg, rgba(20, 5, 45, 0.98), rgba(10, 2, 30, 0.98));
          border: 1px solid rgba(180, 0, 255, 0.5);
          padding: 34px 38px 30px;
          max-width: 820px;
          width: 100%;
          box-shadow:
            0 0 40px rgba(180, 0, 255, 0.3),
            0 0 80px rgba(120, 0, 200, 0.15),
            inset 0 0 30px rgba(180, 0, 255, 0.05);
        }
        .guide-modal-box.opening { animation: slideUp 0.3s ease; }
        .guide-modal-box.closing { animation: slideDown 0.3s ease forwards; }

        /* Tombol close bulat putih, sesuai permintaan */
        .guide-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #ffffff;
          border: none;
          color: #1E1B4B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 6;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
          transition: all 0.2s;
        }
        .guide-close-btn:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 0 18px rgba(255, 255, 255, 0.85);
        }

        .guide-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding-right: 30px;
        }
        .guide-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          border: 1px solid rgba(180, 0, 255, 0.4);
          background: rgba(120, 0, 200, 0.1);
          color: #d946ef;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        .guide-modal-title {
          text-align: left;
          margin-bottom: 6px;
        }
        .guide-subtitle {
          font-family: 'Courier New', monospace;
          font-size: 11.5px;
          color: rgba(200, 160, 255, 0.7);
          letter-spacing: 0.5px;
        }

        /* Layout horizontal — kartu langkah tersusun berjajar */
        .guide-steps {
          display: flex;
          flex-direction: row;
          gap: 14px;
        }
        .guide-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px 14px;
          background: rgba(45, 20, 90, 0.35);
          border: 1px solid rgba(180, 0, 255, 0.25);
          position: relative;
          transition: border-color 0.25s, background 0.25s;
        }
        .guide-step:hover {
          border-color: rgba(217, 70, 239, 0.6);
          background: rgba(120, 0, 200, 0.15);
        }
        .guide-step-num {
          font-family: 'Orbitron', sans-serif;
          font-size: 20px;
          font-weight: 900;
          color: rgba(217, 70, 239, 0.5);
          text-shadow: 0 0 10px rgba(180, 0, 255, 0.5);
        }
        .guide-step p {
          font-family: 'Courier New', monospace;
          font-size: 11.5px;
          line-height: 1.6;
          color: rgba(200, 160, 255, 0.85);
        }
        .guide-step p b { color: #f0abfc; }

        .guide-start-btn {
          display: block;
          margin: 26px auto 0;
          padding: 12px 36px;
          font-family: 'Orbitron', 'Courier New', monospace;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
          border: none;
          background: linear-gradient(135deg, #7c3aed, #a855f7, #d946ef);
          color: #fff;
          box-shadow: 0 0 20px rgba(180, 0, 255, 0.5);
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .guide-start-btn:hover {
          box-shadow: 0 0 30px rgba(217, 70, 239, 0.8);
          transform: translateY(-2px);
        }

        @media (max-width: 720px) {
          .guide-steps { flex-direction: column; }
          .guide-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}