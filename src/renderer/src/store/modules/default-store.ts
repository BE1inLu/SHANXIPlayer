import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const darkmodeStore = ref<boolean>(true)
    const musicPlayListStore = ref<boolean>(false)

    const changheTheme = () => {
        darkmodeStore.value = !darkmodeStore.value
    }

    const getTheme = () => {
        return darkmodeStore.value
    }

    const changePlayList = () => {
        musicPlayListStore.value = !musicPlayListStore.value
    }

    const getPlayListStore = () => {
        return musicPlayListStore.value
    }

    return {
        darkmodeStore,
        musicPlayListStore,
        changheTheme,
        getTheme,
        changePlayList,
        getPlayListStore,
    }
})
