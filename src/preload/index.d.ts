import { ElectronAPI } from '@electron-toolkit/preload'
import type { configItem, musicFile, musicFileExt } from 'src/main/types'

declare global {
    interface Window {
        electron: ElectronAPI
        api: {
            darkTheme: () => void
            lightTheme: () => void
            minwindow: () => void
            maxwindow: () => void
            closewindow: () => void
            file: {
                loadFlacFile: () => void
                loadPathFile: () => musicFile[]
                getBufferData: (filePatch: string) => ArrayBuffer
            }
            db: {
                readConfigTable: () => configItem[]
                readMusicDataTable: () => musicFileExt[]
                updateConfigItem: (configname: string, value: string) => boolean
                insertMusicDataItem: (data: musicFileExt) => boolean
                insertManyMusicData: (data: musicFileExt[]) => boolean
            }
        }
    }
}
