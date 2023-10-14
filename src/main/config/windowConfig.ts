import { join } from 'path'

export const WINDOWCONFIG = (icon: string) => {
    return {
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 800,
        show: false,
        frame: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
        },
    }
}
