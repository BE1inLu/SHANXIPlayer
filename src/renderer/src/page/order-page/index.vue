<template>
    <span>
        <n-button @click="configtest1">test1</n-button>

        <n-button @click="configtest2">test2</n-button>
        <n-button @click="configtest3">test3</n-button>
    </span>
</template>
 
<script lang="ts" setup>

const configtest1 = async () => {
    let configdata = await window.api.db.readConfigTable()
    console.log(configdata)
}

const configtest2 = async () => {
    let result = await window.api.db.updateConfigItem('voice', '40')
    console.log(result)
}

const configtest3 = async () => {
    let result = await window.api.db.updateConfigItem('voice', '20')
    console.log(result)
}

</script>
<style lang="less" scoped></style>
