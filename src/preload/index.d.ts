import { ElectronAPI } from '@electron-toolkit/preload'
import { musicFile } from 'src/main/types'

declare global {
    interface Window {
        electron: ElectronAPI
        api: {
            darkTheme: () => void
            lightTheme: () => void
            minwindow: () => void
            maxwindow: () => void
            closewindow: () => void
            loadFlacFile: () => void
            loadPathFile: () => musicFile[]
            getBufferData: (filePatch: string) => ArrayBuffer
        }
    }
}
