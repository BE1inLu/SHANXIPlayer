<template>
    <span>
        <div>
            <n-button @click="configtest1">readConfigTable</n-button>
            <n-button @click="configtest2">updateConfigItem('voice', '40')</n-button>
        </div>

        <div>
            <n-button @click="test5">readMusicDataTable</n-button>
            <n-button @click="test3">insertMusicDataItem</n-button>
            <n-button @click="test4">insertManyMusicData</n-button>
            <n-button @click="test6">deleteMusicDataItem</n-button>
        </div>
        <div>
            <n-button @click="test7">deleteMusicDataItem</n-button>
        </div>
        <div>
            <n-button @click="test8">tabstable-read</n-button>
            <n-button @click="test9">tabstable-insert</n-button>
            <n-button @click="test10">tabstable-update</n-button>
            <n-button @click="test11">tabstable-delete</n-button>
        </div>

        <div>data: {{ refdata }}</div>
    </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { musicFileExt } from '@renderer/types/default'

const refdata = ref()

const configtest1 = async () => {
    const configdata = await window.api.db.readConfigTable()
    refdata.value = configdata
}

const configtest2 = async () => {
    const result = await window.api.db.updateConfigItem('voice', '40')
    refdata.value = result
}

const test3 = async () => {
    const data: musicFileExt = {
        fileid: 12345,
        name: 'test1',
        url: '#1',
        ext: 'flac',
        rowid: 1,
        tabname: '我是listName1',
        tag: ['rock', 'and', 'role'],
    }
    const result = await window.api.db.insertMusicDataItem(data)
    refdata.value = result
}

const test4 = async () => {
    const dataList: musicFileExt[] = [
        {
            fileid: 12345,
            name: 'test1',
            url: '#1',
            ext: 'flac',
            listID: 1,
            tabname: '我是listName1',
            tag: ['rock', 'and', 'role'],
        },
        {
            fileid: 34567,
            name: 'test2',
            url: '#2',
            ext: 'flac',
            listID: 2,
            tabname: '我是listName2',
            tag: ['blue', 'and', 'black'],
        },
    ]

    const result = await window.api.db.insertManyMusicData(dataList)
    refdata.value = result
}

const test5 = async () => {
    const res = await window.api.db.readMusicDataTable()
    refdata.value = res
}

const test6 = async () => {
    const data: musicFileExt = {
        fileid: 123,
        name: '12344',
        url: 'D://',
        ext: 'flac',
        UUID: 'f17f894b-91f5-4f02-8249-41b29e0dd199',
    }
    const res = await window.api.db.deleteMusicDataItem(data)
    refdata.value = res
}

const test7 = async () => {
    /* 读取目录数据, 然后生成结构化musicfile并返回 */
    // await window.api.test.testfunc1()
}

const test8 = async () => {
    refdata.value = await window.api.db.readTabsTable()
}

const test9 = async () => {
    refdata.value = await window.api.db.insertTabItem('tabname1')
}
const test10 = async () => {
    const uuid = 'c79f31f1-363b-4d1a-a6dd-8b2f5372a85e'
    refdata.value = await window.api.db.updateTabItem('tabname2', uuid)
}
const test11 = async () => {
    const uuid = 'c79f31f1-363b-4d1a-a6dd-8b2f5372a85e'
    refdata.value = await window.api.db.deleteTabTable(uuid)
}
</script>
<style lang="less" scoped></style>
