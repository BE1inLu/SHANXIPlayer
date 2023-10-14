import { BrowserWindow, ipcMain } from 'electron'
import { windowControl } from '../service/window-defalt-service'
import { fileControl } from '../service/file-service'
export function loader(window: BrowserWindow) {

    windowControl().execWindowControl(window)
    const { loadFlacFile, loadPathFileInfo, getFileBufferData } = fileControl()
    ipcMain.handle('open-flac-file', loadFlacFile)
    ipcMain.handle('load-path-file', loadPathFileInfo)
    ipcMain.handle('get-file-buffer-data', (_event, filePatch: string) => {
        return getFileBufferData(filePatch)
    })

    

}
