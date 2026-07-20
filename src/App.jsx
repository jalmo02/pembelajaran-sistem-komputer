import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import '@fontsource/rajdhani/600.css'
import '@fontsource/rajdhani/700.css'
import '@fontsource/orbitron/700.css'
import '@fontsource/orbitron/900.css'

import Auth from './pages/Auth'
import Home from './pages/Home'
import Material from './pages/Material'
import Game from './pages/Game'
import Evaluation from './pages/Evaluation'
import Level1 from './pages/GameLevel/Level1'
import Level2 from './pages/GameLevel/Level2'
import Level3 from './pages/GameLevel/Level3'
import Level4 from './pages/GameLevel/Level4'
import Level5 from './pages/GameLevel/Level5'
import Level6 from './pages/GameLevel/Level6'
import Level7 from './pages/GameLevel/Level7'
import Level8 from './pages/GameLevel/Level8'
import Level9 from './pages/GameLevel/Level9'
import Level10 from './pages/GameLevel/Level10'

import {
  startHomeMusic,
  stopHomeMusic,
  startGameMusic,
  stopGameMusic
} from './data/sounds'

// ... dst

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('currentUser')
  return user ? children : <Navigate to="/auth" />
}

function MusicController() {
  const location = useLocation()

  useEffect(() => {
    stopHomeMusic()
    stopGameMusic()

    const isHome = location.pathname === '/'

    const isGame =
      location.pathname === '/game' ||
      location.pathname.startsWith('/game/level/')

    if (isHome) {
      startHomeMusic()
    }

    if (isGame) {
      startGameMusic()
    }
  }, [location.pathname])

  return null
}

function App() {
  return (
    <HashRouter>

      <MusicController />

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}/>
        <Route path="/material"element={<PrivateRoute><Material /></PrivateRoute>}/>
        <Route path="/game" element={<PrivateRoute><Game /></PrivateRoute>}/>
        <Route path="/evaluation" element={<PrivateRoute><Evaluation /></PrivateRoute>}/>

        {/* Game Levels */}
        <Route path="/game/level/1"element={<PrivateRoute><Level1 /></PrivateRoute> }/>
        <Route path="/game/level/2" element={<PrivateRoute><Level2 /></PrivateRoute>}/>
        <Route path="/game/level/3"element={<PrivateRoute><Level3 /></PrivateRoute>}/>
        <Route path="/game/level/4" element={<PrivateRoute><Level4 /></PrivateRoute>} />
        <Route path="/game/level/5" element={<PrivateRoute><Level5 /></PrivateRoute>} />
        <Route path="/game/level/6" element={<PrivateRoute><Level6 /></PrivateRoute>} />
        <Route path="/game/level/7" element={<PrivateRoute><Level7 /></PrivateRoute>} />
        <Route path="/game/level/8" element={<PrivateRoute><Level8 /></PrivateRoute>} />
        <Route path="/game/level/9" element={<PrivateRoute><Level9 /></PrivateRoute>} />
        <Route path="/game/level/10" element={<PrivateRoute><Level10 /></PrivateRoute>} />
      </Routes>

    </HashRouter>
  )
}

export default App