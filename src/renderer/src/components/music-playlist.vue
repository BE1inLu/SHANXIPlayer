<template>
    <n-drawer v-model:show="musicPlayListStore" :width="380">
        <n-drawer-content title="PlayList" :native-scrollbar="false">
            <n-data-table :columns="column" :data="data" :pagination="false" :bordered="false" />
        </n-drawer-content>
    </n-drawer>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NIcon } from 'naive-ui'
import { Delete20Filled } from '@vicons/fluent'
import { useStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import type { playList } from '@renderer/types/default.d.ts'

const store = useStore()
const { musicPlayListStore } = storeToRefs(store)

const data: playList[] = [
    { no: 1, title: 'title1', length: '4:18' },
    { no: 2, title: 'title2', length: '4:48' },
    { no: 3, title: 'Champagne Supernova11111111111111111111111', length: '7:27' },
]

const column: DataTableColumns<playList> = [
    {
        title: 'No',
        key: 'no',
        width: 20,
    },
    {
        title: 'Title',
        key: 'title',
        width: 70,
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Length',
        key: 'length',
        width: 30,
    },
    {
        title: '',
        key: 'action',
        width: 20,
        render: (row) => {
            return h(NButton, {
                size: 'tiny',
                quaternary: true,
                circle: true,
                type: 'error',
                'render-icon': () => {
                    return h(NIcon, null, {
                        default: () => h(Delete20Filled),
                    })
                },
                onClick: () => {
                    console.log(row)
                },
            })
        },
    },
]
</script>
<style lang="less" scoped></style>
@renderer/types/default
