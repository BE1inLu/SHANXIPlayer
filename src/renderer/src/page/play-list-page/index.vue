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
            <n-button tertiary circle type="info" size="small" @clicked="addFileToDB">
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
        <n-tabs
            class="tab-style"
            size="medium"
            :type="tagRef"
            :closable="closable"
            animated
            placement="left"
            :addable="addableRef"
            @add="modelOpen"
            @close="handleClose"
        >
            <n-tab-pane v-for="item of tabli" :key="item.rowid" :name="item.tabname!">
                <n-grid x-gap="12" cols="12" item-responsive responsive="screen">
                    <n-gi span="1 m:2"></n-gi>
                    <n-gi span="10 m:8">
                        <n-data-table
                            :columns="columns"
                            max-height="70vh"
                            :data="item.data"
                            :pagination="false"
                            :bordered="false"
                        >
                        </n-data-table>
                    </n-gi>
                    <n-gi span="1 l:2"></n-gi>
                </n-grid>
            </n-tab-pane>
        </n-tabs>
    </n-space>

    <n-modal
        v-model:show="showModelRef"
        preset="dialog"
        title="添加tab"
        positive-text="确认"
        negative-text="返回"
        @positive-click="handleAdd"
    >
        <div><n-input v-model:value="strVal" type="text" /></div>
    </n-modal>
</template>

<script lang="ts" setup>
import { h, ref, computed } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { Navigation16Filled, FolderAdd20Filled, Settings24Filled } from '@vicons/fluent'
import type { tabInfo, musicFileExt } from '@renderer/types/default'
import { useMusicListStore } from '@renderer/store/modules/music-list-store'
import { storeToRefs } from 'pinia'

const tagRef = ref<'card' | 'line'>('line')
const showModelRef = ref(false)
const strVal = ref()
const store = useMusicListStore()
const { tabsList: tabli } = storeToRefs(store)

const addFileToDB = async () => {
    const res = await window.api.test.testfunc1()
    console.log(res);
}

const closable = computed(() => {
    return tabli.value!.length > 1
})

const modelOpen = () => {
    showModelRef.value = !showModelRef.value
}

const switchTag = () => {
    tagRef.value = tagRef.value == 'card' ? 'line' : 'card'
}

const handleAdd = () => {
    console.log('add')
    const newTable: tabInfo = {
        rowid: tabli.value!.length,
        tabname: strVal.value,
        data: [],
    }
    tabli.value!.push(newTable)

}

const handleClose = (name: string) => {
    console.log('close')
    tabli.value = tabli.value!.filter((i) => i.tabname != name)
}

const addableRef = computed(() => {
    return {
        disabled: tabli.value!.length >= 10,
    }
})

const columns: DataTableColumns<musicFileExt> = [
    {
        title: 'Id',
        key: 'id',
        fixed: 'left',
        width: 50,
        render: (_data, index) => {
            return h('span', [index + 1])
        },
    },
    {
        title: 'Name',
        key: 'name',
        width: 200,
        ellipsis: {
            tooltip: true,
        },
    },
    {
        title: 'Ext',
        key: 'ext',
        width: 100,
    },
    {
        title: 'Length',
        key: 'length',
        width: 100,
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
