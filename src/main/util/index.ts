import { dialog } from 'electron'
import { readFileSync } from 'fs'
export const util = () => {
    const showWindowDialog = async (
        filters: Electron.FileFilter[],
        title: string,
        properties?: any,
    ) => {
        await dialog
            .showOpenDialog({
                filters: filters,
                buttonLabel: 'Load',
                defaultPath: '',
                title: title,
                properties: properties,
            })
            .then((res) => {
                return res.filePaths[0]
            })
    }

    const getBufferData = (filePath: string) => {
        return readFileSync(filePath)
    }

    return { showWindowDialog, getBufferData }
}
