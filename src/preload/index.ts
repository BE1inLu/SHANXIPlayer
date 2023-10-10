import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

/* TODO: api 调整 */
const api = {
    darkTheme: () => ipcRenderer.invoke('dark-mode'),
    lightTheme: () => ipcRenderer.invoke('light-mode'),
    minwindow: () => ipcRenderer.send('min-window'),
    maxwindow: () => ipcRenderer.send('max-window'),
    closewindow: () => ipcRenderer.send('close-window'),
    loadFlacFile:()=>ipcRenderer.invoke('open-flac-file'), 
    loadPathFile:()=>ipcRenderer.invoke('load-path-file'), 
    getBufferData:(filePath:string)=>ipcRenderer.invoke('get-file-buffer-data',filePath)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
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
