<template>
    <n-grid :cols="12">
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
                        <Next16Filled />
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
        <n-gi span="1" class="local-group">
            <n-button strong secondary circle size="small" type="info">
                <template #icon>
                    <n-icon>
                        <Next16Filled />
                    </n-icon>
                </template>
            </n-button>

        </n-gi>
    </n-grid>
</template>
 
<script lang="ts" setup>
import {
    Play12Filled,
    Next16Filled
} from '@vicons/fluent';
import { ref } from 'vue'
const value = ref(0)

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
