import { join } from 'path'

export const WINDOWCONFIG = (icon: any) => {
    return {
        width: 800,
        height: 600,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
        },
    }
}
