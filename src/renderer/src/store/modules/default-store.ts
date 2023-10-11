import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const darkmodeStore = ref<boolean>(true)

    const changheTheme = () => {
        darkmodeStore.value = !darkmodeStore.value
    }

    const getTheme = () => {
        return darkmodeStore.value
    }

    return {
        darkmodeStore,
        changheTheme,
        getTheme,
    }
})
