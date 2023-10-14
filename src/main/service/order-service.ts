import type { musicFileExt } from '@main/types'
import { fileControl } from './file-service'
import { insertManyMusicData } from '../data/db-control'
export const orderService = () => {
    const { loadPathFileInfo } = fileControl()

    const testfunc = async () => {
        const extFileList: musicFileExt[] = await loadPathFileInfo()

        /* 批量写入数据库 */
        const res = await insertManyMusicData(extFileList)
        console.log(res);
        return extFileList
    }

    const isCheckExt = (fileExt: string) => {
        return fileExt == 'flac' || fileExt == 'wav' || fileExt == 'mp3'
    }

    return { testfunc }
}
