import { musicFileExt, tabInfo } from "@main/types";
import { tabsList } from "@renderer/types/default";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMusicListStore=defineStore('musicListStore',()=>{

    const tabsList=ref<tabInfo[]>()
    const musicDataList=ref<musicFileExt[]>()
    const panalTabsList=ref<tabsList[]>()

    return{
        tabsList,
        musicDataList,
        panalTabsList
    }


})
