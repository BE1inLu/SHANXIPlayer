<template>
    <n-layout class="main-comp">
        <n-layout-header class="main-header">
            <windowControlBar />
        </n-layout-header>
        <n-layout-header class="main-nav-header">
            <span>
                我是菜单我是菜单我是菜单我是菜单我是菜单</span>
        </n-layout-header>
        <n-layout has-sider>
            <n-layout-sider class="main-left-nav" content-style="padding: 24px;">
                海淀桥
            </n-layout-sider>
            <n-layout-content class="main-content-view" content-style="padding: 24px;">
                平山道
            </n-layout-content>
        </n-layout>
        <n-layout-footer class="main-footer">成府路</n-layout-footer>
    </n-layout>
</template>
 
<script lang="ts" setup>
import windowControlBar from './components/window-control-bar.vue';

</script>
<style lang="less" scoped>
@import '../../assets/css/mainstyle.less';
</style>
