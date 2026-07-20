import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
  width: 1280,
  height: 800,
  autoHideMenuBar: true,
  icon: path.join(__dirname, '../build/icon.ico'),
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
  },
})

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})