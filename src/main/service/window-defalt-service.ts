import { BrowserWindow, ipcMain } from 'electron'

/**
 * 基础窗口操作方法
 * @returns
 */
export const windowControl = () => {
    const minWindow = (window: BrowserWindow) => {
        ipcMain.on('main-window', () => {
            window.minimize()
        })
    }
    const maxWindow = (window: BrowserWindow) => {
        ipcMain.on('max-window', () => {
            window.isMaximized() ? window.restore() : window.maximize()
        })
    }
    const closeWindow = (window: BrowserWindow) => {
        ipcMain.on('close-window', () => {
            window.close()
        })
    }
    /**
     * 执行基础窗口声明
     * @param window 
     */
    const execWindowControl = (window: BrowserWindow) => {
        minWindow(window)
        maxWindow(window)
        closeWindow(window)
    }
    return { execWindowControl }
}
