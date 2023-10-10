<script setup lang="ts">
import mainPage from './page/main-page/index.vue'
import { darkTheme } from 'naive-ui'
import { useStore } from './store'
import { computed } from 'vue'

const store = useStore()

let theme = computed(() => {
    return store.getTheme() ? darkTheme : null
})
</script>

<template>
    <n-config-provider :theme="theme">
        <main-page />
    </n-config-provider>
</template>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}
</style>
