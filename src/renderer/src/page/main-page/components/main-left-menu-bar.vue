<template>
    <n-layout-sider class="main-left-nav" bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="240"
        :native-scrollbar="false">
        <div class="menu-bar">
            <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
            <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="settingOptions" />
        </div>
    </n-layout-sider>
</template>
 
<script lang="ts" setup>

const settingOptions = [
    {
        label: 'setting',
        key: 'hear-the-wind-sing',
    },
]


const menuOptions = [
    {
        label: 'table1',
        key: 'key1',
    },
    {
        label: 'table2',
        key: 'key2',
    },
    {
        label: 'table3',
        key: 'key3',
    },
    {
        label: 'table4',
        key: 'key4',
    },
]

</script>
<style lang="less">
.menu-bar {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-around;
}
</style>
