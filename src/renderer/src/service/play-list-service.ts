import { useMusicListStore } from '@renderer/store/modules/music-list-store'

import { storeToRefs } from 'pinia'

export const playListService = () => {
    const store = useMusicListStore()
    const { tabsList, musicDataList } = storeToRefs(store)

    const getData = async () => {
        tabsList.value = await window.api.db.readNewTabsData()
        musicDataList.value = await window.api.db.readMusicDataTable()
    }

    const getTabsUUID = (name: string) => {
        const row = tabsList.value!.filter((i) => i.tabname == name)
        let uuid
        row.forEach((i) => {
            uuid = i.uuid
        })
        return uuid
    }

    return {
        getData,
        getTabsUUID,
    }
}
