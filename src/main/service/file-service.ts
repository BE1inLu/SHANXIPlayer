import { dialog } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { musicFile } from '../types'
export const fileControl = () => {
    const loadFlacFile = async () => {
        let loadData
        await dialog
            .showOpenDialog({
                filters: [
                    { name: 'Flac', extensions: ['flac'] },
                    { name: 'All Files', extensions: ['*'] },
                ],
                buttonLabel: 'load',
                defaultPath: '',
                title: 'load file',
            })
            .then((res) => {
                loadData = fs.readFileSync(res.filePaths[0])
            })
            .catch((err) => {
                console.error(err)
                return
            })
        return loadData
    }

    /**
     * 读取用户选择的目录下全部文件信息
     * @returns
     */
    const loadPathFileInfo = async () => {
        const filelist: musicFile[] = []
        const filePath = await dialog
            .showOpenDialog({
                properties: ['openDirectory'],
                buttonLabel: 'load',
                defaultPath: '',
                title: 'load file',
            })
            .then((res) => {
                return res.filePaths[0]
            })

        const files = fs.readdirSync(filePath, {
            encoding: 'utf-8',
        })

        for (const file of files) {
            const localFilePath = path.join(filePath, file)

            const stat = fs.statSync(localFilePath)

            const fileExt = file.split('.')[1]

            const isCheckext = (fileExt: string) => {
                return fileExt == 'flac' || fileExt == 'wav' || fileExt == 'mp3'
            }

            if (isCheckext(fileExt)) {
                const localfile: musicFile = {
                    fileid: stat.ino,
                    name: file.split('.')[0],
                    ext: fileExt,
                    url: localFilePath,
                    length: undefined,
                }
                filelist.push(localfile)
            }
        }
        return filelist
    }

    const getFileBufferData = (filePath: string) => {
        return fs.readFileSync(filePath).buffer
    }

    return { loadFlacFile, loadPathFileInfo, getFileBufferData }
}
