<template>
    <n-grid :cols="12">
        <!-- 上一首:未实现 -->
        <n-gi span="1" class="local-group">
            <n-button
                strong
                secondary
                circle
                size="small"
                type="info"
                :display="playList.length == 0"
                @click="backPlay"
            >
                <template #icon>
                    <n-icon>
                        <Previous16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <!-- 播放/暂停按键 -->
        <n-gi span="1" class="local-group">
            <n-button
                strong
                secondary
                circle
                size="small"
                type="info"
                @click="useMusic"
                :disabled="playList.length == 0"
            >
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
        <!-- 下一首 -->
        <n-gi span="1" class="local-group">
            <n-button
                strong
                secondary
                circle
                size="small"
                type="info"
                @click="nextPlay"
                :disabled="playList.length == 0"
            >
                <template #icon>
                    <n-icon>
                        <Next16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <!-- 音频条 -->
        <n-gi span="6" class="long-group">
            <n-space vertical>
                <n-slider
                    v-model:value="musicBarCurrentTime"
                    :max="musicBarLength"
                    :on-update:value="updateLengthValue"
                    :disabled="musicBarStatus || playList.length == 0"
                    :format-tooltip="musicLengthTooltip"
                />
            </n-space>
        </n-gi>
        <!-- 播放模式 -->
        <n-gi span="1" class="local-group">
            <n-button
                strong
                secondary
                circle
                size="small"
                type="info"
                @click="playMode"
                :disabled="playList.length == 0"
            >
                <template #icon>
                    <n-icon v-if="musicPlayMode == 0">
                        <ArrowSortDownLines20Filled />
                    </n-icon>
                    <n-icon v-else-if="musicPlayMode == 1">
                        <ArrowRepeatAll20Filled />
                    </n-icon>
                    <n-icon v-else>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 512 512"
                        >
                            <path
                                d="M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596l53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 176h84l52.781 56.551l53.333-57.143l-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <!-- 音量按键 -->
        <n-gi span="1" class="local-group">
            <n-popconfirm :positive-text="null" :negative-text="null">
                <template #icon>
                    <n-icon v-if="musicVoice == 0">
                        <SpeakerMute20Filled />
                    </n-icon>
                    <n-icon v-else-if="musicVoice > 0 && musicVoice < 20">
                        <Speaker020Filled />
                    </n-icon>
                    <n-icon v-else-if="musicVoice >= 20 && musicVoice < 70">
                        <Speaker120Filled />
                    </n-icon>
                    <n-icon v-else>
                        <Speaker220Filled />
                    </n-icon>
                </template>
                <template #trigger>
                    <n-button strong secondary circle size="small" type="info">
                        <template #icon>
                            <n-icon v-if="musicVoice == 0">
                                <SpeakerMute20Filled />
                            </n-icon>
                            <n-icon v-else-if="musicVoice > 0 && musicVoice < 20">
                                <Speaker020Filled />
                            </n-icon>
                            <n-icon v-else-if="musicVoice >= 20 && musicVoice < 70">
                                <Speaker120Filled />
                            </n-icon>
                            <n-icon v-else>
                                <Speaker220Filled />
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
        <!-- 播放列表 -->
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
    TextBulletListLtr16Filled,
    SpeakerMute20Filled,
    Speaker020Filled,
    Speaker120Filled,
    Speaker220Filled,
    ArrowSortDownLines20Filled,
    ArrowRepeatAll20Filled,
    Pause16Filled,
} from '@vicons/fluent'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@renderer/store'
import { useMusicService } from '@renderer/service/music-bar-service'
import { util } from '@renderer/util/util'
import type { playListItem } from '@renderer/types/default'

const { playListAdd, voice, seek, playPause } = useMusicService()
const store = useMusicStore()
const {
    musicVoice,
    musicBarLength,
    musicStatus,
    musicBarStatus,
    musicBarCurrentTime,
    musicPlayList: playList,
    musicPlayMode,
} = storeToRefs(store)
const voicePercendTooltip = (val: number) => `${val}%`
const localData = ref<playListItem>()
const backData = ref<playListItem>()
const { getRandomInt } = util()

const musicLengthTooltip = (val: number) => `${valToMinus(val)}`
const valToMinus = (val: number) => {
    var t = ''
    if (val > -1) {
        var hour = Math.floor(val / 3600)
        var min = Math.floor(val / 60) % 60
        var sec = val % 60
        if (hour < 10) {
            t = '0' + hour + ':'
        } else {
            t = hour + ':'
        }
        if (min < 10) {
            t += '0'
        }
        t += min + ':'
        if (sec < 10) {
            t += '0'
        }
        t += sec.toFixed(0)
    }
    return t
}

/**
 * 音量设置
 * @param value
 */
const updatedValue = (value: number) => {
    musicVoice.value = value
    voice()
}

const playMode = () => {
    store.setMusicPlayMode()
}

/**
 * 播放/暂停方法
 */
const useMusic = () => {
    if (localData.value != undefined) {

        playPause(localData.value)
    } else {
        if (musicPlayMode.value == 0) {
            localData.value=playList.value[0]
            playPause(localData.value)
        }else if(musicPlayMode.value == 2){
            const length = playList.value.length
            localData.value = playList.value[getRandomInt(length)]
            playPause(localData.value)
        }
    }
}

const updateLengthValue = (val: number) => {
    seek(val)
}

/**
 * 这里回传播放的 file
 */
const playListItemData = (data: playListItem) => {
    if (localData.value == undefined) {
        localData.value = data
        playPause(data)
    } else {
        playPause(localData.value)
        backData.value = localData.value
        localData.value = data
        playPause(data)
    }
}

const showNote = () => {
    store.changePlayList()
}

const nextPlay = () => {
    let index = 0
    const length = playList.value.length
    if (localData.value) {
        playPause(localData.value)
        playList.value.indexOf(localData.value)
        if (index++ > length) {
            if (musicPlayMode.value == 2) {
                localData.value = playList.value[getRandomInt(length)]
                playPause(localData.value)
            }
        } else {
            if (musicPlayMode.value == 2) {
                localData.value = playList.value[getRandomInt(length)]
                playPause(localData.value)
            } else if (musicPlayMode.value == 1) {
                localData.value = playList.value[index]
                playPause(localData.value)
            }
        }
    }
}

const backPlay = () => {
    let data
    if (localData.value == undefined || backData.value == undefined) return
    data = localData.value
    playPause(localData.value)
    localData.value = backData.value
    playPause(localData.value)
    backData.value = data
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
