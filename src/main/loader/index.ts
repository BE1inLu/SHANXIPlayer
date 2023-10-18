import { BrowserWindow, ipcMain } from 'electron'
import { windowControl } from '../service/window-defalt-service'
import { fileControl } from '../service/file-service'
import {
    deleteMusicDataItem,
    deleteTabsItem,
    insertManyMusicData,
    insertMusicDataTable,
    insertTabsItem,
    procdb,
    readConfigTable,
    readMusicDataTable,
    readTabsTable,
    updateConfigItem,
    updateTabsItem,
} from '../data/db-control'
import type { musicFileExt } from '../types'
import { orderService } from '../service/order-service'
export function loader(window: BrowserWindow) {
    windowControl().execWindowControl(window)
    const { loadFlacFile, loadPathFileInfo, getFileBufferData } = fileControl()
    const { loadPathFileAndAddMusicData } = orderService()
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

    ipcMain.handle('update-config-item', async (_, configname: string, value: string) => {
        const result = await updateConfigItem(configname, value)
        return result
    })

    ipcMain.handle('insert-musicdata-item', async (_, data: musicFileExt) => {
        const result = await insertMusicDataTable(data)
        return result
    })

    ipcMain.handle('insert-many-musicdata', async (_, data: musicFileExt[]) => {
        const res = await insertManyMusicData(data)
        return res
    })

    ipcMain.handle('read-musicdata-table', async () => {
        const res = await readMusicDataTable()
        return res
    })

    ipcMain.handle('delete-musicdata-item', async (_, data: musicFileExt) => {
        const res = await deleteMusicDataItem(data)
        return res
    })

    ipcMain.handle('test-a', async () => {
        const res = await loadPathFileAndAddMusicData()
        return res
    })

    ipcMain.handle('read-tabs-table', async () => {
        return await readTabsTable()
    })

    ipcMain.handle('insert-tab-item', async (_, tabname: string) => {
        return await insertTabsItem(tabname)
    })

    ipcMain.handle('update-tab-item', async (_, tabname: string, uuid: string) => {
        return await updateTabsItem(tabname, uuid)
    })

    ipcMain.handle('delete-tab-table', async (_, uuid: string) => {
        return await deleteTabsItem(uuid)
    })
}
