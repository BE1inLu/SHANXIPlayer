import fs from 'fs'

export const useUtil = () => {
    /** 判断文件是否存在 */
    const checkFilePath = (path: string) => {
        return fs.existsSync(path)
    }

    /** 创建文件 */
    const createFile = (path: string) => {
        fs.openSync(path, 'w')
    }

    return { checkFilePath, createFile }
}
