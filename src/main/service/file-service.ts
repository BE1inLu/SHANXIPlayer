import { dialog } from 'electron'
import fs from 'fs'
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

    return { loadFlacFile }
}
