<template>
    <n-layout-sider class="main-left-nav" bordered :collapsed="true" collapse-mode="width" :collapsed-width="64"
        :width="240" :native-scrollbar="false">
        <div class="menu-bar">
            <n-menu id="flag-menu" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
                @update:value="updateValue" :watch-props="['defaultValue']" />
            <n-menu id="flag-menu" :collapsed-width="64" :collapsed-icon-size="22" :options="settingOptions"
                @update:value="updateValue" />
        </div>
    </n-layout-sider>
</template>
 
<script lang="ts" setup>

import { h, Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
    Settings24Filled,
    Home12Filled,
    TextBulletListLtr20Filled,
    Document20Regular,
    Search12Regular
} from '@vicons/fluent'
import { RouterLink } from 'vue-router'

const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const settingOptions: MenuOption[] = [
    {
        label: 'setting',
        key: 'setting',
        icon: renderIcon(Settings24Filled)
    },
]

const menuOptions: MenuOption[] = [
    // {
    //     label: 'open',
    //     key: 'open',
    //     icon: renderIcon(TextAlignJustify20Filled)
    // },
    {
        label: () => h(RouterLink, {
            to: {
                path: '/mainpage'
            }
        }, { default: () => 'Home' }),
        key: 'key1',
        icon: renderIcon(Home12Filled)
    },
    {
        label: () => h(RouterLink, {
            to: {
                path: '/orderpage'
            }
        }, { default: () => 'Order' }),
        key: 'key2',
        icon: renderIcon(Search12Regular)
    },
    {
        label: 'table3',
        key: 'key3',
        icon: renderIcon(TextBulletListLtr20Filled)
    },
    {
        label: 'table4',
        key: 'key4',
        icon: renderIcon(Document20Regular)
    },
]

const updateValue = (key: string, item: MenuOption) => {
    console.info('key: ' + key);
    console.info(item);
}

</script>
<style lang="less" scoped>
.menu-bar {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
