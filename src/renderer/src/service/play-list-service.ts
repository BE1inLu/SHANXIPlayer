import { useMusicListStore } from '@renderer/store/modules/music-list-store'
import { tabsList } from '@renderer/types/default'
import { storeToRefs } from 'pinia'

export const playListService = () => {
    const store = useMusicListStore()
    const { tabsList, musicDataList, panalTabsList } = storeToRefs(store)

    const setTabList = async () => {
        await getData()
        const panelTabList: tabsList[] = []
        const defaultTab: tabsList = {
            id: 0,
            name: 'default',
            data: musicDataList.value!,
        }

        tabsList.value!.forEach((i) => {
            const tab: tabsList = {
                id: i[0],
                name: i[2],
                data: [],
            }
            musicDataList.value!.forEach((item) => {
                if (item[6] == tab.id) {

                    
                    tab.data.push(item)
                }
            })
            panelTabList.push(tab)
        })
        panelTabList.unshift(defaultTab)
        console.log(panelTabList)
        panalTabsList.value = panelTabList
    }

    const getData = async () => {
        tabsList.value = await window.api.db.readTabsTable()
        musicDataList.value = await window.api.db.readMusicDataTable()
    }

    return {
        setTabList,
    }
}
