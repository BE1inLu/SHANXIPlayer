import { dialog } from 'electron'
import { readFileSync } from 'fs'
export const util = () => {

    const getBufferData = (filePath: string) => {
        return readFileSync(filePath).buffer
    }

    return { getBufferData }
}
