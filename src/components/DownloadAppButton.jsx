import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'

// File di-hosting di GitHub Releases (bukan di public/downloads/ lagi),
// biar gak bikin ukuran repo/git jadi besar.
const DOWNLOAD_URL = 'https://github.com/jalmo02/pembelajaran-sistem-komputer/releases/download/v1.0.0/Pembelajaran.Sistem.Komputer.Setup.1.0.0.exe'
const FILE_NAME = 'Pembelajaran.Sistem.Komputer.Setup.1.0.0.exe'

const isElectron = () => navigator.userAgent.toLowerCase().includes('electron')

const DownloadAppButton = ({ style }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [ripples, setRipples] = useState([])
  const btnRef = useRef(null)

  // Kalau lagi dibuka di dalam app Electron sendiri, gak perlu tombol download
  if (isElectron()) return null

  const spawnRipple = (e) => {
    const rect = btnRef.current.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.6
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const id = Date.now()
    setRipples(r => [...r, { id, x, y, size }])
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 650)
  }

  const openConfirm = (e) => {
    spawnRipple(e)
    setShowConfirm(true)
  }

  const handleDownload = () => {
    setDownloading(true)
    const link = document.createElement('a')
    link.href = DOWNLOAD_URL
    link.download = FILE_NAME
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      setDownloading(false)
      setShowConfirm(false)
    }, 900)
  }

  return (
    <>
      <style>{`
        @keyframes dlPulseGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(167,139,250,.45), 0 0 12px rgba(124,58,237,.3); }
          50%     { box-shadow: 0 0 0 6px rgba(167,139,250,0), 0 0 22px rgba(167,139,250,.55); }
        }
        @keyframes dlIconBounce {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(2px); }
        }
        @keyframes dlRipple {
          from { transform: scale(0); opacity: .45; }
          to   { transform: scale(1); opacity: 0; }
        }
        @keyframes dlModalPop {
          0%   { opacity: 0; transform: translateY(16px) scale(.94); }
          60%  { opacity: 1; transform: translateY(-2px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dlBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes dlIconOrbit {
          0%   { transform: rotate(0deg) translateY(-26px) rotate(0deg); }
          100% { transform: rotate(360deg) translateY(-26px) rotate(-360deg); }
        }
        @keyframes dlIconFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50%     { transform: translateY(-5px) scale(1.04); }
        }
        @keyframes dlRingPulse {
          0%   { transform: scale(.85); opacity: .9; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes dlCheckPop {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes dlSpin {
          to { transform: rotate(360deg); }
        }

        .dl-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          display: flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, rgba(124,58,237,.28), rgba(167,139,250,.14));
          border: 1px solid rgba(167,139,250,.55);
          border-radius: 10px;
          padding: 8px 15px;
          cursor: pointer;
          color: rgba(235,226,255,.95);
          font-family: 'Rajdhani',sans-serif;
          font-weight: 700; font-size: 14px; letterSpacing: .5px;
          animation: dlPulseGlow 2.6s ease-in-out infinite;
          transition: filter .2s ease, transform .15s ease, background .25s ease, border-color .25s ease;
        }
        .dl-btn:hover {
          animation: none;
          filter: brightness(1.2);
          background: linear-gradient(135deg, rgba(124,58,237,.45), rgba(167,139,250,.22));
          border-color: rgba(216,201,255,.9);
          box-shadow: 0 0 22px rgba(167,139,250,.55), 0 0 4px rgba(255,255,255,.3) inset;
          transform: translateY(-1px);
        }
        .dl-btn:active {
          transform: translateY(0) scale(.95);
          filter: brightness(.95);
        }
        .dl-btn .dl-icon {
          display: inline-flex;
          animation: dlIconBounce 1.6s ease-in-out infinite;
          font-size: 15px;
        }
        .dl-btn .dl-ripple {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,.55), rgba(167,139,250,.15) 70%, transparent 75%);
          pointer-events: none;
          animation: dlRipple .65s ease-out forwards;
          z-index: 0;
        }
        .dl-btn > * { position: relative; z-index: 1; }

        .dl-modal-bg {
          position: fixed; inset: 0; z-index: 999;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          background: radial-gradient(circle at 50% 40%, rgba(60,20,120,.4), rgba(4,2,16,.85));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          animation: dlBackdropIn .2s ease;
        }
        .dl-modal-card {
          position: relative;
          max-width: 320px; width: 100%;
          padding: 28px 24px 24px;
          border-radius: 26px;
          text-align: center;
          background: linear-gradient(160deg, rgba(24,13,54,.98), rgba(14,7,36,.98));
          border: 1px solid rgba(167,139,250,.4);
          box-shadow: 0 0 0 1px rgba(255,255,255,.04) inset,
                      0 0 60px rgba(124,58,237,.28),
                      0 25px 70px rgba(0,0,0,.6);
          animation: dlModalPop .38s cubic-bezier(.2,1.4,.4,1);
          overflow: hidden;
        }
        .dl-modal-card::before {
          content:'';
          position:absolute; inset:-40% -40% auto -40%; height:180px;
          background: radial-gradient(ellipse at center, rgba(167,139,250,.25), transparent 70%);
          pointer-events:none;
        }
        .dl-icon-wrap {
          position: relative;
          width: 68px; height: 68px;
          margin: 0 auto 16px;
          display: flex; align-items: center; justify-content: center;
        }
        .dl-icon-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(167,139,250,.55);
          animation: dlRingPulse 1.8s ease-out infinite;
        }
        .dl-icon-ring.delay { animation-delay: .6s; }
        .dl-icon-core {
          width: 54px; height: 54px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(145deg, rgba(124,58,237,.5), rgba(167,139,250,.2));
          border: 1px solid rgba(216,201,255,.5);
          font-size: 24px;
          animation: dlIconFloat 2.4s ease-in-out infinite;
          box-shadow: 0 0 24px rgba(124,58,237,.5);
        }
        .dl-spinner {
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,.25);
          border-top-color: #fff;
          animation: dlSpin .7s linear infinite;
        }
        .dl-check {
          font-size: 24px;
          animation: dlCheckPop .35s cubic-bezier(.2,1.6,.4,1);
        }

        .dl-confirm-btn {
          flex: 1; padding: 12px 0; border-radius: 13px; cursor: pointer;
          font-family: 'Rajdhani',sans-serif; font-weight: 700; font-size: 15px;
          letter-spacing: .6px;
          border: 1px solid transparent;
          transition: filter .2s ease, transform .15s ease, box-shadow .2s ease, background .2s ease;
        }
        .dl-confirm-btn:disabled { cursor: not-allowed; opacity: .8; }
        .dl-confirm-btn:not(:disabled):hover { filter: brightness(1.18); transform: translateY(-1px); }
        .dl-confirm-btn:not(:disabled):active { transform: translateY(0) scale(.96); }
        .dl-confirm-btn-yes {
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          color: #fff;
          box-shadow: 0 0 18px rgba(124,58,237,.5);
          display: flex; align-items: center; justify-content: center; gap: 7px;
        }
        .dl-confirm-btn-yes:not(:disabled):hover {
          box-shadow: 0 0 26px rgba(167,139,250,.75);
        }
        .dl-confirm-btn-no {
          background: rgba(124,58,237,.08);
          color: rgba(220,210,255,.85);
          border-color: rgba(124,58,237,.3);
        }
        .dl-confirm-btn-no:hover {
          background: rgba(124,58,237,.18);
          border-color: rgba(167,139,250,.5);
        }
      `}</style>

      <button
        ref={btnRef}
        onClick={openConfirm}
        className="dl-btn"
        style={style}
      >
        {ripples.map(r => (
          <span key={r.id} className="dl-ripple" style={{ left: r.x, top: r.y, width: r.size, height: r.size }} />
        ))}
        <span className="dl-icon">⬇</span>
        <span>Download</span>
      </button>

      {showConfirm && createPortal(
        <div
          className="dl-modal-bg"
          onClick={() => { if (!downloading) setShowConfirm(false) }}
        >
          <div className="dl-modal-card" onClick={e => e.stopPropagation()}>
            <div className="dl-icon-wrap">
              <span className="dl-icon-ring" />
              <span className="dl-icon-ring delay" />
              <span className="dl-icon-core">
                {downloading ? '✓' : '⬇'}
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Orbitron,monospace', fontSize: 16, fontWeight: 900,
              color: 'rgba(255,255,255,.95)', letterSpacing: 1.5, marginBottom: 10,
              textTransform: 'uppercase',
            }}>
              {downloading ? 'Mengunduh...' : 'Konfirmasi Unduhan'}
            </h2>

            <p style={{
              color: 'rgba(190,175,235,.75)', fontSize: 14.5,
              fontFamily: 'Rajdhani,sans-serif', lineHeight: 1.6, marginBottom: 22,
            }}>
              {downloading ? (
                <>File sedang diunduh ke perangkatmu, tunggu sebentar ya.</>
              ) : (
                <>
                  Apakah kamu yakin ingin mendownload{' '}
                  <span style={{ color: 'rgba(230,220,255,.95)', fontWeight: 700 }}>
                    Pembelajaran Sistem Komputer.exe
                  </span>?
                </>
              )}
            </p>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="dl-confirm-btn dl-confirm-btn-no"
                onClick={() => setShowConfirm(false)}
                disabled={downloading}
              >
                Tidak
              </button>
              <button
                className="dl-confirm-btn dl-confirm-btn-yes"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? <span className="dl-spinner" /> : 'Ya, Unduh'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default DownloadAppButton