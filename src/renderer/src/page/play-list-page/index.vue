<template>
    <div>
        <n-button @click="test">clickme</n-button>
    </div>
</template>

<script lang="ts" setup>

const test=async()=>{
    await window.api.loadPathFile()
}

</script>
<style lang="less"></style>
