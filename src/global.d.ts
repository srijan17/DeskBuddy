export {}

declare global {
  interface Window {
    electronAPI: {
      startDrag: () => void
      updateDrag: (x: number, y: number) => void
      endDrag: () => void
    }
  }
}