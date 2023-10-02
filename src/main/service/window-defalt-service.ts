import { BrowserWindow, ipcMain, nativeTheme } from 'electron'

/**
 * 基础窗口操作方法
 * @returns
 */
export const windowControl = () => {
    const minWindow = (window: BrowserWindow) => {
        ipcMain.on('min-window', () => {
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

    const windowDarkMode = () => {
        ipcMain.handle('dark-mode', () => {
            nativeTheme.themeSource = 'dark'
        })
        ipcMain.handle('light-mode', () => {
            nativeTheme.themeSource = 'light'
        })

        return
    }

    /**
     * 执行基础窗口方法
     * @param window
     */
    const execWindowControl = (window: BrowserWindow) => {
        windowDarkMode()
        minWindow(window)
        maxWindow(window)
        closeWindow(window)
    }
    return { execWindowControl }
}
