import { musicFile } from '@renderer/types/default'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const darkmodeStore = ref<boolean>(true)
    const switchMusicPlayList = ref<boolean>(false)
    const musicPlayList = ref<musicFile[]>([])
    const musicBarLength = ref<number>()
    const musicVoice = ref<number>(10)
    const musicOrderData = ref()
    const musicStatus = ref<boolean>(true)

    const setMusicPlayList = (musicList: musicFile[]) => {
        let localList: musicFile[] = []

        if (!musicPlayList.value) {
            localList = musicPlayList.value
            localList.concat(musicList)
            musicPlayList.value = localList
        } else {
            localList = musicList
        }
        musicPlayList.value = localList
    }

    const clearMusicPlayListItem = (item: musicFile) => {
        musicPlayList.value = musicPlayList.value.filter((i) => {
            return i !== item
        })
    }

    const clearMusicPlayList = () => {
        musicPlayList.value = []
    }

    const addPlayList = (list: musicFile[]) => {
        list.forEach((i) => {
            musicPlayList.value.push(i)
        })
    }

    const changheTheme = () => {
        darkmodeStore.value = !darkmodeStore.value
    }

    const getTheme = () => {
        return darkmodeStore.value
    }

    const changePlayList = () => {
        switchMusicPlayList.value = !switchMusicPlayList.value
    }

    const getPlayListStore = () => {
        return switchMusicPlayList.value
    }

    return {
        musicStatus,
        musicOrderData,
        musicVoice,
        musicBarLength,
        musicPlayList,
        darkmodeStore,
        switchMusicPlayList,
        changheTheme,
        getTheme,
        changePlayList,
        getPlayListStore,
        setMusicPlayList,
        addPlayList,
        clearMusicPlayList,
        clearMusicPlayListItem,
    }
})
