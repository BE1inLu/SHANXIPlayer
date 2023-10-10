<template>
    <div>
        <n-button @click="useAddPlaylist">add playList</n-button>
    </div>
</template>

<script lang="ts" setup>
import { musicService } from '@renderer/service/music'

const { playListAdd } = musicService(window.api)

const useAddPlaylist = () => {
    playListAdd(window.api)
}
</script>
<style lang="less"></style>
