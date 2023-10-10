import { useStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { musicFile } from 'src/main/types'
/**
 * 音乐操作
 * @returns
 */
export const musicService = (API?: any) => {
    const store = useStore()

    const context: AudioContext = new AudioContext()
    const localGain: GainNode = context.createGain()
    const source: AudioBufferSourceNode = context.createBufferSource()

    const { musicBarLength } = storeToRefs(store)
    musicBarLength.value = context.getOutputTimestamp()
    localGain.gain.value = 0.2
    source.connect(localGain)
    localGain.connect(context.destination)

    const playListAdd = async () => {
        store.setMusicPlayList(await API.loadPathFile())
    }

    const getFileBuffer = (filePatch: string): ArrayBuffer => {
        if (API == null) throw new Error('API undefind')
        return API.getBufferData(filePatch)
    }

    const loadFile = async (f: musicFile) => {
        let buf = await getFileBuffer(f.url)
        context.decodeAudioData(buf).then((buffer) => {
            source.buffer = buffer
        })
    }

    /** 音量设置 */
    const setVoice = (num: number) => {
        localGain.gain.value = num * 0.01
    }

    /** 通过 file 来播放 */
    const playByFile = (f: musicFile) => {
        loadFile(f)
        playControl()
    }

    /** 播放操作 */
    const play = (f?: musicFile) => {
        f ? playByFile(f) : undefined
    }

    const playControl = () => {
        source.start(0)
    }

    /** 继续播放 */
    const replay = () => {
        if (context.state === 'suspended') {
            context.resume()
        }
    }

    /** 停止播放 */
    const stop = () => {
        if (context.state === 'running') {
            context.suspend()
            source.stop()
        }
    }

    return {
        playListAdd,
        loadFile,
        setVoice,
        play,
        replay,
        stop,
    }
}
