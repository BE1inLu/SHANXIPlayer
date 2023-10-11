import { useMusicStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { musicFile } from 'src/main/types'
import { buffer } from 'stream/consumers'
/**
 * 音乐操作
 * @returns
 */
export const musicService = (API?: any) => {
    const store = useMusicStore()
    const { musicBarLength, musicOrderData, musicStatus } = storeToRefs(store)
    const context: AudioContext = new AudioContext()
    const localGain: GainNode = context.createGain()
    let source: AudioBufferSourceNode
    localGain.gain.value = 0.2
    let playStatu: boolean = false

    const playListAdd = async () => {
        store.addPlayList(await API.loadPathFile())
    }

    const getFile = (filePatch: string): ArrayBuffer => {
        if (API == null) throw new Error('API undefind')
        return API.getBufferData(filePatch)
    }

    const loadFile = async (f: musicFile) => {
        musicOrderData.value = f.url
        if (playStatu) clearSource()
        source = context.createBufferSource()
        source.buffer = await context
            .decodeAudioData(await getFile(musicOrderData.value))
            .then((buffer) => {
                return buffer
            })
        musicBarLength.value = parseInt(source.buffer.duration.toFixed(0))
        source.connect(localGain)
        localGain.connect(context.destination)
    }

    /** 音量设置 */
    const setVoice = (num: number) => {
        localGain.gain.value = num * 0.01
    }

    /** 通过 file 来播放 */
    const playByFile = async (f: musicFile) => {
        await loadFile(f)
        playControl()
    }

    /** 播放操作 */
    const play = (f?: musicFile) => {
        f ? playByFile(f) : playByList()
    }

    /* 通过 list 来播放 */
    const playByList = () => {
        /* TODO: 添加随机 */
    }

    const playControl = () => {
        source.start(0)
        playStatu = true
        musicStatus.value = false
    }

    const playControlToLengthBar = async (val: number) => {
        if (playStatu) clearSource()
        source = context.createBufferSource()
        source.buffer = await context
            .decodeAudioData(await getFile(musicOrderData.value))
            .then((buffer) => {
                return buffer
            })
        musicBarLength.value = parseInt(source.buffer.duration.toFixed(0))
        source.connect(localGain)
        localGain.connect(context.destination)
        source.loopStart = val
    }

    /** 清除当前 source 信息 */
    const clearSource = () => {
        source.stop()
        source = null
        playStatu = !playStatu
    }

    const suspend = () => {
        context.suspend()
    }

    const resume = () => {
        context.resume()
    }

    return {
        playListAdd,
        setVoice,
        play,
        suspend,
        resume,
        playControlToLengthBar,
    }
}
