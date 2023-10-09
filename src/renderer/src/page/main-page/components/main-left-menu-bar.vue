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

const setLabel = (path: string, barName: string) => {
    return () => h(RouterLink, {
        to: {
            path: path
        }
    }, { default: () => barName })
}

const settingOptions: MenuOption[] = [
    {
        label: 'setting',
        key: 'setting',
        icon: renderIcon(Settings24Filled),
        children: [
            {
                label: setLabel('/pianopage', '彩蛋'),
                key: 'key-1',
            }
        ]
    },
]

const menuOptions: MenuOption[] = [
    {
        label: setLabel('/mainpage', 'Home'),
        key: 'key1',
        icon: renderIcon(Home12Filled)
    },
    {
        label: setLabel('/orderpage', 'Order'),
        key: 'key2',
        icon: renderIcon(Search12Regular)
    },
    {
        label: () => h(RouterLink, {
            to: {
                path: '/playlistpage'
            }
        }, { default: () => 'playlist' }),
        key: 'key3',
        icon: renderIcon(TextBulletListLtr20Filled)
    },
    {
        label: 'table4',
        key: 'key4',
        icon: renderIcon(Document20Regular)
    },
]

const updateValue = () => {
}

</script>
<style lang="less" scoped>
@import '../../../assets/css/defaultCommon.less';

.menu-bar {
    height: @defaultHeight;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
