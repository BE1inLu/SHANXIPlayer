<template>
    <n-grid :cols="12">
        <!-- 上一首:未实现 -->
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <Previous16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <!-- 播放/暂停按键 -->
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info" @click="useMusic" :disabled="playList.length == 0">
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
        <!-- 下一首:未实现 -->
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
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
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <ArrowRepeatAll16Filled />
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
    ArrowRepeatAll16Filled,
    TextBulletListLtr16Filled,
    SpeakerMute20Filled,
    Speaker020Filled,
    Speaker120Filled,
    Speaker220Filled,
    Pause16Filled,
} from '@vicons/fluent'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@renderer/store'
import { useMusicService } from '@renderer/service/music-bar-service'
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
} = storeToRefs(store)
const musicLangthValue = ref<number>(0)
const voicePercendTooltip = (val: number) => `${val}%`
const localdata = ref<playListItem>()

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

/**
 * 播放/暂停方法
 */
const useMusic = () => {
    if (localdata.value != undefined) {
        playPause(localdata.value)
    } else {
    }
}

// 想法: val到100时进行下一首播放?
/* TODO:音频条实现 */
const updateLengthValue = (val: number) => {
    musicLangthValue.value = val
    seek(val)
}

/**
 * 这里回传播放的 file
 */
const playListItemData = (data: playListItem) => {
    localdata.value = data
    playPause(data)
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
