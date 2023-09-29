<script setup lang="ts">
import mainPage from './page/main-page/index.vue'
import { darkTheme } from 'naive-ui'
</script>

<template>
    <n-config-provider :theme="darkTheme">
        <main-page />
    </n-config-provider>
</template>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}
</style>
