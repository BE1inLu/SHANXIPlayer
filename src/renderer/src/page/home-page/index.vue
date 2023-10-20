<template>
    <n-grid x-gap="12" cols="12" item-responsive responsive="screen">
        <n-gi span="1 m:2"></n-gi>
        <n-gi span="10 m:8">
            <n-space vertical>
                <n-card style="margin-top: 10px">
                    <n-page-header subtitle="Player">
                        <template #title> 🚧 </template>
                        <div>一些数据</div>
                        <n-grid :cols="12">
                            <n-gi :span="2">
                                <n-statistic label="歌曲总数" tabular-nums>
                                    <n-number-animation
                                        :from="0"
                                        :to="114"
                                        show-separator
                                        :duration="1000"
                                    />
                                </n-statistic>
                            </n-gi>
                            <n-gi></n-gi>
                            <n-gi :span="2">
                                <n-statistic label="歌单列表" tabular-nums>
                                    <n-number-animation
                                        :from="0"
                                        :to="514"
                                        show-separator
                                        :duration="1500"
                                    />
                                </n-statistic>
                            </n-gi>
                            <n-gi></n-gi>
                            <n-gi :span="2">
                                <n-statistic label="施工中🚧" tabular-nums>
                                    <n-number-animation
                                        :from="0"
                                        :to="114514"
                                        show-separator
                                        :duration="2000"
                                    />
                                </n-statistic>
                            </n-gi>
                        </n-grid>
                    </n-page-header>
                </n-card>
                <n-card>
                    <div>施工中🚧</div>
                </n-card>
            </n-space>
        </n-gi>
        <n-gi span="1 l:2"></n-gi>
    </n-grid>

    <n-space vertical> </n-space>
</template>

<script lang="ts" setup>
import { useMusicListStore } from '@renderer/store/modules/music-list-store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useMusicListStore()
const { tabsList: tabli } = storeToRefs(store)

onMounted(() => {
    getdata()
})

const getdata = async () => {
    tabli.value = await window.api.db.readNewTabsData()
}
</script>
<style lang="less" scoped></style>
