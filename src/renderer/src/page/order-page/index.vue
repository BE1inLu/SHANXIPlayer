<template>
    <span>
        <n-button @click="getFlacFile">btn1</n-button>

        <n-button @click="start">start</n-button>
        <n-button @click="stop">stop</n-button>
    </span>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'

const flacData = ref()
const context = new AudioContext();
const source = context.createBufferSource()

const getFlacFile = async () => {
    let loadData = await window.api.loadFlacFile()
    flacData.value = loadData

    context.decodeAudioData(flacData.value.buffer).then((buffer) => {
        source.buffer = buffer
        source.connect(context.destination)
    })
}

const start = () => {
    source.start(0)
}

const stop = () => {
    source.stop(0)
}

</script>
<style lang="less" scoped></style>
