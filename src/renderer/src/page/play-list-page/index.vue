<template>
    <div>
        <n-button @click="useAddPlaylist">add playList</n-button>
    </div>
</template>

<script lang="ts" setup>
import { musicPlayListService } from '@renderer/service/play-file-service'

const { playListAdd } = musicPlayListService()

const useAddPlaylist = () => {
    playListAdd(window.api)
}
</script>
<style lang="less"></style>
