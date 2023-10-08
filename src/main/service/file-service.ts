import { dialog } from 'electron'
import fs from 'fs'
import path from 'path'
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

    const loadPathFile = async () => {
        let files: any
        let filePath: any
        await dialog
            .showOpenDialog({
                properties: ['openDirectory'],
                buttonLabel: 'load',
                defaultPath: '',
                title: 'load file',
            })
            .then((res) => {
                filePath = res.filePaths[0]
            })

        files = fs.readdirSync(filePath, {
            encoding: 'utf-8',
        })

        for (const file of files) {
            const localFilePath = path.join(filePath, file)

            const stat = fs.statSync(localFilePath)
            const bufferfile = fs.readFileSync(localFilePath)

            console.log(file)
            console.log(bufferfile)
            console.log(stat)
            console.log(file)
            console.log(localFilePath)
        }
    }

    return { loadFlacFile, loadPathFile }
}
