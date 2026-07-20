import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as LottieModule from 'lottie-react'
import { sounds, startHomeMusic, stopHomeMusic } from '../data/sounds'
import { getUserItem } from './utils/userStorage'
import DesktopOnlyGuard from '../components/DesktopOnlyGuard'
import DownloadAppButton from '../components/DownloadAppButton'
import BgHome from '../assets/images/background/bg-home.png'
import MateriBtn from '../assets/images/button/materi-btn.png'
import GameBtn from '../assets/images/button/game-btn.png'
import EvaluasiBtn from '../assets/images/button/evaluasi-btn.png'
import DevPhoto from '../assets/puzzle/brainware/huda.jpeg'
import RobotAnim from '../assets/animations/Robot.json'
import AbstractAnim from '../assets/animations/Abstract.json'

// Fix: lottie-react v2.4.1 kadang di-double-wrap oleh Vite (default.default),
// sehingga React menerima object bukan komponen. Interop ini aman untuk semua kasus.
const Lottie =
  LottieModule.default?.default || LottieModule.default || LottieModule.Lottie || LottieModule

const TOTAL_LEVELS = 10
const STORAGE_SCORES = 'game_scores'
const STORAGE_EVAL_HISTORY = 'eval_history'
const STORAGE_UNLOCKED = 'game_unlocked_levels'

// ── Data CP/ATP ─────────────────────────────────────────────────
// TODO: ganti isi ini sesuai dokumen kurikulum yang lu pakai
const CP_TEXT = `Peserta didik mampu memahami konsep dasar Sistem Komputer meliputi
Hardware, Software, dan Brainware, serta mampu menjelaskan hubungan dan fungsi
ketiga komponen tersebut dalam mendukung kinerja sebuah sistem komputer.`

const ATP_ITEMS = [
  'Mengidentifikasi komponen Hardware pada sistem komputer',
  'Menjelaskan fungsi dan jenis-jenis Software',
  'Memahami peran Brainware dalam pengoperasian komputer',
  'Menganalisis hubungan kerja antara Hardware, Software, dan Brainware',
  'Menerapkan pengetahuan sistem komputer dalam studi kasus sederhana',
]

// Titik-titik posisi robot (offset transform dari sudut kiri-bawah layar).
// Pakai transform translate (bukan left/bottom) supaya perpindahan digerakkan
// GPU (lebih ringan / smooth) dan tidak memicu reflow layout browser.
const ROBOT_SPOTS = [
  { x: '2vw',  y: '-6vh'  },
  { x: '14vw', y: '-16vh' },
  { x: '28vw', y: '-4vh'  },
  { x: '42vw', y: '-18vh' },
  { x: '75vw', y: '-8vh'  },
  { x: '35vw', y: '-22vh' },
]

const scoreColor = (s) =>
  s >= 80 ? '#34D399' : s >= 60 ? '#FBBF24' : '#F87171'

// ── Panel Riwayat Evaluasi ────────────────────────────────────────
function EvalPanel() {
  const history = getUserItem(STORAGE_EVAL_HISTORY, [])

  if (!history.length) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px', gap: 10,
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke="rgba(167,139,250,.35)" strokeWidth="1.2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14,
          color: 'rgba(210,195,255,.55)', textAlign: 'center', letterSpacing: 1 }}>
          Belum ada riwayat evaluasi
        </p>
        <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14,
          color: 'rgba(167,139,250,.35)', textAlign: 'center' }}>
          Kerjakan evaluasi pertamamu!
        </p>
      </div>
    )
  }

  const scores = history.map(h => h.score)
  const best = Math.max(...scores)
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

  return (
    <>
      <div style={{
        flex: 1, overflowY: 'auto', padding: '8px 10px',
        display: 'flex', flexDirection: 'column', gap: 6,
        scrollbarWidth: 'none',
      }}>
        {history.map((h, i) => {
          const c = scoreColor(h.score)
          return (
            <div key={i} className="lightning-border" style={{
              padding: '8px 10px',
              background: 'rgba(124,58,237,.14)',
              border: '2px solid rgba(255,255,255,.55)',
              borderRadius: 8,
              transition: 'border-color .2s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 12, color: 'rgba(210,195,255,.55)', fontWeight: 700, fontFamily: 'Orbitron,monospace' }}>
                  #{i + 1}
                </span>
                <span style={{ fontSize: 18, fontWeight: 900, color: c,
                  textShadow: `0 0 10px ${c}66`, fontFamily: 'Orbitron,monospace' }}>
                  {h.score}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14, color: 'rgba(210,195,255,.5)' }}>
                  PG {h.pgBenar}/10 · Esai {h.esaiBenar}/5
                </span>
                <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 14, color: 'rgba(210,195,255,.4)' }}>
                  {h.date}
                </span>
              </div>
              <div style={{ height: 2, background: 'rgba(124,58,237,.2)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${h.score}%`, background: c,
                  borderRadius: 2, opacity: .8 }} />
              </div>
            </div>
          )
        })}
      </div>
      {/* Stats bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        padding: '10px 8px',
        borderTop: '1px solid rgba(167,139,250,.2)',
        background: 'rgba(10,5,30,.45)',
        flexShrink: 0,
      }}>
        {[
          { val: best, lbl: 'TERBAIK', c: '#34D399' },
          { val: avg, lbl: 'RATA-RATA', c: '#FBBF24' },
          { val: history.length, lbl: 'TOTAL', c: '#a78bfa' },
        ].map((s, i, arr) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: s.c, fontFamily: 'Orbitron,monospace' }}>{s.val}</span>
            <span style={{ fontSize: 12, color: 'rgba(210,195,255,.5)', fontFamily: 'Rajdhani,sans-serif', letterSpacing: 2 }}>{s.lbl}</span>
            {i < arr.length - 1 && (
              <div style={{ position: 'absolute', width: 1, height: 28, background: 'rgba(167,139,250,.2)' }} />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

// ── Panel Skor Game Per Level ─────────────────────────────────────
function GamePanel() {
  const scores = getUserItem(STORAGE_SCORES, {})
  const unlocked = getUserItem(STORAGE_UNLOCKED, 1)

  const done = Object.values(scores).filter(Boolean)
  const total = done.reduce((a, b) => a + b, 0)
  const best = done.length ? Math.max(...done) : 0

  return (
    <>
      <div style={{
        flex: 1,
        padding: '6px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        overflow: 'hidden',
      }}>
        {Array.from({ length: TOTAL_LEVELS }, (_, i) => {
          const lv = i + 1
          const sc = scores[lv] ?? null
          const locked = lv > unlocked
          const c = sc ? scoreColor(sc) : 'rgba(167,139,250,.4)'
          return (
            <div key={lv} className={locked ? '' : 'lightning-border'} style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 10px',
              background: locked ? 'rgba(10,5,30,.3)' : 'rgba(124,58,237,.16)',
              border: `2px solid ${locked ? 'rgba(255,255,255,.15)' : 'rgba(255,255,255,.55)'}`,
              borderRadius: 8,
              opacity: locked ? .45 : 1,
              minHeight: 0,
            }}>
              <span style={{
                fontSize: 12, fontWeight: 900, width: 34, flexShrink: 0,
                color: locked ? 'rgba(124,58,237,.4)' : 'rgba(210,195,255,.75)',
                fontFamily: 'Orbitron,monospace', letterSpacing: 1,
              }}>LV {lv}</span>

              <div style={{ flex: 1, height: 4, background: 'rgba(124,58,237,.18)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: sc ? `${sc}%` : '0%',
                  background: sc ? `linear-gradient(90deg,#7c3aed,${c})` : 'transparent',
                  borderRadius: 3,
                  transition: 'width .5s cubic-bezier(.23,1,.32,1)',
                  boxShadow: sc ? `0 0 6px ${c}55` : 'none',
                }} />
              </div>

              {locked
                ? <span style={{ fontSize: 14, flexShrink: 0 }}>🔒</span>
                : <span style={{
                    fontSize: 16, fontWeight: 900,
                    minWidth: 34, textAlign: 'right', flexShrink: 0,
                    color: c, fontFamily: 'Orbitron,monospace',
                    textShadow: sc ? `0 0 10px ${c}66` : 'none',
                  }}>{sc ?? '–'}</span>
              }
            </div>
          )
        })}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-around',
        padding: '10px 8px',
        borderTop: '1px solid rgba(167,139,250,.2)',
        background: 'rgba(10,5,30,.45)',
        flexShrink: 0,
      }}>
        {[
          { val: total || '–', lbl: 'TOTAL',   c: '#a78bfa' },
          { val: best  || '–', lbl: 'TERBAIK', c: '#34D399' },
          { val: `${done.length}/10`, lbl: 'SELESAI', c: '#FBBF24' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: s.c, fontFamily: 'Orbitron,monospace', textShadow: `0 0 10px ${s.c}44` }}>{s.val}</span>
            <span style={{ fontSize: 12, color: 'rgba(210,195,255,.5)', fontFamily: 'Rajdhani,sans-serif', letterSpacing: 2 }}>{s.lbl}</span>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Main Home ─────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showDev, setShowDev] = useState(false)
  const [showCPATP, setShowCPATP] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [bgOn, setBgOn] = useState(true)
  const [sfxOn, setSfxOn] = useState(true)
  const [titleVisible, setTitleVisible] = useState(false)
  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(true)
  const [robotSpotIndex, setRobotSpotIndex] = useState(0)

  const [user] = useState(() => JSON.parse(localStorage.getItem('currentUser')))

  const gameScores = getUserItem(STORAGE_SCORES, {})
  const totalGameScore = Object.values(gameScores).filter(Boolean).reduce((a, b) => a + b, 0)
  const levelsDone = Object.values(gameScores).filter(Boolean).length

  const evalHistory = getUserItem(STORAGE_EVAL_HISTORY, [])
  const bestEvalScore = evalHistory.length ? Math.max(...evalHistory.map(h => h.score)) : null

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    setTimeout(() => setTitleVisible(true), 100)
  }, [user, navigate])

  // Robot pindah posisi setiap beberapa detik ke titik acak berikutnya
  useEffect(() => {
    const interval = setInterval(() => {
      setRobotSpotIndex(prev => {
        let next = Math.floor(Math.random() * ROBOT_SPOTS.length)
        if (next === prev) next = (next + 1) % ROBOT_SPOTS.length
        return next
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const playClick = () => { if (sfxOn) sounds.click.play() }
  const handleNav = (path) => { playClick(); setTimeout(() => navigate(path), 150) }
  const handleToggleBg = () => {
    playClick()
    if (bgOn) { stopHomeMusic(); setBgOn(false) }
    else { startHomeMusic(); setBgOn(true) }
  }
  const handleToggleSfx = () => {
    sounds.click.stop(); sounds.click.play(); setSfxOn(!sfxOn)
  }

  // Klik tombol Logout di menu SEKARANG cuma membuka modal konfirmasi.
  // Logout beneran baru terjadi setelah user menekan "Ya, Logout" di modal.
  const handleLogoutClick = () => {
    playClick(); setShowMenu(false); setShowLogoutConfirm(true)
  }
  const confirmLogout = () => {
    playClick(); localStorage.removeItem('currentUser')
    setTimeout(() => navigate('/auth'), 150)
  }

  const closeAll = () => {
    setShowProfile(false); setShowMenu(false)
    setShowAbout(false); setShowDev(false)
    setShowCPATP(false); setShowLogoutConfirm(false)
  }

  if (!user) return null

  const PANEL_W = 210

  // Panel sekarang lebih solid + ada glow border supaya nggak nyatu sama bg
  const panelStyle = {
    width: PANEL_W,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, rgba(23,12,58,.88), rgba(15,8,40,.82))',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    transition: 'width .35s cubic-bezier(.23,1,.32,1)',
  }

  const panelHeaderStyle = {
    display: 'flex', alignItems: 'center', gap: 7,
    padding: '11px 14px 10px',
    borderBottom: '1px solid rgba(167,139,250,.22)',
    flexShrink: 0,
  }

  return (
    <>
      <DesktopOnlyGuard />
      <style>{`
        @keyframes glitch {
          0%,100% { text-shadow: 2px 0 #a78bfa,-2px 0 #7c3aed; }
          25% { text-shadow: -2px 0 #a78bfa,2px 0 #7c3aed; transform: skewX(-1deg); }
          50% { text-shadow: 2px 2px #a78bfa,-2px -2px #7c3aed; }
          75% { text-shadow: -2px 2px #a78bfa,2px -2px #7c3aed; transform: skewX(1deg); }
        }
        @keyframes pulse-glow {
          0%,100% { filter: drop-shadow(0 0 8px #7c3aed) drop-shadow(0 0 20px #a78bfa44); }
          50%      { filter: drop-shadow(0 0 20px #a78bfa) drop-shadow(0 0 40px #7c3aed88); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-6px); }
        }
        @keyframes btnHover {
          0%,100% { filter: brightness(1) drop-shadow(0 0 8px #7c3aed44); }
          50%     { filter: brightness(1.15) drop-shadow(0 0 16px #a78bfa88); }
        }
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(5px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes lightningMove {
          0%   { background-position: 0% 0%; }
          100% { background-position: 300% 0%; }
        }
        @keyframes lightningFlicker {
          0%, 19%, 21%, 100% { opacity: 1; }
          20% { opacity: .4; }
        }
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        .title-main { font-family:'Orbitron',sans-serif; font-weight:900; letter-spacing:.15em; animation:glitch 4s infinite,pulse-glow 2s infinite; }
        .title-sub  { font-family:'Rajdhani',sans-serif; font-weight:700; letter-spacing:.3em; animation:pulse-glow 2.5s infinite reverse; }
        .float-anim { animation:float 3s ease-in-out infinite; }
        .btn-anim   { animation:btnHover 2s ease-in-out infinite; }
        .btn-anim:hover  { animation:none; filter:brightness(1.3) drop-shadow(0 0 10px #fff8) drop-shadow(0 0 26px #a78bfaee); transform:scale(1.04); }
        .btn-anim:active { transform:scale(0.97); filter:brightness(0.9); }

        .scanline {
          position:absolute; width:100%; height:2px;
          background:linear-gradient(transparent,#a78bfa22,transparent);
          animation:scanline 5s linear infinite;
          pointer-events:none; z-index:5;
        }
        .fade-up   { animation:fadeSlideUp .7s ease forwards; }
        .hist-anim { animation:fadeSlideIn .3s ease; }

        .panel-scroll::-webkit-scrollbar { display:none; }
        .panel-scroll { -ms-overflow-style:none; scrollbar-width:none; }

        /* ══ EFEK HOLOGRAM (robot) ══ */
        @keyframes hologramFlicker {
          0%, 89%, 100% { opacity: 1; }
          90%           { opacity: .35; }
          91%           { opacity: .85; }
          93%           { opacity: .45; }
          94%           { opacity: 1; }
          96%           { opacity: .6; }
          97%           { opacity: 1; }
        }
        @keyframes hologramGlow {
          0%, 100% { filter: drop-shadow(0 0 10px #22d3eeaa) drop-shadow(0 0 26px #7c3aed77) hue-rotate(0deg); }
          50%      { filter: drop-shadow(0 0 18px #22d3eecc) drop-shadow(0 0 34px #a78bfaaa) hue-rotate(18deg); }
        }
        @keyframes hologramScan {
          0%   { background-position-y: 0px; }
          100% { background-position-y: 48px; }
        }
        @keyframes hologramBaseGlow {
          0%, 100% { opacity: .5; transform: scaleX(1); }
          50%      { opacity: 1;  transform: scaleX(1.18); }
        }
        @keyframes hologramGlitchShift {
          0%, 94%, 100% { transform: translateX(0); }
          95%            { transform: translateX(-3px); }
          96%            { transform: translateX(3px); }
          97%            { transform: translateX(-2px); }
          98%            { transform: translateX(0); }
        }

        .hologram-wrap {
          position: relative;
          isolation: isolate;
        }
        .hologram-robot {
          position: relative;
          animation: hologramFlicker 4.5s infinite, hologramGlow 3s ease-in-out infinite,
                     hologramGlitchShift 6s infinite;
        }
        /* garis scan cyan yang bergerak turun menimpa robot */
        .hologram-robot::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(34,211,238,.16) 0px,
            rgba(34,211,238,.16) 1px,
            transparent 1px,
            transparent 5px
          );
          mix-blend-mode: screen;
          pointer-events: none;
          animation: hologramScan 2s linear infinite;
          z-index: 3;
        }
        /* cahaya proyeksi di bawah robot, seperti pijakan hologram */
        .hologram-base {
          position: absolute;
          left: 12%;
          right: 12%;
          bottom: -6px;
          height: 16px;
          background: radial-gradient(ellipse at center, rgba(34,211,238,.55), rgba(124,58,237,.25) 55%, transparent 75%);
          filter: blur(5px);
          animation: hologramBaseGlow 2.2s ease-in-out infinite;
          pointer-events: none;
          z-index: 2;
        }

        /* ══ EFEK LIGHTNING (border nyala di semua elemen klik-able) ══ */
        .lightning-border {
          position: relative;
          isolation: isolate;
          cursor: pointer;
        }
        .lightning-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(100deg,
            transparent 0%, transparent 35%,
            #e9d5ff 45%, #a78bfa 50%, #e9d5ff 55%,
            transparent 65%, transparent 100%);
          background-size: 300% 100%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0;
          transition: opacity .2s ease;
          pointer-events: none;
          z-index: 2;
        }
        .lightning-border:hover::after {
          opacity: 1;
          animation: lightningMove 1s linear infinite, lightningFlicker 1.4s linear infinite;
        }
        .lightning-border:hover {
          box-shadow: 0 0 16px rgba(167,139,250,.35);
        }

        /* ══ Glow generik untuk semua tombol (close, kembali, dll) ══ */
        .glow-btn {
          transition: filter .2s ease, transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
        }
        .glow-btn:hover {
          filter: brightness(1.25) drop-shadow(0 0 8px #a78bfaaa);
          transform: scale(1.08);
        }
        .glow-btn:active {
          transform: scale(0.94);
          filter: brightness(0.95);
        }

        /* Toggle arrow button */
        .tgl-arrow {
          width:16px; height:44px;
          background:rgb(102, 4, 182);
          border:1px solid rgba(234, 209, 246, 0.3);
          cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          color:rgba(210,195,255,.6);
          font-size:12px;
          transition:all .2s;
          flex-shrink:0;
        }
        .tgl-arrow:hover {
          background:rgba(124,58,237,.3);
          color:rgba(230,220,255,.95);
          border-color:rgba(167,139,250,.6);
          box-shadow: 0 0 14px rgba(167,139,250,.5);
        }
        .tgl-arrow-l { border-radius:0 5px 5px 0; border-left:none; }
        .tgl-arrow-r { border-radius:5px 0 0 5px; border-right:none; }

        /* Modal backdrop */
        .modal-bg {
          position:fixed; inset:0; z-index:50;
          display:flex; align-items:center; justify-content:center; padding:24px;
          background:rgba(4,2,16,.75);
          backdrop-filter:blur(14px);
          -webkit-backdrop-filter:blur(14px);
          animation:fadeSlideIn .2s ease;
        }
        .modal-card {
          position:relative; border-radius:24px; padding:24px;
          width:100%; max-width:300px;
          background:linear-gradient(145deg,rgba(19,11,46,.96),rgba(26,15,60,.96));
          border:1px solid rgba(124,58,237,.3);
          box-shadow:0 0 50px rgba(124,58,237,.18), 0 20px 60px rgba(0,0,0,.5);
          animation:fadeSlideIn .25s cubic-bezier(.23,1,.32,1);
        }

        /* Modal lebar (horizontal) — dipakai untuk CP/ATP */
        .modal-card-wide {
          position:relative; border-radius:24px; padding:26px;
          width:100%; max-width:680px;
          background:linear-gradient(145deg,rgba(19,11,46,.97),rgba(26,15,60,.97));
          border:1px solid rgba(124,58,237,.3);
          box-shadow:0 0 50px rgba(124,58,237,.18), 0 20px 60px rgba(0,0,0,.5);
          animation:fadeSlideIn .25s cubic-bezier(.23,1,.32,1);
        }
        .cpatp-grid {
          display:flex; gap:18px; margin-top:16px;
        }
        .cpatp-col {
          flex:1; min-width:0;
          padding:16px;
          border-radius:16px;
          background:rgba(124,58,237,.07);
          border:1px solid rgba(124,58,237,.18);
        }
        @media (max-width: 560px) {
          .cpatp-grid { flex-direction:column; }
        }

        /* Hamburger menu */
        .hmenu-card {
          position:absolute; top:56px; right:12px;
          border-radius:20px; padding:16px;
          width:270px;
          background:linear-gradient(145deg,rgba(19,11,46,.97),rgba(26,15,60,.97));
          border:1px solid rgba(124,58,237,.25);
          box-shadow:0 8px 40px rgba(0,0,0,.5), 0 0 30px rgba(124,58,237,.1);
          animation:fadeSlideIn .2s ease;
          z-index:51;
        }

        /* Toggle switch */
        .toggle-track {
          width:42px; height:22px; border-radius:11px;
          transition:all .3s; position:relative; cursor:pointer; border:none;
        }
        .toggle-track:hover {
          box-shadow: 0 0 12px rgba(167,139,250,.6);
          filter: brightness(1.15);
        }
        .toggle-track:active {
          transform: scale(0.94);
        }
        .toggle-thumb {
          position:absolute; top:3px; width:16px; height:16px;
          background:white; border-radius:50%; box-shadow:0 1px 4px rgba(0,0,0,.3);
          transition:left .3s;
        }

        /* Label seksi di dalam menu pengaturan, biar keliatan dikelompokkan */
        .menu-section-label {
          font-size:11px; font-weight:800; letter-spacing:2.5px;
          color:rgba(167,139,250,.5);
          font-family:'Rajdhani',sans-serif;
          text-transform:uppercase;
          margin:12px 2px 6px;
        }
        .menu-section-label:first-child { margin-top:2px; }

        /* Menu item row (toggle) */
        .menu-row {
          display:flex; align-items:center; justify-content:space-between;
          padding:11px 12px; border-radius:12px;
          background:rgba(124,58,237,.08);
          border:1px solid rgba(124,58,237,.16);
          transition:background .2s, border-color .2s, box-shadow .2s;
        }
        .menu-row:hover {
          background:rgba(124,58,237,.16);
          border-color:rgba(167,139,250,.4);
          box-shadow:0 0 12px rgba(167,139,250,.25);
        }

        /* Menu item row (button, seperti CP/ATP, Tentang, Developer) */
        .menu-row-btn {
          display:flex; align-items:center; gap:10px; cursor:pointer;
          padding:11px 12px; border-radius:12px; text-align:left; width:100%;
          background:rgba(124,58,237,.08);
          border:1px solid rgba(124,58,237,.16);
          transition:background .2s, border-color .2s, box-shadow .2s, transform .12s;
        }
        .menu-row-btn:hover {
          background:rgba(124,58,237,.22);
          border-color:rgba(167,139,250,.55);
          box-shadow:0 0 16px rgba(167,139,250,.4), inset 0 0 10px rgba(124,58,237,.15);
        }
        .menu-row-btn:active {
          transform:scale(.97);
          box-shadow:0 0 22px rgba(167,139,250,.6);
        }
        .menu-row-btn.logout-row {
          background: rgba(220,38,38,.08);
          border-color: rgba(220,38,38,.2);
        }
        .menu-row-btn.logout-row:hover {
          background: rgba(220,38,38,.18);
          border-color: rgba(248,113,113,.5);
          box-shadow:0 0 16px rgba(248,113,113,.45);
        }

        .menu-icon-badge {
          width:28px; height:28px; border-radius:9px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:rgba(167,139,250,.12);
          font-size:14px;
        }

        /* Tombol di modal konfirmasi logout */
        .confirm-btn {
          flex:1; padding:11px 0; border-radius:12px; cursor:pointer;
          font-family:'Rajdhani',sans-serif; font-weight:700; font-size:15px;
          border:1px solid transparent; letter-spacing:.5px;
          transition:filter .2s ease, transform .15s ease, box-shadow .2s ease;
        }
        .confirm-btn:hover { filter:brightness(1.15); transform:translateY(-1px); }
        .confirm-btn:active { transform:translateY(0) scale(.97); }
        .confirm-btn-danger {
          background:rgba(220,38,38,.85); color:#fff;
          box-shadow:0 0 16px rgba(220,38,38,.35);
        }
        .confirm-btn-danger:hover { box-shadow:0 0 22px rgba(248,113,113,.55); }
        .confirm-btn-ghost {
          background:rgba(124,58,237,.1); color:rgba(220,210,255,.85);
          border-color:rgba(124,58,237,.25);
        }
        .confirm-btn-ghost:hover { background:rgba(124,58,237,.2); }

        .shake-anim { animation: shakeX .4s ease; }
      `}</style>

      <div
        className="min-h-screen flex flex-col relative overflow-hidden"
        style={{
          backgroundImage: `url(${BgHome})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay — dibikin jauh lebih tipis biar bg asli keliatan */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,4,28,.32)' }} />
        {/* Scanline */}
        <div className="scanline" />
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,.04) 1px,transparent 0.5px),linear-gradient(90deg,rgba(124,58,237,.04) 1px,transparent 0.5px)',
          backgroundSize: '44px 44px',
          opacity: 1,
        }} />

        <div
          className="relative z-10 flex flex-col min-h-screen"
          onClick={() => { if (showMenu) setShowMenu(false) }}
        >

          {/* ══ HEADER ══ */}
          <div
            className="flex items-center justify-between px-5 py-3 fade-up flex-shrink-0"
            style={{
              background: 'rgba(10,4,28,.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(230, 224, 245, 0.18)',
              position: 'relative',
              zIndex: 100,
            }}
          >
            {/* Avatar */}
            <button
              onClick={() => { playClick(); closeAll(); setShowProfile(true) }}
              className="flex items-center gap-3 group lightning-border"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 14 }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={user.avatar}
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    border: '2px solid rgba(124,58,237,.6)',
                    objectFit: 'cover',
                    boxShadow: '0 0 14px rgba(124,58,237,.35)',
                    transition: 'all .2s',
                  }}
                />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: 'rgba(255,255,255,.92)', fontWeight: 700, fontSize: 16, lineHeight: 1.2, fontFamily: 'Rajdhani,sans-serif' }}>
                  {user.nama}
                </p>
                <p style={{ color: 'rgba(167,139,250,.6)', fontSize: 14, letterSpacing: 1, fontFamily: 'Rajdhani,sans-serif' }}>
                  @{user.username}
                </p>
              </div>
            </button>

            {/* Center title tag
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: .5 }}>
              <span style={{ color: 'rgba(167,139,250,.6)', fontSize: 14, fontFamily: 'Orbitron,monospace', letterSpacing: 2 }}>&lt;/&gt;</span>
            </div> */}

            {/* Kanan atas: Download + Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <DownloadAppButton />

              {/* Hamburger */}
              <button
                onClick={() => { playClick(); closeAll(); setShowMenu(p => !p) }}
                className="lightning-border glow-btn"
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,.5)',
                  borderRadius: 10, padding: '8px 10px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: 4,
                  transition: 'border-color .2s',
                }}
              >
                {[20, 16, 12].map((w, i) => (
                  <span key={i} style={{
                    width: w, height: 2, borderRadius: 1,
                    background: 'rgba(255,255,255,.85)',
                    display: 'block',
                    marginLeft: i === 2 ? 'auto' : 0,
                    transition: 'all .2s',
                  }} />
                ))}
              </button>

              {/* Hamburger dropdown — sekarang dikelompokkan per seksi biar lebih jelas */}
              {showMenu && (
                <div className="hmenu-card" onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <p style={{ fontFamily: 'Orbitron,monospace', fontSize: 12, fontWeight: 900, letterSpacing: 3, color: 'rgba(167,139,250,.5)' }}>
                      PENGATURAN
                    </p>
                    <button onClick={closeAll} className="glow-btn" style={{ background: 'none', border: '1px solid rgba(255,255,255,.4)', borderRadius: '50%', width: 26, height: 26, color: 'rgba(255,255,255,.75)', cursor: 'pointer', fontSize: 14, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                  </div>

                  {/* Seksi Audio */}
                  <p className="menu-section-label">Audio</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div className="menu-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="menu-icon-badge">🎵</span>
                        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 16, fontWeight: 700, color: 'rgba(220,200,255,.85)' }}>Backsound</span>
                      </div>
                      <button
                        onClick={handleToggleBg}
                        className="toggle-track lightning-border glow-btn"
                        style={{ background: bgOn ? 'rgba(124,58,237,.8)' : 'rgba(60,40,100,.4)', boxShadow: bgOn ? '0 0 10px rgba(124,58,237,.5)' : 'none' }}
                      >
                        <span className="toggle-thumb" style={{ left: bgOn ? 23 : 3 }} />
                      </button>
                    </div>
                    <div className="menu-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="menu-icon-badge">🔊</span>
                        <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 16, fontWeight: 700, color: 'rgba(220,200,255,.85)' }}>Sound Effect</span>
                      </div>
                      <button
                        onClick={handleToggleSfx}
                        className="toggle-track lightning-border glow-btn"
                        style={{ background: sfxOn ? 'rgba(124,58,237,.8)' : 'rgba(60,40,100,.4)', boxShadow: sfxOn ? '0 0 10px rgba(124,58,237,.5)' : 'none' }}
                      >
                        <span className="toggle-thumb" style={{ left: sfxOn ? 23 : 3 }} />
                      </button>
                    </div>
                  </div>

                  {/* Seksi Informasi */}
                  <p className="menu-section-label">Informasi</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <button className="menu-row-btn lightning-border" onClick={() => { playClick(); setShowMenu(false); setShowCPATP(true) }}>
                      <span className="menu-icon-badge">🎯</span>
                      <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 16, fontWeight: 700, color: 'rgba(220,200,255,.85)' }}>CP/ATP</span>
                    </button>
                    <button className="menu-row-btn lightning-border" onClick={() => { playClick(); setShowMenu(false); setShowAbout(true) }}>
                      <span className="menu-icon-badge">❕</span>
                      <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 16, fontWeight: 700, color: 'rgba(220,200,255,.85)' }}>Tentang Aplikasi</span>
                    </button>
                    <button className="menu-row-btn lightning-border" onClick={() => { playClick(); setShowMenu(false); setShowDev(true) }}>
                      <span className="menu-icon-badge">👨‍💻</span>
                      <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 16, fontWeight: 700, color: 'rgba(220,200,255,.85)' }}>Profil Pengembang</span>
                    </button>
                  </div>

                  {/* Seksi Akun */}
                  <p className="menu-section-label">Akun</p>
                  <button className="menu-row-btn logout-row lightning-border" onClick={handleLogoutClick}>
                    <span className="menu-icon-badge">➜</span>
                    <span style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 16, fontWeight: 700, color: 'rgba(248,113,113,.85)' }}>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ══ BODY ══ */}
          {/* position:'relative' di sini penting: panel kiri/kanan jadi overlay
              (position:absolute) sehingga toggle show/hide TIDAK memengaruhi
              posisi konten tengah (judul & tombol menu) sama sekali. */}
          <div style={{ display: 'flex', flex: 1, position: 'relative', minHeight: 0 }}>

            {/* CENTER — selalu di tengah, tidak pernah geser oleh panel */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', minWidth: 0 }}>

              {/* Robot animasi — pindah-pindah posisi (kiri s/d kanan) otomatis, dengan efek hologram.
                  Wrapper luar cuma urus POSISI (transform, GPU-accelerated, murah untuk browser).
                  Wrapper dalam urus animasi float + hologram, dipisah biar transform-nya tidak bentrok. */}
              <div style={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: 380,
                maxWidth: '85vw',
                pointerEvents: 'none',
                zIndex: -1,
                willChange: 'transform',
                transform: `translate3d(${ROBOT_SPOTS[robotSpotIndex].x}, ${ROBOT_SPOTS[robotSpotIndex].y}, 0)`,
                transition: 'transform 1.8s cubic-bezier(.65,0,.35,1)',
              }}>
                <div className="float-anim hologram-wrap" style={{ opacity: .9 }}>
                  <div className="hologram-base" />
                  <div className="hologram-robot">
                    <Lottie animationData={RobotAnim} loop autoplay />
                  </div>
                </div>
              </div>

              {/* Abstract animasi — dipusatkan di bagian bawah area tengah.
                  Sengaja pakai position:'absolute' + left:'50%' + translateX(-50%)
                  relatif ke container tengah (bukan position:'fixed' ke seluruh
                  viewport) supaya posisinya konsisten di ukuran window berapa pun —
                  termasuk saat sudah di-build jadi aplikasi desktop Electron, yang
                  ukuran window default-nya beda dari browser waktu development. */}
              <div style={{
                position: 'absolute', left: '50%', bottom: '-2%',
                transform: 'translateX(-50%)',
                width: '32%', minWidth: 220, maxWidth: 350,
                pointerEvents: 'none', zIndex: 1,
              }}>
                <div className="float-anim" style={{ opacity: .9, animationDelay: '.4s' }}>
                  <Lottie animationData={AbstractAnim} loop autoplay />
                </div>
              </div>

              {/* Title */}
              <div
                className={`text-center mb-8 transition-all duration-700`}
                style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(20px)', position: 'relative', zIndex: 2 }}
              >
                <div className="float-anim" style={{ display: 'inline-block' }}>
                  <h1 className="title-main" style={{ fontSize: 'clamp(24px,4.2vw,34px)', color: 'white', textTransform: 'uppercase' }}>
                    Pembelajaran
                  </h1>
                  <h1 className="title-sub" style={{ fontSize: 'clamp(16px,2.7vw,22px)', color: '#a78bfa', textTransform: 'uppercase', marginTop: 4 }}>
                    Sistem Komputer
                  </h1>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 }}>
                    <div style={{ height: 1, width: 48, background: 'linear-gradient(90deg,transparent,rgba(167,139,250,.5))' }} />
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 10px #a78bfa' }} />
                    <div style={{ height: 1, width: 48, background: 'linear-gradient(270deg,transparent,rgba(167,139,250,.5))' }} />
                  </div>
                </div>
              </div>

              {/* Menu Buttons — sekarang pakai gap, bukan margin negatif, jadi ga numpuk */}
              <div style={{
                display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 320,
                margin: '0 auto', gap: 18, position: 'relative', zIndex: 2,
              }}>
                {[
                  { img: MateriBtn, path: '/material' },
                  { img: GameBtn, path: '/game' },
                  { img: EvaluasiBtn, path: '/evaluation' },
                ].map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className="btn-anim"
                    style={{
                      background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                      transition: 'all .2s',
                    }}
                  >
                    <img src={item.img} style={{ width: '100%', objectFit: 'contain', display: 'block' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* PANEL KIRI — overlay absolute, tidak mendorong konten tengah */}
            <div style={{
              ...panelStyle,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: leftOpen ? PANEL_W : 0,
              borderRight: leftOpen ? '1px solid rgb(212, 202, 242)' : 'none',
              boxShadow: leftOpen ? '2px 0 20px rgba(124,58,237,.18)' : 'none',
              zIndex: 15,
            }}>
              <div style={panelHeaderStyle}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="rgb(212, 203, 242)" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <span style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: 3,
                  color: 'rgb(216, 207, 246)',
                  fontFamily: 'Rajdhani,sans-serif', flex: 1, whiteSpace: 'nowrap',
                }}>RIWAYAT EVALUASI</span>
              </div>
              <EvalPanel />
            </div>

            {/* ARROW KIRI — nempel di ujung panel, ikut geser bareng panel saja */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: leftOpen ? PANEL_W : 0,
              transform: 'translateY(-50%)',
              transition: 'left .35s cubic-bezier(.23,1,.32,1)',
              zIndex: 20,
            }}>
              <button
                className="tgl-arrow tgl-arrow-l lightning-border"
                onClick={() => { playClick(); setLeftOpen(o => !o) }}
                title={leftOpen ? 'Sembunyikan' : 'Tampilkan riwayat evaluasi'}
              >
                {leftOpen ? '‹' : '›'}
              </button>
            </div>

            {/* PANEL KANAN — overlay absolute, tidak mendorong konten tengah */}
            <div style={{
              ...panelStyle,
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: rightOpen ? PANEL_W : 0,
              borderLeft: rightOpen ? '1px solid rgb(213, 203, 242)' : 'none',
              boxShadow: rightOpen ? '-2px 0 20px rgba(124,58,237,.18)' : 'none',
              zIndex: 15,
            }}>
              <div style={panelHeaderStyle}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(220, 212, 242, 1)" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: 3,
                  color: 'rgb(221, 214, 243)',
                  fontFamily: 'Rajdhani,sans-serif', flex: 1, whiteSpace: 'nowrap',
                }}>SKOR GAME PER LEVEL</span>
              </div>
              <GamePanel />
            </div>

            {/* ARROW KANAN — nempel di ujung panel, ikut geser bareng panel saja */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: rightOpen ? PANEL_W : 0,
              transform: 'translateY(-50%)',
              transition: 'right .35s cubic-bezier(.23,1,.32,1)',
              zIndex: 20,
            }}>
              <button
                className="tgl-arrow tgl-arrow-r lightning-border"
                onClick={() => { playClick(); setRightOpen(o => !o) }}
                title={rightOpen ? 'Sembunyikan' : 'Tampilkan skor game'}
              >
                {rightOpen ? '›' : '‹'}
              </button>
            </div>

          </div>
        </div>

        {/* ══ MODAL PROFILE ══ */}
        {showProfile && (
          <div className="modal-bg" onClick={closeAll}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <button onClick={closeAll} className="glow-btn" style={{
                position: 'absolute', top: 14, right: 16,
                background: 'none', border: '1px solid rgba(255,255,255,.4)', borderRadius: '50%',
                width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,.75)',
                cursor: 'pointer', fontSize: 14, lineHeight: 1,
              }}>✕</button>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ position: 'relative' }}>
                  <img src={user.avatar} style={{
                    width: 80, height: 80, borderRadius: '50%',
                    border: '3px solid rgba(124,58,237,.6)',
                    objectFit: 'cover',
                    boxShadow: '0 0 24px rgba(124,58,237,.4)',
                  }} />
                  <div style={{
                    position: 'absolute', inset: -4, borderRadius: '50%',
                    border: '1px solid rgba(167,139,250,.15)',
                  }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: 'rgba(255,255,255,.9)', fontWeight: 700, fontSize: 18, fontFamily: 'Rajdhani,sans-serif' }}>{user.nama}</p>
                  <p style={{ color: 'rgba(167,139,250,.5)', fontSize: 14, letterSpacing: 1, fontFamily: 'Rajdhani,sans-serif' }}>@{user.username}</p>
                </div>
              </div>

              <div style={{
                padding: '12px 14px', borderRadius: 14, textAlign: 'center', marginBottom: 10,
                background: 'rgba(124,58,237,.08)',
                border: '1px solid rgba(124,58,237,.2)',
              }}>
                <p style={{ fontSize: 12, color: 'rgba(167,139,250,.45)', letterSpacing: 3, fontFamily: 'Rajdhani,sans-serif', marginBottom: 4 }}>
                  TOTAL SKOR GAME
                </p>
                <p style={{ fontSize: 40, fontWeight: 900, color: '#a78bfa', fontFamily: 'Orbitron,monospace', textShadow: '0 0 24px rgba(167,139,250,.5)', lineHeight: 1 }}>
                  {totalGameScore || '–'}
                </p>
                <p style={{ fontSize: 14, color: 'rgba(167,139,250,.3)', fontFamily: 'Rajdhani,sans-serif', marginTop: 4 }}>
                  akumulasi nilai terbaik {levelsDone} level
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { val: bestEvalScore ?? '–', lbl: 'SKOR EVALUASI', c: '#34D399', bc: 'rgba(52,211,153,.15)' },
                  { val: `${levelsDone}/10`, lbl: 'LEVEL SELESAI', c: '#FBBF24', bc: 'rgba(251,191,36,.12)' },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: '10px 8px', borderRadius: 12, textAlign: 'center',
                    background: s.bc, border: `1px solid ${s.c}22`,
                  }}>
                    <p style={{ fontSize: 20, fontWeight: 900, color: s.c, fontFamily: 'Orbitron,monospace' }}>{s.val}</p>
                    <p style={{ fontSize: 12, color: `${s.c}66`, fontFamily: 'Rajdhani,sans-serif', letterSpacing: 1, marginTop: 3 }}>{s.lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ MODAL TENTANG ══ */}
        {showAbout && (
          <div className="modal-bg" onClick={closeAll}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <button onClick={closeAll} className="glow-btn" style={{
                position: 'absolute', top: 14, right: 16,
                background: 'none', border: '1px solid rgba(255,255,255,.4)', borderRadius: '50%',
                width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,.75)',
                cursor: 'pointer', fontSize: 14,
              }}>✕</button>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 40 }}>🖥️</span>
                <h2 style={{ fontFamily: 'Orbitron,monospace', fontSize: 16, fontWeight: 900, color: 'rgba(255,255,255,.9)', letterSpacing: 3, marginTop: 10, textTransform: 'uppercase' }}>
                  Tentang Aplikasi
                </h2>
              </div>
              <div style={{ padding: '14px', borderRadius: 14, background: 'rgba(124,58,237,.07)', border: '1px solid rgba(124,58,237,.15)', textAlign: 'center' }}>
                <p style={{ color: '#a78bfa', fontWeight: 700, fontSize: 16, fontFamily: 'Rajdhani,sans-serif' }}>Pembelajaran Sistem Komputer</p>
                <p style={{ color: 'rgba(167,139,250,.5)', fontSize: 14, marginTop: 8, lineHeight: 1.65, fontFamily: 'Rajdhani,sans-serif' }}>
                  Aplikasi edukasi interaktif untuk mempelajari materi Sistem Komputer meliputi Hardware, Software, dan Brainware.
                </p>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(124,58,237,.12)' }}>
                  <p style={{ color: 'rgba(167,139,250,.25)', fontSize: 14 }}>Versi 1.0.0</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MODAL DEVELOPER ══ */}
        {showDev && (
          <div className="modal-bg" onClick={closeAll}>
            <div className="modal-card" style={{ maxWidth: 320 }} onClick={e => e.stopPropagation()}>
              <button onClick={closeAll} className="glow-btn" style={{
                position: 'absolute', top: 14, right: 16,
                background: 'none', border: '1px solid rgba(255,255,255,.4)', borderRadius: '50%',
                width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,.75)',
                cursor: 'pointer', fontSize: 14,
              }}>✕</button>
              <h2 style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 900, color: 'rgba(255,255,255,.8)', letterSpacing: 3, textAlign: 'center', marginBottom: 16, textTransform: 'uppercase' }}>
                Pengembang
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ position: 'relative' }}>
                  <img src={DevPhoto} style={{
                    width: 140, height: 140, borderRadius: 16,
                    objectFit: 'cover',
                    border: '3px solid rgba(124,58,237,.5)',
                    boxShadow: '0 0 30px rgba(124,58,237,.3)',
                  }} />
                </div>
              </div>
              <div style={{ padding: '14px', borderRadius: 14, background: 'rgba(124,58,237,.07)', border: '1px solid rgba(124,58,237,.15)', textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,.88)', fontWeight: 700, fontSize: 18, fontFamily: 'Rajdhani,sans-serif' }}>M. Nur Huda Alwi</p>
                <p style={{ color: 'rgba(167,139,250,.55)', fontSize: 14, marginTop: 4, fontFamily: 'Rajdhani,sans-serif' }}>Pendidikan Teknologi Informasi</p>
                <p style={{ color: 'rgba(167,139,250,.55)', fontSize: 14, marginTop: 2, fontFamily: 'Rajdhani,sans-serif' }}>Universitas Bhinneka PGRI</p>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(124,58,237,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>📧</span>
                  <p style={{ color: 'rgba(167,139,250,.4)', fontSize: 14, fontFamily: 'Rajdhani,sans-serif' }}>hudaalwi85@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MODAL CP/ATP (horizontal) ══ */}
        {showCPATP && (
          <div className="modal-bg" onClick={closeAll}>
            <div className="modal-card-wide" onClick={e => e.stopPropagation()}>
              <button onClick={closeAll} className="glow-btn" style={{
                position: 'absolute', top: 16, right: 18,
                background: 'none', border: '1px solid rgba(255,255,255,.4)', borderRadius: '50%',
                width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,.75)',
                cursor: 'pointer', fontSize: 14, lineHeight: 1,
              }}>✕</button>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 32 }}>🎯</span>
                <h2 style={{ fontFamily: 'Orbitron,monospace', fontSize: 16, fontWeight: 900, color: 'rgba(255,255,255,.9)', letterSpacing: 3, marginTop: 8, textTransform: 'uppercase' }}>
                  CP / ATP
                </h2>
                <p style={{ color: 'rgba(167,139,250,.45)', fontSize: 14, fontFamily: 'Rajdhani,sans-serif', marginTop: 4 }}>
                  Capaian Pembelajaran &amp; Alur Tujuan Pembelajaran
                </p>
              </div>

              <div className="cpatp-grid">
                {/* Kolom CP */}
                <div className="cpatp-col">
                  <p style={{
                    fontSize: 12, fontWeight: 800, letterSpacing: 2,
                    color: '#a78bfa', fontFamily: 'Rajdhani,sans-serif',
                    textTransform: 'uppercase', marginBottom: 8,
                  }}>
                    Capaian Pembelajaran (CP)
                  </p>
                  <p style={{
                    color: 'rgba(220,210,255,.8)', fontSize: 14,
                    lineHeight: 1.7, fontFamily: 'Rajdhani,sans-serif',
                  }}>
                    {CP_TEXT}
                  </p>
                </div>

                {/* Kolom ATP */}
                <div className="cpatp-col">
                  <p style={{
                    fontSize: 12, fontWeight: 800, letterSpacing: 2,
                    color: '#34D399', fontFamily: 'Rajdhani,sans-serif',
                    textTransform: 'uppercase', marginBottom: 8,
                  }}>
                    Alur Tujuan Pembelajaran (ATP)
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {ATP_ITEMS.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{
                          flexShrink: 0, width: 20, height: 20, borderRadius: 6,
                          background: 'rgba(52,211,153,.15)', color: '#34D399',
                          fontSize: 12, fontWeight: 900, fontFamily: 'Orbitron,monospace',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{i + 1}</span>
                        <p style={{
                          color: 'rgba(220,210,255,.8)', fontSize: 14,
                          lineHeight: 1.5, fontFamily: 'Rajdhani,sans-serif',
                        }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ MODAL KONFIRMASI LOGOUT ══ */}
        {showLogoutConfirm && (
          <div className="modal-bg" onClick={closeAll}>
            <div className="modal-card shake-anim" style={{ maxWidth: 300 }} onClick={e => e.stopPropagation()}>
              <div style={{ textAlign: 'center', marginBottom: 18 }}>
                <span style={{ fontSize: 38, color: 'red'}}>➜]</span>
                <h2 style={{
                  fontFamily: 'Orbitron,monospace', fontSize: 15, fontWeight: 900,
                  color: 'rgba(255,255,255,.9)', letterSpacing: 2, marginTop: 10,
                  textTransform: 'uppercase',
                }}>
                  Konfirmasi Logout
                </h2>
                <p style={{
                  color: 'rgba(167,139,250,.55)', fontSize: 14, marginTop: 8,
                  fontFamily: 'Rajdhani,sans-serif', lineHeight: 1.5,
                }}>
                  Apakah kamu yakin ingin keluar dari akun <span style={{ color: 'rgba(220,210,255,.9)', fontWeight: 700 }}>@{user.username}</span>?
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className="confirm-btn confirm-btn-ghost"
                  onClick={() => { playClick(); setShowLogoutConfirm(false) }}
                >
                  Batal
                </button>
                <button
                  className="confirm-btn confirm-btn-danger"
                  onClick={confirmLogout}
                >
                  Ya, Logout
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default Home