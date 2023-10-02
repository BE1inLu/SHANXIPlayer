import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface Window {
        electron: ElectronAPI
        api: {
            darkTheme: () => void
            lightTheme: () => void
            minwindow: () => void
            maxwindow: () => void
            closewindow: () => void
        }
    }
}
