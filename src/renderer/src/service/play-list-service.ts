import { useMusicListStore } from '@renderer/store/modules/music-list-store'

import { storeToRefs } from 'pinia'

export const playListService = () => {
    const store = useMusicListStore()
    const { tabsList } = storeToRefs(store)

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
