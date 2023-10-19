import { useMusicListStore } from '@renderer/store/modules/music-list-store'
import { tabsList } from '@renderer/types/default'
import { storeToRefs } from 'pinia'

export const playListService = () => {
    const store = useMusicListStore()
    const { tabsList, musicDataList, panalTabsList } = storeToRefs(store)

    const setTabList = async () => {
        await getData()
    }

    const getData = async () => {
        tabsList.value = await window.api.db.readNewTabsData()
    }

    return {
        setTabList,
        getData,
    }
}
