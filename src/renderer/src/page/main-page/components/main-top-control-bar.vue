<template>
    <n-grid :cols="10" item-responsive responsive="screen">
        <n-gi span="8 m:9" class="drag"></n-gi>
        <n-gi span="2 m:1" class="no-drag">
            <div class="button-group">

                <n-button secondary circle size="tiny" @click="darkModeChange()">
                    <template #icon>
                        <n-icon v-if="darkModeVal">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 16 16">
                                <g fill="none">
                                    <path
                                        d="M8 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 1zm0 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6zm6.5-2.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1zM8 13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 13zM2.5 8.5a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1h1zm.646-5.354a.5.5 0 0 1 .708 0l1 1a.5.5 0 1 1-.708.708l-1-1a.5.5 0 0 1 0-.708zm.708 9.708a.5.5 0 1 1-.708-.707l1-1a.5.5 0 0 1 .708.707l-1 1zm9-9.708a.5.5 0 0 0-.708 0l-1 1a.5.5 0 0 0 .708.708l1-1a.5.5 0 0 0 0-.708zm-.708 9.708a.5.5 0 0 0 .708-.707l-1-1a.5.5 0 0 0-.708.707l1 1z"
                                        fill="currentColor"></path>
                                </g>
                            </svg>
                        </n-icon>
                        <n-icon v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 16 16">
                                <g fill="none">
                                    <path
                                        d="M7.456 2a6 6 0 1 1-5.406 8.605a.5.5 0 0 1 .36-.71c1.276-.231 3.278-.937 4.078-3.07c.563-1.5.512-3.015.283-4.23a.5.5 0 0 1 .475-.591C7.316 2 7.386 2 7.456 2z"
                                        fill="currentColor"></path>
                                </g>
                            </svg>
                        </n-icon>
                    </template>
                </n-button>

                <n-divider vertical />

                <n-button secondary circle type="success" size="tiny" id="minbtn" @click="windowControl.minwindow">
                    <template #icon>
                        <n-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 24 24">
                                <path d="M7 19h10c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1z"
                                    fill="currentColor"></path>
                            </svg>
                        </n-icon>
                    </template>
                </n-button>

                <n-button secondary circle type="warning" size="tiny" id="maxMinbtn" @click="windowControl.maxwindow">
                    <template #icon>
                        <n-icon v-if="maxMinMode">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 20 20">
                                <g fill="none">
                                    <path
                                        d="M3 5.25A2.25 2.25 0 0 1 5.25 3h1.865a.75.75 0 1 1 0 1.5H5.25a.75.75 0 0 0-.75.75v1.865a.75.75 0 1 1-1.5 0V5.25zm9.135-1.5a.75.75 0 0 1 .75-.75h1.865A2.25 2.25 0 0 1 17 5.25v1.865a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 0-.75-.75h-1.865a.75.75 0 0 1-.75-.75zM3.75 12.135a.75.75 0 0 1 .75.75v1.865c0 .414.336.75.75.75h1.865a.75.75 0 0 1 0 1.5H5.25A2.25 2.25 0 0 1 3 14.75v-1.865a.75.75 0 0 1 .75-.75zm12.5 0a.75.75 0 0 1 .75.75v1.865A2.25 2.25 0 0 1 14.75 17h-1.865a.75.75 0 0 1 0-1.5h1.865a.75.75 0 0 0 .75-.75v-1.865a.75.75 0 0 1 .75-.75z"
                                        fill="currentColor"></path>
                                </g>
                            </svg>
                        </n-icon>
                        <n-icon v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 32 32">
                                <path d="M4 18v2h6.586L2 28.582L3.414 30L12 21.414V28h2V18H4z" fill="currentColor">
                                </path>
                                <path d="M30 3.416L28.592 2L20 10.586V4h-2v10h10v-2h-6.586L30 3.416z" fill="currentColor">
                                </path>
                            </svg>
                        </n-icon>
                    </template>
                </n-button>

                <n-button secondary circle type="error" size="tiny" @click="windowControl.closewindow"
                    style="margin-right: 5px;">
                    <template #icon>
                        <n-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512 512">
                                <path
                                    d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z"
                                    fill="currentColor"></path>
                            </svg>
                        </n-icon>
                    </template>
                </n-button>

            </div>
        </n-gi>
    </n-grid>
</template>
 
<script lang="ts" setup> 
import { useStore } from '@renderer/store';
import { ref } from 'vue'

const maxMinMode = ref<boolean>(true)
const darkModeVal = ref<boolean>(true)
let store = useStore()

const darkModeChange = () => {
    darkModeVal.value = !darkModeVal.value
    store.changheTheme()
    darkModeVal.value ? window.api.darkTheme() : window.api.lightTheme()
}


const windowControl = {
    minwindow: () => {
        window.api.minwindow();
    },
    maxwindow: () => {
        maxMinMode.value = !maxMinMode.value
        window.api.maxwindow();
    },
    closewindow: () => {
        window.api.closewindow();
    }
}


</script>
<style lang="less" scoped>
.n-grid {
    padding-top: 5px;
}

.button-group {

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .n-button {
        -webkit-app-region: no-drag;
    }

}

.no-drag {
    -webkit-app-region: no-drag;
}

.drag {
    -webkit-app-region: drag;
}
</style>
