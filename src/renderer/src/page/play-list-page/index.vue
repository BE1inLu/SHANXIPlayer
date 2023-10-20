<template>
    <n-space vertical>
        <n-space justify="end" style="margin-top: 10px; margin-right: 10px">
            <n-tooltip trigger="hover">
                <template #trigger>
                    <n-button tertiary circle type="info" size="small" @click="switchTag">
                        <template #icon>
                            <n-icon>
                                <Settings24Filled />
                            </n-icon>
                        </template>
                    </n-button>
                </template>
                施工中🚧...
            </n-tooltip>
            <n-tooltip trigger="hover">
                <template #trigger>
                    <n-button tertiary circle type="info" size="small" @click="addFileToDB">
                        <template #icon>
                            <n-icon>
                                <FolderAdd20Filled />
                            </n-icon>
                        </template>
                    </n-button>
                </template>
                从文件夹添加...
            </n-tooltip>
            <n-dropdown trigger="hover" :options="options" @select="handleSelect">
                <n-button tertiary circle type="info" size="small">
                    <template #icon>
                        <n-icon>
                            <Navigation16Filled />
                        </n-icon>
                    </template>
                </n-button>
            </n-dropdown>
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
import {
    Navigation16Filled,
    FolderAdd20Filled,
    Add20Filled,
    Settings24Filled,
    Delete20Filled,
} from '@vicons/fluent'
import type { musicFileExt, playListItem } from '@renderer/types/default'
import { useMusicListStore } from '@renderer/store/modules/music-list-store'
import { storeToRefs } from 'pinia'
import { NButton, NIcon } from 'naive-ui'
import { useMusicStore } from '@renderer/store'
import { playListService } from '@renderer/service/play-list-service'

const tagRef = ref<'card' | 'line'>('line')
const showModelRef = ref(false)
const strVal = ref()
const store = useMusicListStore()
const playListStore = useMusicStore()
const { tabsList: tabli } = storeToRefs(store)
const { musicPlayList } = storeToRefs(playListStore)
const { getTabsUUID, getData } = playListService()

const addFileToDB = async () => {
    await window.api.db.loadPathToDB()
    getData()
}

const closable = computed(() => {
    return tabli.value!.length > 1
})

const modelOpen = () => {
    showModelRef.value = !showModelRef.value
}

const switchTag = () => {
    tagRef.value = 'line'
}

const handleAdd = async () => {
    await window.api.db.insertTabItem(strVal.value)
    getData()
}

const handleClose = async (name: string) => {
    await window.api.db.deleteTabTable(getTabsUUID(name))
    getData()
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
        title: '',
        key: 'action',
        fixed: 'right',
        render: (row) => {
            return h('span', [
                h(NButton, {
                    strong: true,
                    quaternary: true,
                    circle: true,
                    type: 'error',
                    'render-icon': () => {
                        return h(NIcon, null, {
                            default: () => h(Delete20Filled),
                        })
                    },
                    onClick: () => {
                        const musicFile: musicFileExt = {
                            uuid: row.uuid,
                            fileid: row.fileid,
                            name: row.name,
                            url: row.url,
                            ext: row.ext,
                        }
                        const del = async () => {
                            await window.api.db.deleteMusicDataItem(musicFile)
                            getData()
                        }
                        del()
                    },
                }),
                h(NButton, {
                    strong: true,
                    quaternary: true,
                    circle: true,
                    type: 'default',
                    'render-icon': () => {
                        return h(NIcon, null, {
                            default: () => h(Add20Filled),
                        })
                    },
                    onClick: () => {
                        const playItem: playListItem = {
                            title: row.name,
                            url: row.url,
                            statu: undefined,
                            players: undefined,
                        }
                        const flag = musicPlayList.value.find((i) => row.name == i.title)
                        if (!flag) {
                            musicPlayList.value.push(playItem)
                        }
                    },
                }),
            ])
        },
    },
]

const handleSelect = (val: string) => {
    if (val == 'key1') {
        window.api.db.clearMusicDataTable()
        getData()
    } else if (val == 'key2') {
        tabli.value![0].data!.forEach((i: musicFileExt) => {
            const playItem: playListItem = {
                title: i.name,
                url: i.url,
                statu: undefined,
                players: undefined,
            }
            const flag = musicPlayList.value.find((j) => i.name == j.title)
            if (!flag) {
                musicPlayList.value.push(playItem)
            }
        })
    }
}

const options = [
    {
        label: '清空列表',
        key: 'key1',
    },
    {
        label: '全部添加到播放队列',
        key: 'key2',
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
