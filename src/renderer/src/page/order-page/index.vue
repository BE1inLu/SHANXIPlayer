<template>
    <span>
        <n-button @click="getFlacFile">btn1</n-button>

        <n-button @click="start">start</n-button>
        <!-- <n-button @click="stop">stop</n-button> -->
    </span>
</template>
 
<script lang="ts" setup>

const getFlacFile = async () => {
    let configdata = await window.api.db.readConfigTable()
    console.log(configdata)
}

const start = () => {

}

</script>
<style lang="less" scoped></style>
