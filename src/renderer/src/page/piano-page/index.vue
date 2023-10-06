<template>
    <div class="order-page">
        <div class="music-btn">
            <n-space class="order-page-span">
                <n-button @click="voicenum(262)">LC</n-button>
                <n-button @click="voicenum(277)">LC#</n-button>
                <n-button @click="voicenum(293)">LD</n-button>
                <n-button @click="voicenum(311)">LD#</n-button>
                <n-button @click="voicenum(330)">LE</n-button>
                <n-button @click="voicenum(349)">LF</n-button>
                <n-button @click="voicenum(370)">LF#</n-button>
                <n-button @click="voicenum(392)">LG</n-button>
                <n-button @click="voicenum(415)">LG#</n-button>
                <n-button @click="voicenum(440)">LA</n-button>
                <n-button @click="voicenum(466)">LA#</n-button>
                <n-button @click="voicenum(494)">LB</n-button>
            </n-space>
        </div>
        <div class="music-btn">
            <n-space class="order-page-span">
                <n-button @click="voicenum(523)">C</n-button>
                <n-button @click="voicenum(554)">C#</n-button>
                <n-button @click="voicenum(587)">D</n-button>
                <n-button @click="voicenum(622)">D#</n-button>
                <n-button @click="voicenum(659)">E</n-button>
                <n-button @click="voicenum(698)">F</n-button>
                <n-button @click="voicenum(740)">F#</n-button>
                <n-button @click="voicenum(784)">G</n-button>
                <n-button @click="voicenum(831)">G#</n-button>
                <n-button @click="voicenum(880)">A</n-button>
                <n-button @click="voicenum(932)">A#</n-button>
                <n-button @click="voicenum(988)">B</n-button>
            </n-space>
        </div>
        <div class="music-btn">
            <n-space class="order-page-span">
                <n-button @click="voicenum(1046)">HC</n-button>
                <n-button @click="voicenum(1109)">HC#</n-button>
                <n-button @click="voicenum(1175)">HD</n-button>
                <n-button @click="voicenum(1245)">HD#</n-button>
                <n-button @click="voicenum(1318)">HE</n-button>
                <n-button @click="voicenum(1397)">HF</n-button>
                <n-button @click="voicenum(1480)">HF#</n-button>
                <n-button @click="voicenum(1568)">HG</n-button>
                <n-button @click="voicenum(1661)">HG#</n-button>
                <n-button @click="voicenum(1760)">HA</n-button>
                <n-button @click="voicenum(1865)">HA#</n-button>
                <n-button @click="voicenum(1976)">HB</n-button>
            </n-space>
        </div>
    </div>
</template>
 
<script lang="ts" setup>

const context = new AudioContext();

const voicenum = (num: number) => {
    const localGain = context.createGain();
    localGain.gain.setValueAtTime(0.09, 0);
    localGain.connect(context.destination);
    const defaultnoice = context.createOscillator();
    defaultnoice.frequency.setValueAtTime(num, 0);
    defaultnoice.type = 'square'
    defaultnoice.connect(localGain)
    defaultnoice.start()
    defaultnoice.stop(context.currentTime + 0.4)
}

</script>
<style lang="less">
.order-page {
    height: 90vh;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;

    .music-btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

}
</style>
