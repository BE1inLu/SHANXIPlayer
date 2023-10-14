import { BrowserWindow, ipcMain } from 'electron'
import { windowControl } from '../service/window-defalt-service'
import { fileControl } from '../service/file-service'
import { procdb, readConfigTable, updateConfigItem } from '../data/db-control'
export function loader(window: BrowserWindow) {
    windowControl().execWindowControl(window)
    const { loadFlacFile, loadPathFileInfo, getFileBufferData } = fileControl()
    ipcMain.handle('open-flac-file', loadFlacFile)
    ipcMain.handle('load-path-file', loadPathFileInfo)
    ipcMain.handle('get-file-buffer-data', (_event, filePatch: string) => {
        return getFileBufferData(filePatch)
    })

    procdb()

    ipcMain.handle('read-config-table', async () => {
        const result = await readConfigTable()
        return result
    })

    ipcMain.handle('update-config-item', async (_event, configname: string, value: string) => {
        const result = await updateConfigItem(configname, value)
        return result
    })
}
