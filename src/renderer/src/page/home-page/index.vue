<template>
    <!-- <span>i am homepage</span> -->

    <n-grid x-gap="12" cols="12" item-responsive responsive="screen">
        <n-gi span="1 m:2"></n-gi>
        <n-gi span="10 m:8">
            <n-space vertical>
                <n-card style="margin-top: 10px">
                    <n-page-header subtitle="Player">
                        <template #title> SHANXI </template>
                        <div>123445</div>
                        <n-grid :cols="12">
                            <n-gi :span="2">
                                <n-statistic label="歌曲总数" value="125" />
                            </n-gi>
                            <n-gi></n-gi>
                            <n-gi :span="2">
                                <n-statistic label="歌单列表" value="5" />
                            </n-gi>
                            <n-gi></n-gi>
                            <n-gi :span="2">
                                <n-statistic label="播放时长" value="12344" />
                            </n-gi>
                        </n-grid>
                    </n-page-header>
                </n-card>
                <n-card>
                    <div>12345</div>
                </n-card>
            </n-space>
        </n-gi>
        <n-gi span="1 l:2"></n-gi>
    </n-grid>

    <n-space vertical> </n-space>
</template>

<script lang="ts" setup></script>
<style lang="less" scoped></style>
