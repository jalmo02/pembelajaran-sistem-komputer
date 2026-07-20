import { useState, useEffect } from 'react'

const isMobileDevice = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera || ''
  const uaMobile = /android|iphone|ipad|ipod|iemobile|blackberry|opera mini|mobile/i.test(ua)
  const touchSmall = ('ontouchstart' in window) && window.innerWidth < 1024
  return uaMobile || touchSmall
}

const DesktopOnlyGuard = () => {
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const check = () => setBlocked(isMobileDevice())
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!blocked) return null

  return (
    <>
      <style>{`
        @keyframes dogFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes dogCardPop {
          0%   { opacity: 0; transform: translateY(24px) scale(.94); }
          60%  { opacity: 1; transform: translateY(-3px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dogScan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        @keyframes dogIconFloat {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50%     { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes dogRingPulse {
          0%   { transform: scale(.85); opacity: .8; }
          70%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes dogTitleGlow {
          0%,100% { text-shadow: 0 0 10px rgba(167,139,250,.4); }
          50%     { text-shadow: 0 0 22px rgba(167,139,250,.8); }
        }
        @keyframes dogBorderMove {
          0%   { background-position: 0% 0%; }
          100% { background-position: 300% 0%; }
        }
        @keyframes dogDotBlink {
          0%,100% { opacity: 1; }
          50%     { opacity: .25; }
        }

        .dog-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          background: radial-gradient(circle at 50% 30%, rgba(60,20,120,.35), rgba(5,2,18,.97) 65%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: dogFadeIn .25s ease;
          overflow: hidden;
        }
        .dog-scan {
          position: absolute; left: 0; width: 100%; height: 2px;
          background: linear-gradient(transparent, rgba(167,139,250,.5), transparent);
          animation: dogScan 4.5s linear infinite;
          pointer-events: none;
        }
        .dog-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,.06) 1px, transparent 1px);
          background-size: 38px 38px;
          pointer-events: none;
        }
        .dog-card {
          position: relative;
          max-width: 340px; width: 100%;
          padding: 30px 24px 26px;
          border-radius: 26px;
          text-align: center;
          background: linear-gradient(160deg, rgba(24,13,54,.97), rgba(13,7,34,.98));
          border: 1px solid transparent;
          background-clip: padding-box;
          box-shadow: 0 0 0 1px rgba(255,255,255,.04) inset,
                      0 0 70px rgba(124,58,237,.3),
                      0 25px 80px rgba(0,0,0,.65);
          animation: dogCardPop .4s cubic-bezier(.2,1.4,.4,1);
          isolation: isolate;
        }
        .dog-card::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 26px;
          padding: 1.5px;
          background: linear-gradient(100deg,
            rgba(167,139,250,.15) 0%, rgba(167,139,250,.15) 30%,
            #e9d5ff 48%, #a78bfa 52%, #e9d5ff 56%,
            rgba(167,139,250,.15) 70%, rgba(167,139,250,.15) 100%);
          background-size: 260% 100%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          animation: dogBorderMove 3.5s linear infinite;
          z-index: -1;
        }

        .dog-icon-wrap {
          position: relative;
          width: 76px; height: 76px;
          margin: 0 auto 18px;
          display: flex; align-items: center; justify-content: center;
        }
        .dog-icon-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(167,139,250,.5);
          animation: dogRingPulse 2s ease-out infinite;
        }
        .dog-icon-ring.delay { animation-delay: .7s; }
        .dog-icon-core {
          width: 60px; height: 60px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(145deg, rgba(124,58,237,.5), rgba(167,139,250,.18));
          border: 1px solid rgba(216,201,255,.5);
          font-size: 28px;
          animation: dogIconFloat 3s ease-in-out infinite;
          box-shadow: 0 0 28px rgba(124,58,237,.55);
        }

        .dog-title {
          font-family: 'Orbitron',monospace; font-weight: 900; font-size: 17px;
          color: rgba(255,255,255,.95); letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 12px;
          animation: dogTitleGlow 2.4s ease-in-out infinite;
        }
        .dog-desc {
          color: rgba(195,180,240,.75); font-size: 14.5;
          font-family: 'Rajdhani',sans-serif; line-height: 1.65;
          margin-bottom: 18px;
        }
        .dog-status {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 14px; border-radius: 999px;
          background: rgba(124,58,237,.12);
          border: 1px solid rgba(124,58,237,.3);
        }
        .dog-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 8px #a78bfa;
          animation: dogDotBlink 1.4s ease-in-out infinite;
        }
        .dog-status-text {
          font-family: 'Rajdhani',sans-serif; font-weight: 700; font-size: 12px;
          letter-spacing: 2px; color: rgba(210,195,255,.7);
          text-transform: uppercase;
        }
      `}</style>

      <div className="dog-backdrop">
        <div className="dog-grid" />
        <div className="dog-scan" />

        <div className="dog-card">
          <div className="dog-icon-wrap">
            <span className="dog-icon-ring" />
            <span className="dog-icon-ring delay" />
            <span className="dog-icon-core">🖥️</span>
          </div>

          <h2 className="dog-title">Khusus Tampilan Desktop</h2>

          <p className="dog-desc">
            Aplikasi ini belum mendukung tampilan mobile. Silakan buka melalui
            laptop/komputer, atau unduh versi aplikasi desktop-nya untuk pengalaman terbaik.
          </p>

          <div className="dog-status">
            <span className="dog-status-dot" />
            <span className="dog-status-text">Menunggu perangkat desktop</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesktopOnlyGuard