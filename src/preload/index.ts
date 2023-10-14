import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { musicFileExt } from '@main/types'

/* TODO: api 调整 */
const api = {
    darkTheme: () => ipcRenderer.invoke('dark-mode'),
    lightTheme: () => ipcRenderer.invoke('light-mode'),
    minwindow: () => ipcRenderer.send('min-window'),
    maxwindow: () => ipcRenderer.send('max-window'),
    closewindow: () => ipcRenderer.send('close-window'),
    file: {
        loadFlacFile: () => ipcRenderer.invoke('open-flac-file'),
        loadPathFile: () => ipcRenderer.invoke('load-path-file'),
        getBufferData: (filePath: string) => ipcRenderer.invoke('get-file-buffer-data', filePath),
    },
    db: {
        readConfigTable: () => ipcRenderer.invoke('read-config-table'),
        readMusicDataTable: () => ipcRenderer.invoke('read-musicdata-table'),
        updateConfigItem: (configname: string, value: string) =>
            ipcRenderer.invoke('update-config-item', configname, value),
        insertMusicDataItem: (data: musicFileExt) =>
            ipcRenderer.invoke('insert-musicdata-item', data),
        insertManyMusicData: (data: musicFileExt[]) => {
            ipcRenderer.invoke('insert-many-musicdata', data)
        },
        deleteMusicDataItem: (data: musicFileExt) => {
            ipcRenderer.invoke('delete-musicdata-item', data)
        },
    },
    test:{
        testfunc1:()=>ipcRenderer.invoke('test-a')
    }
}

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
}
