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

        <div>data: {{ refdata }}</div>
    </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { musicFileExt } from '@renderer/types/default'

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
        listID: 1,
        listName: '我是listName1',
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
            listName: '我是listName1',
            tag: ['rock', 'and', 'role'],
        },
        {
            fileid: 34567,
            name: 'test2',
            url: '#2',
            ext: 'flac',
            listID: 2,
            listName: '我是listName2',
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
</script>
<style lang="less" scoped></style>
