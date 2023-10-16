import { musicFileExt } from '@main/types'
import type { playListItem } from '@renderer/types/default'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMusicStore = defineStore('musicStore', () => {
    const musicPlayList = ref<playListItem[]>([])
    const switchMusicPlayList = ref<boolean>(false)
    const musicBarLength = ref<number>()
    const musicVoice = ref<number>(10)
    const musicOrderData = ref()
    const musicBarCurrentTime=ref<number>()
    const musicStatus = ref<boolean>(true)
    const musicBarStatus=ref<boolean>(false)

    const clearMusicPlayListItem = (item: playListItem) => {
        musicPlayList.value = musicPlayList.value.filter((i) => {
            return i !== item
        })
    }

    const clearMusicPlayList = () => {
        musicPlayList.value = []
    }

    const addPlayList = (list: musicFileExt[]) => {
        let f = 0
        list.forEach((i) => {
            const localItem: playListItem = {
                no: ++f,
                title: i.name,
                url: i.url,
                ID: i.fileid.toString(),
                statu: false,
                players: null,
            }
            musicPlayList.value.push(localItem)
        })
    }

    const changePlayList = () => {
        switchMusicPlayList.value = !switchMusicPlayList.value
    }

    const getPlayListStore = () => {
        return switchMusicPlayList.value
    }

    return {
        switchMusicPlayList,
        musicBarLength,
        musicPlayList,
        musicVoice,
        musicOrderData,
        musicStatus,
        musicBarStatus,
        musicBarCurrentTime,
        clearMusicPlayListItem,
        clearMusicPlayList,
        addPlayList,
        changePlayList,
        getPlayListStore,
    }
})
