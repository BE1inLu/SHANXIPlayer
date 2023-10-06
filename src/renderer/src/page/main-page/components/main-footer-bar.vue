<template>
    <n-grid :cols="9" item-responsive responsive="screen">
        <n-gi span="1 m:2"></n-gi>
        <n-gi span="7 m:5">
            <musicBar />
        </n-gi>
        <n-gi span="1 m:2"></n-gi>
    </n-grid>
</template>
 
<script lang="ts" setup>
import musicBar from '@renderer/components/music-bar.vue';

</script>
<style lang="less"></style>
