import { useMusicStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { musicFile } from 'src/main/types'
/**
 * 音乐操作
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const musicBarService = (window?: any) => {
    const store = useMusicStore()
    const { musicBarLength, musicOrderData, musicStatus } = storeToRefs(store)
    const context: AudioContext = new AudioContext()
    const localGain: GainNode = context.createGain()
    let source: AudioBufferSourceNode
    localGain.gain.value = 0.2
    let playStatu = false

    const playListAdd = async () => {
        store.addPlayList(await window.api.file.loadPathFile())
    }

    const getFile = (filePatch: string): ArrayBuffer => {
        if (window == null) throw new Error('API undefind')
        return window.api.file.getBufferData(filePatch)
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
        musicBarLength.value = parseInt(source.buffer?.duration.toFixed(0))
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

    /** 清除当前 source 信息 */
    const clearSource = () => {
        source.stop()
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
    }
}
