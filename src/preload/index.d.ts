import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface Window {
        electron: ElectronAPI
        api: {
            minwindow: () => void
            maxwindow: () => void
            closewindow: () => void
        }
    }
}
