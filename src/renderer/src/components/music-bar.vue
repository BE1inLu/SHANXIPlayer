<template>
    <n-grid :cols="12">
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <Previous16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <Play12Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <Next16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <n-gi span="6" class="long-group">
            <n-space vertical>
                <n-slider v-model:value="value" :step="1" />
            </n-space>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <ArrowRepeatAll16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <Speaker216Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info" @click="showNote">
                <template #icon>
                    <n-icon>
                        <TextBulletListLtr16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-gi>
    </n-grid>

    <n-drawer v-model:show="show" :width="380">
        <n-drawer-content title="PlayList" :native-scrollbar="false">
            <n-data-table :columns="column" :data="data" :pagination="false" :bordered="false" />
        </n-drawer-content>
    </n-drawer>
</template>

<script lang="ts" setup>
import {
    Play12Filled,
    Next16Filled,
    Previous16Filled,
    ArrowRepeatAll16Filled,
    TextBulletListLtr16Filled,
    Speaker216Filled,
    Delete20Filled,
} from '@vicons/fluent'
import { ref, h } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NIcon } from 'naive-ui'

const value = ref(0)

const show = ref(false)

const showNote = () => {
    show.value = !show.value
}

type Song = {
    no: number
    title: string
    length: string
}

const data: Song[] = [
    { no: 1, title: 'title1', length: '4:18' },
    { no: 2, title: 'title2', length: '4:48' },
    { no: 3, title: 'Champagne Supernova11111111111111111111111', length: '7:27' },
]

const column: DataTableColumns<Song> = [
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
<style lang="less" scoped>
@import '../assets/css/defaultCommon.less';

.n-grid {
    height: @defaultFooter;

    .local-group {
        height: @defaultFooter;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .long-group {
        height: @defaultFooter;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
