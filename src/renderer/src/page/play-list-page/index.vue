<template>
    <n-space vertical>
        <n-space justify="end" style="margin-top: 10px; margin-right: 10px">
            <n-button tertiary circle type="info" size="small" @click="switchTag">
                <template #icon>
                    <n-icon>
                        <Settings24Filled />
                    </n-icon>
                </template>
            </n-button>
            <n-button tertiary circle type="info" size="small">
                <template #icon>
                    <n-icon>
                        <FolderAdd20Filled />
                    </n-icon>
                </template>
            </n-button>
            <n-button tertiary circle type="info" size="small">
                <template #icon>
                    <n-icon>
                        <Navigation16Filled />
                    </n-icon>
                </template>
            </n-button>
        </n-space>
        <n-divider style="margin-top: 0; margin-bottom: 0" />
        <n-tabs class="tab-style" size="medium" :type="tagRef" :closable="closable" animated placement="left"
            :addable="addableRef" @add="handleAdd" @close="handleClose">
            <n-tab-pane v-for="item of tabList" :key="item.id" :name="item.name">
                <n-grid x-gap="12" cols="12" item-responsive responsive="screen">
                    <n-gi span="1 m:2"></n-gi>
                    <n-gi span="10 m:8">
                        <n-data-table :columns="columns" max-height="70vh" :data="item.data" :pagination="false"
                            :bordered="false">
                        </n-data-table>
                    </n-gi>
                    <n-gi span="1 l:2"></n-gi>
                </n-grid>
            </n-tab-pane>
        </n-tabs>
    </n-space>
</template>

<script lang="ts" setup>
import { h, ref, computed } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { Navigation16Filled, FolderAdd20Filled, Settings24Filled } from '@vicons/fluent'
import type { tabsList,musicFileExt } from '@renderer/types/default'

const tagRef = ref<'card' | 'line'>('line')
const panelsRef = ref([1, 2, 3])

const closable = computed(() => {
    return panelsRef.value.length > 1
})

const switchTag = () => {
    tagRef.value = tagRef.value == 'card' ? 'line' : 'card'
}

const handleAdd = () => {
    console.log('add')
    const newval = tabList.length + 1
    panelsRef.value.push(newval)
    const newTable: tabsList = {
        id: newval,
        name: 'table' + newval,
        data: [
        ],
    }
    tabList.push(newTable)
}

const handleClose = (name: string) => {
    console.log('close')
    console.log(name)
    let num = parseInt(name.replace(/[^0~9]/gi, ''))
    tabList = tabList.filter((i) => i.name != name)
    panelsRef.value = panelsRef.value.filter((i) => i != num)
}

const addableRef = computed(() => {
    return {
        disabled: panelsRef.value.length >= 100,
    }
})

let tabList: tabsList[] = [
    {
        id: 1,
        name: 'table1',
        data: [
            {
                id: 121,
                fileid: 71,
                name: 'file111111111111111111111111111111111111111111',
                url: 'file://daa',
                ext: 'flac',
            },
            {
                id: 122,
                fileid: 72,
                name: 'file112',
                url: 'file://dab',
                ext: 'flac',
            },
            {
                id: 123,
                fileid: 73,
                name: 'file113',
                url: 'file://dac',
                ext: 'flac',
            },
            {
                id: 124,
                fileid: 74,
                name: 'file114',
                url: 'file://dad',
                ext: 'flac',
            },
            {
                id: 3,
                fileid: 789456,
                name: 'file12',
                url: 'file://db',
                ext: 'flac',
            },
            {
                id: 4,
                fileid: 789456,
                name: 'file13',
                url: 'file://dc',
                ext: 'flac',
            },
            {
                id: 5,
                fileid: 789456,
                name: 'file14',
                url: 'file://dd',
                ext: 'flac',
            },
            {
                id: 6,
                fileid: 789456,
                name: 'file15',
                url: 'file://de',
                ext: 'flac',
            },
            {
                id: 2345,
                fileid: 789456,
                name: 'file2',
                url: 'file://c',
                ext: 'flac',
            },
            {
                id: 3456,
                fileid: 789456,
                name: 'file3',
                url: 'file://b',
                ext: 'flac',
            },
            {
                id: 4567,
                fileid: 789456,
                name: 'file4',
                url: 'file://a',
                ext: 'flac',
            },
        ],
    },
    {
        id: 2,
        name: 'table2',
        data: [
            {
                id: 1234,
                fileid: 789456,
                name: 'file1',
                url: 'file://d',
                ext: 'flac',
            },
            {
                id: 2345,
                fileid: 789456,
                name: 'file2',
                url: 'file://c',
                ext: 'flac',
            },
            {
                id: 3456,
                fileid: 789456,
                name: 'file3',
                url: 'file://b',
                ext: 'flac',
            },
            {
                id: 4567,
                fileid: 789456,
                name: 'file4',
                url: 'file://a',
                ext: 'flac',
            },
        ],
    },
    {
        id: 3,
        name: 'table3',
        data: [
            {
                id: 1234,
                fileid: 789456,
                name: 'file1',
                url: 'file://d',
                ext: 'flac',
            },
            {
                id: 2345,
                fileid: 789456,
                name: 'file2',
                url: 'file://c',
                ext: 'flac',
            },
            {
                id: 3456,
                fileid: 789456,
                name: 'file3',
                url: 'file://b',
                ext: 'flac',
            },
            {
                id: 4567,
                fileid: 789456,
                name: 'file4',
                url: 'file://a',
                ext: 'flac',
            },
        ],
    },
]

const columns: DataTableColumns<musicFileExt> = [
    {
        title: 'Id',
        key: 'id',
        fixed: 'left',
        maxWidth: 50,
        minWidth: 50,
        resizable: true,
        render: (_data, index) => {
            return h('span', [index + 1])
        },
    },
    {
        title: 'Name',
        key: 'name',
        resizable: true,
        minWidth: 100,
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Ext',
        key: 'ext',
        resizable: true,
        minWidth: 100,
    },
    {
        title: 'Length',
        key: 'length',
        resizable: true,
        minWidth: 100,
    },
    {
        title: '',
        key: 'action',
    },
]
</script>
<style lang="less" scoped>
.btn-style {
    padding-right: 10px;
}

.tab-style {
    height: 79vh;
}
</style>
