import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  startDrag: () => ipcRenderer.send('start-drag'),
  updateDrag: (x: number, y: number) => ipcRenderer.send('update-drag', x, y),
  endDrag: () => ipcRenderer.send('end-drag')
})
