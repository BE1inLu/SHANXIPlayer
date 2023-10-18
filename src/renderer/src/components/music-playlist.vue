<template>
    <n-drawer v-model:show="switchMusicPlayList" :width="380">
        <n-drawer-content :native-scrollbar="false" :body-content-style="{ padding: 0 }">
            <template #header>
                <span>PlayList</span>
            </template>
            <n-data-table
                :columns="column"
                :data="musicPlayList"
                :pagination="false"
                :bordered="false"
                :row-props="rowProps"
                max-height="83vh"
            />

            <n-popover trigger="hover">
                <template #trigger>
                    <n-button
                        class="btn-style"
                        strong
                        secondary
                        circle
                        type="error"
                        @click="store.clearMusicPlayList()"
                    >
                        <template #icon>
                            <n-icon>
                                <Delete20Filled />
                            </n-icon>
                        </template>
                    </n-button>
                </template>
                清空列表
            </n-popover>

            <n-popover trigger="hover">
                <template #trigger>
                    <n-button
                        class="btn-style1"
                        strong
                        secondary
                        circle
                        type="info"
                        @click="emit('emit-addlist')"
                    >
                        <template #icon>
                            <n-icon>
                                <Add16Filled />
                            </n-icon>
                        </template>
                    </n-button>
                </template>
                从目录添加
            </n-popover>
        </n-drawer-content>
    </n-drawer>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NIcon } from 'naive-ui'
import { Delete20Filled, Add16Filled } from '@vicons/fluent'
import { useMusicStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import type { playListItem } from '@renderer/types/default.d.ts'

const store = useMusicStore()
const { switchMusicPlayList, musicPlayList } = storeToRefs(store)
const emit = defineEmits(['emit-data', 'emit-addlist'])
const rowProps = (row: playListItem) => {
    return {
        onDblclick: () => {
            emit('emit-data', row)
        },
    }
}

const column: DataTableColumns<playListItem> = [
    {
        title: 'Id',
        key: 'id',
        width: 20,
        render: (_data, index) => {
            return h('span', [index + 1])
        },
    },
    {
        title: 'Title',
        key: 'title',
        width: 90,
        ellipsis: {
            tooltip: true,
        },
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
                    store.clearMusicPlayListItem(row)
                },
            })
        },
    },
]
</script>
<style lang="less" scoped>
.playerlist-drawer {
    padding: 0;
}

.btn-style {
    position: absolute;
    bottom: 4%;
    right: 20%;
}

.btn-style1 {
    position: absolute;
    bottom: 4%;
    right: 35%;
}
</style>
