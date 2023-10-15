<template>
    <n-grid :cols="12">
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <Previous16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info" @click="useMusic">
                <template #icon>
                    <n-icon v-if="musicStatus">
                        <Play12Filled />
                    </n-icon>
                    <n-icon v-else>
                        <Pause16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <Next16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <n-gi span="6" class="long-group">
            <n-space vertical>
                <n-slider
                    v-model:value="musicLangthValue"
                    :max="musicBarLength"
                    :on-update:value="updateLengthValue"
                    disabled
                />
            </n-space>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <ArrowRepeatAll16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-popconfirm :positive-text="null" :negative-text="null">
                <template #icon>
                    <n-icon>
                        <Speaker216Filled />
                    </n-icon>
                </template>
                <template #trigger>
                    <n-button strong secondary circle size="small" type="info">
                        <template #icon>
                            <n-icon>
                                <Speaker216Filled />
                            </n-icon>
                        </template>
                    </n-button>
                </template>
                <n-slider
                    v-model:value="musicVoice"
                    class="slider-style"
                    :format-tooltip="voicePercendTooltip"
                    :on-update:value="updatedValue"
                />
            </n-popconfirm>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info" @click="showNote">
                <template #icon>
                    <n-icon>
                        <TextBulletListLtr16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
    </n-grid>

    <musicPlayList @emit-data="playListItemData" @emit-addlist="playListAdd" />
</template>

<script lang="ts" setup>
import musicPlayList from './music-playlist.vue'
import {
    Play12Filled,
    Next16Filled,
    Previous16Filled,
    ArrowRepeatAll16Filled,
    TextBulletListLtr16Filled,
    Speaker216Filled,
    Pause16Filled,
} from '@vicons/fluent'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@renderer/store'
import { musicBarService } from '@renderer/service/music-bar-service'
import type { musicFile } from '@renderer/types/default'

const { play, setVoice, playListAdd, suspend, resume } = musicBarService(window)

const store = useMusicStore()
const { musicVoice, musicBarLength, musicStatus } = storeToRefs(store)
const musicLangthValue = ref<number>(0)
const voicePercendTooltip = (val: number) => `${val}%`


const updatedValue = (value: number) => {
    musicVoice.value = value
    setVoice(musicVoice.value!)
}

const useMusic = () => {
    musicStatus.value = !musicStatus.value
    musicStatus.value ? suspend() : resume
}

// 想法: val到100时进行下一首播放?
/* TODO:音频条实现 */
const updateLengthValue = (val: number) => {
    musicLangthValue.value = val
}

const playListItemData = (data: musicFile) => {
    play(data)
}

const showNote = () => {
    store.changePlayList()
}
</script>
<style lang="less" scoped>
@import '../assets/css/defaultCommon.less';

.n-grid {
    height: @defaultFooter;

    .local-group {
        height: @defaultFooter;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .long-group {
        height: @defaultFooter;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

.slider-style {
    width: 100px;
}
</style>
@renderer/service/music-bar-service
