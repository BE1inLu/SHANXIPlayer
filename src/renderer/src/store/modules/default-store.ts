import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const darkmode = ref<boolean>(true)

    const changheTheme = () => {
        darkmode.value = !darkmode.value
    }

    const getTheme = () => {
        return darkmode.value
    }

    return { changheTheme, getTheme }
})
