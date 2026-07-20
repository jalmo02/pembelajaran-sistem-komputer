import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DesktopOnlyGuard from '../components/DesktopOnlyGuard'
import DownloadAppButton from '../components/DownloadAppButton'

// Import avatars
import Avatar1 from '../assets/images/avatar/Avatar1.png'
import Avatar2 from '../assets/images/avatar/Avatar2.png'
import Avatar3 from '../assets/images/avatar/Avatar3.png'
import Avatar4 from '../assets/images/avatar/Avatar4.png'
import Avatar5 from '../assets/images/avatar/Avatar5.png'
import Avatar6 from '../assets/images/avatar/Avatar6.png'

// Import background
import BgLogin from '../assets/images/background/bg-login.png'

const avatarList = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6]

const Auth = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [showPass, setShowPass] = useState(false)

  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    nama: '', username: '', password: '', avatar: Avatar1
  })
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const switchMode = (toLogin) => {
    setIsLogin(toLogin)
    setError('')
    setNotice('')
  }

  const handleLogin = () => {
    setError('')
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(
      u => u.username === loginForm.username && u.password === loginForm.password
    )
    if (!user) return setError('Username atau password salah!')
    localStorage.setItem('currentUser', JSON.stringify(user))
    navigate('/')
  }

  const handleRegister = () => {
    setError('')
    if (!registerForm.nama || !registerForm.username || !registerForm.password)
      return setError('Semua field harus diisi!')
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const exists = users.find(u => u.username === registerForm.username)
    if (exists) return setError('Username sudah dipakai!')
    const newUser = { ...registerForm }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Jangan langsung login — arahkan ke form Login
    setLoginForm({ username: newUser.username, password: '' })
    setRegisterForm({ nama: '', username: '', password: '', avatar: Avatar1 })
    setIsLogin(true)
    setNotice('Registrasi berhasil! Silakan login untuk melanjutkan.')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center font-body px-6 relative overflow-hidden"
      style={{
        backgroundImage: `url(${BgLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <DesktopOnlyGuard />
      <DownloadAppButton style={{ position: 'fixed', top: 20, right: 20, zIndex: 30 }} />

      {/* Overlay — tanpa blur, cuma gelapin biar teks kebaca */}
      <div className="absolute inset-0 bg-background/80" />

      {/* Scanline / CRT texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 3px)',
        }}
      />

      <div className="relative z-10 w-full max-w-sm">

        {/* Judul */}
        <div className="text-center mb-6">
          <div className="text-center mb-6">
  <div className="inline-flex items-center gap-2 mb-2">
    <span className="h-px w-8 bg-primary/60" />
    <span className="text-primary-light text-[10px] font-bold tracking-[0.3em] uppercase">
      Sistem Aktif
    </span>
    <span className="h-px w-8 bg-primary/60" />
  </div>

  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <h1
      className="font-black text-white font-game uppercase drop-shadow-lg"
      style={{
        fontSize: 'clamp(16px, 4.6vw, 20px)',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}
    >
      Pembelajaran Sistem Komputer
    </h1>
  </div>

  <h1 className="text-1xl font-black text-primary-light font-game tracking-wider uppercase drop-shadow-lg">
    Kelas X A IPS
  </h1>
  <h1 className="text-1xl font-black text-primary-light font-game tracking-wider uppercase drop-shadow-lg">
    FASE E
  </h1>
</div>
        </div>

        {/* Card dengan bingkai HUD di sudut */}
        <div className="relative">
          {/* Corner brackets */}
          <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary-light rounded-tl-lg" />
          <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary-light rounded-tr-lg" />
          <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary-light rounded-bl-lg" />
          <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary-light rounded-br-lg" />

          <div className="bg-background-card rounded-2xl p-6 border border-primary/40 shadow-2xl shadow-primary/20">

            {/* Toggle Login/Register */}
            <div className="flex rounded-xl overflow-hidden mb-5 border border-primary/30 bg-background-secondary/60">
              <button
                onClick={() => switchMode(true)}
                className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isLogin
                    ? 'bg-primary text-white shadow-[0_0_12px_rgba(255,255,255,0.15)_inset]'
                    : 'text-primary-light hover:bg-primary/10'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => switchMode(false)}
                className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  !isLogin
                    ? 'bg-primary text-white shadow-[0_0_12px_rgba(255,255,255,0.15)_inset]'
                    : 'text-primary-light hover:bg-primary/10'
                }`}
              >
                Register
              </button>
            </div>

            {/* Notice sukses register */}
            {notice && (
              <p className="text-emerald-400 text-xs text-center mb-3 uppercase tracking-wide">
                ✓ {notice}
              </p>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center mb-3">{error}</p>
            )}

            {/* Form Login */}
            {isLogin ? (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={loginForm.username}
                  onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full bg-background-secondary text-white px-4 py-3 rounded-xl border border-primary/30 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)] placeholder:text-gray-500 transition-all"
                />
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full bg-background-secondary text-white px-4 py-3 rounded-xl border border-primary/30 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)] placeholder:text-gray-500 transition-all"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs uppercase tracking-wide hover:text-primary-light transition-colors"
                  >
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-black rounded-xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30 font-game text-sm"
                >
                  ▶ Login
                </button>
              </div>

            ) : (

              /* Form Register */
              <div className="flex flex-col gap-4">

                {/* Pilih Avatar */}
                <div>
                  <p className="text-primary-light text-xs font-bold uppercase tracking-wider mb-2 text-center">
                    Pilih Karakter
                  </p>
                  {/* Preview avatar terpilih */}
                  <div className="flex justify-center mb-3">
                    <div className="relative">
                      <div
                        className="w-20 h-20 bg-primary shadow-lg shadow-primary/50 flex items-center justify-center overflow-hidden"
                        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                      >
                        <img
                          src={registerForm.avatar}
                          className="w-[92%] h-[92%] object-cover"
                          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Grid pilihan avatar */}
                  <div className="grid grid-cols-6 gap-2">
                    {avatarList.map((av, i) => (
                      <button
                        key={i}
                        onClick={() => setRegisterForm({ ...registerForm, avatar: av })}
                        className={`relative aspect-square transition-all hover:scale-110 overflow-hidden ${
                          registerForm.avatar === av
                            ? 'opacity-100 scale-110'
                            : 'opacity-50 hover:opacity-90'
                        }`}
                        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                      >
                        <div className={`w-full h-full ${registerForm.avatar === av ? 'ring-2 ring-primary-light' : ''}`}>
                          <img src={av} className="w-full h-full object-cover" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={registerForm.nama}
                  onChange={e => setRegisterForm({ ...registerForm, nama: e.target.value })}
                  className="w-full bg-background-secondary text-white px-4 py-3 rounded-xl border border-primary/30 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)] placeholder:text-gray-500 transition-all"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={registerForm.username}
                  onChange={e => setRegisterForm({ ...registerForm, username: e.target.value })}
                  className="w-full bg-background-secondary text-white px-4 py-3 rounded-xl border border-primary/30 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)] placeholder:text-gray-500 transition-all"
                />
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full bg-background-secondary text-white px-4 py-3 rounded-xl border border-primary/30 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,255,255,0.06)] placeholder:text-gray-500 transition-all"
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs uppercase tracking-wide hover:text-primary-light transition-colors"
                  >
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button
                  onClick={handleRegister}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-black rounded-xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30 font-game text-sm"
                >
                  Buat Akun
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth