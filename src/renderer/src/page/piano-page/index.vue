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
        <div class="music-btn">
            <n-button @click="fullparty">春日影，启动！</n-button>
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

const fullparty = () => {

    const voice = {
        "(1)": 262,
        "(#1)": 277,
        "(2)": 294,
        "(#2)": 311,
        "(3)": 330,
        "(4)": 349,
        "(#4)": 370,
        "(5)": 392,
        "(#5)": 415,
        "(6)": 440,
        "(#6)": 466,
        "(7)": 494,
        "1": 523,
        "#1": 554,
        "2": 587,
        "#2": 622,
        "3": 659,
        "4": 698,
        "#4": 740,
        "5": 784,
        "#5": 831,
        "6": 880,
        "#6": 932,
        "7": 988,
        "[1]": 1046,
        "[#1]": 1109,
        "[2]": 1175,
        "[#2]": 1245,
        "[3]": 1318,
        "[4]": 1397,
        "[#4]": 1480,
        "[5]": 1568,
        "[#5]": 1661,
        "[6]": 1760,
        "[#6]": 1865,
        "[7]": 1976,
    }

    const list = [
        "(7)", "#1", " ", "#2", "#2", "#1", " ", "3", "#2", "#1", " ",
        "#1", "#1", "(7)", " ", "3", "#2", "#1", " ", "#1", "(7)", "#1", "#2", " ",
        "#2", "#4", "7", " ", "#6", "7", "#6", "7", " ", "#6", "#5", "#4", " ",
        "#4", "#1", "3", "3", "#2", "#2", " ",
        "(#4)", "3", "#2", "#1", "#2", "#4", "(7)", " ", "(7)", "#1", "(7)", " ",
        "(7)", "#4", "(7)", " ", "3", "#2", "#1", "(7)", "(7)", " ",
        "(7)", "#1", " ", "#2", "#2", "#1", " ", "3", "#2", "#1", " ",
        "#1", "#1", "(7)", " ", "3", "#2", "#1", " ", "#1", "(7)", "#1", "#2", " ",
        "#2", "#4", "7", " ", "#6", "7", "#6", "7", " ", "#6", "#5", "#4", " ",
        "#4", "#1", "3", "3", "#2", "#2", "#2", " ",
        "#4", "3", "#2", "#1", "#2", "#4", "(7)", " ",
        "(7)", "(7)", "#1", "(7)", " ", "(7)", "#4", "(7)", " ",
        "3", "3", "3", "#2", "#1", " ", "#1", "(7)", "(7)", "(7)", " ",
        "#5", "#4", "#4", " ", "#4", "3", "3", " ", "#2", "#1", " ",
        "#4", "#4", "3", "3", "3", " ", "3", "#2", "#1", " ",
        "#1", "(7)", "(#6)", "(7)", " ",
        "#5", "#4", "#4", " ", "#4", "3", "3", " ", "#2", "#1", " ",
        "#2", "3", "#2", "#2", "#2", "#2", " ",
        "#2", "#1", "#2", "[#1]", "7", "7", " ",
        "7", "#6", "#5", "#5", " ",
        "#5", "#5", "#4", "3", "3", "3", " ",
        "#2", "3", "#4", " ",
        "#2", "#1", "#2", "#1", "#2", "3", "#4", " ", "3", "#4", "#5", " ", "#5", "#6", "7", " ",
        "[#1]", "7", "#4", " ", "#4", "3", "#2", " ", "#2", "3", "#4", " ",
        "#2", "#1", "#2", "#1", "#2", "3", "#4", " ", "3", "#4", "#5", " ", "5", "#5", "#6", " ",
        "#4", "[#2]", "[#2]", " ", "#4", "[3]", "[#2]", "[#1]", "[#1]", " ", "7", "#6", "7", " ",
        "#4", "7", "[#1]", "7", "7", " ", "#4", "[#1]", "7", "7", " ",
        "#4", "7", "[#1]", "7", "7", " ", "#4", "7", "[#1]", " ", "[#2]", "[#1]", "7", " ",
        "7", "#6", "#5", "#5", " ", "#4", "#4", "3", "3", "#2", "#1", "#2", " ",
        "3", "3", "#2", "3", "#2", "#1", "(7)", " "
    ]

    let j = 0;
    list.forEach((i) => {
        if (i != '#') {
            j += 400;
            setTimeout(() => {
                voicenum(voice[i])
            }, j);
            console.log(i);
        } else {
            j += 400
            setTimeout(() => {
                console.log(" ");
            },);
        }
    });
}

</script>
<style lang="less">
@import '../../assets/css/defaultCommon.less';

.order-page {
    height: @defaultHeight;
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
