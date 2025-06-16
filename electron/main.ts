import { app, BrowserWindow, screen, ipcMain } from 'electron'
import path from 'path'

let win: BrowserWindow | null = null
let isDragging = false
let dragOffset = { x: 0, y: 0 }
const createWindow = () => {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

    win = new BrowserWindow({
    width: 256,
    height: 256,
    frame: false,
    alwaysOnTop: true,
    movable: true,
    resizable: false,
    skipTaskbar: false,
    transparent: true, // optional for overlay style
    x: screenWidth - 256,
    y: screenHeight - 256,
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools:true
    }
  })

  win.loadURL('http://localhost:5173')
}

// Handle dragging logic via IPC
ipcMain.on('start-drag', (event) => {
  if (!win) return
  const mouse = screen.getCursorScreenPoint()
  const bounds = win.getBounds()
  dragOffset = {
    x: mouse.x - bounds.x,
    y: mouse.y - bounds.y
  }
  isDragging = true
})

ipcMain.on('update-drag', (event, x: number, y: number) => {
  if (!win || !isDragging) return
  win.setBounds({
    x: x - dragOffset.x,
    y: y - dragOffset.y,
    width: win.getBounds().width,
    height: win.getBounds().height
  })
})

ipcMain.on('end-drag', () => {
  isDragging = false
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
