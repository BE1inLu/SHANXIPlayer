import type { musicFileExt, tabInfo } from '@main/types'
import { fileControl } from './file-service'
import { insertManyMusicData, readMusicDataTable, readTabsTable } from '../data/db-control'
export const orderService = () => {
    const { loadPathFileInfo } = fileControl()

    const loadPathFileAndAddMusicData = async () => {
        const extFileList: musicFileExt[] = await loadPathFileInfo()
        /* 批量写入数据库 */
        const res = await insertManyMusicData(extFileList)
        return res
    }

    const loadTabData = async () => {
        const oldmusicdata = await readMusicDataTable()
        const oldtabsData = await readTabsTable()

        const musicdata: musicFileExt[] = []
        const tabsData: tabInfo[] = []
        oldmusicdata.forEach((i) => {
            const data: musicFileExt = {
                uuid: i[0],
                name: i[1],
                fileid: i[2],
                url: i[3],
                ext: i[4],
                tag: i[5],
                rowid: i[6],
                musicLength: i[9] ? i[9] : 0,
            }
            musicdata.push(data)
        })

        let j=0;
        oldtabsData.forEach((i) => {
            j++;
            const data: tabInfo = {
                rowid: j,
                uuid: i[1],
                tabname: i[2],
                data: [],
            }
            tabsData.push(data)
        })

        const defaultTab: tabInfo = {
            rowid: 0,
            tabname: 'default',
            data: musicdata,
        }
        tabsData.unshift(defaultTab)
        tabsData.forEach((i: tabInfo) => {
            if (i.rowid == 0) return
            musicdata.forEach((ii: musicFileExt) => {
                if (i.rowid == ii.rowid) {
                    i.data!.push(ii)
                }
            })
        })

        return tabsData
    }

    /**
     * @todo 新增回传操作
     */
    return { loadPathFileAndAddMusicData, loadTabData }
}
