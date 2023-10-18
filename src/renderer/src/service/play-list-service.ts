import { useMusicListStore } from '@renderer/store/modules/music-list-store'
import { tabsList } from '@renderer/types/default'
import { storeToRefs } from 'pinia'

export const playListService = () => {
    const store = useMusicListStore()
    const { tabsList, musicDataList } = storeToRefs(store)

    const setTabList = () => {

        const panelTabList: tabsList[] = []
        const defaultTab: tabsList = {
            id: 0,
            name: 'default',
            data: musicDataList.value!,
        }
        // panelTabList.unshift(defaultTab)
        tabsList.value!.forEach((i) => {
            const tab: tabsList = {
                id: i.rowid!,
                name: i.tabname!,
                data: [],
            }
            musicDataList.value!.forEach((item) => {
                if (item.listID == tab.id) tab.data.push(item)
            })
            panelTabList.push(tab)
        })
        panelTabList.unshift(defaultTab)
        return panelTabList
    }

    return {
        setTabList,
    }
}
