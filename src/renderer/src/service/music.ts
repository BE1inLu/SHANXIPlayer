import { useStore } from '@renderer/store'
import { musicFile } from 'src/main/types'
/**
 * 音乐操作
 * @returns
 */
export const musicService = (API?: any) => {
    const store = useStore()

    let context: AudioContext
    let localGain: GainNode
    let source: AudioBufferSourceNode
    let voiceNum: number

    const musicAudioInit = () => {
        context = new AudioContext()
        localGain = context.createGain()
        source = context.createBufferSource()
        voiceNum = 0.8
        source.connect(localGain)
        localGain.connect(context.destination)
    }

    const playListAdd = async (api: {
        loadPathFile: () => musicFile[] | PromiseLike<musicFile[]>
    }) => {
        store.setMusicPlayList(await api.loadPathFile())
    }

    const getFileBuffer = (filePatch: string): ArrayBuffer => {
        return API.getFileBufferData(filePatch)
    }

    const loadFile = (f: musicFile) => {
        let buf = getFileBuffer(f.url)
        context.decodeAudioData(buf).then((buffer) => {
            source.buffer = buffer
        })
    }

    /** 音量设置 */
    const setVoice = (num: number) => {
        if (num > 1 && num < 0) {
            console.error('voice err')
            return
        }
        voiceNum = num
        localGain.gain.value = voiceNum
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
        voiceNum,
        musicAudioInit,
        playListAdd,
        loadFile,
        setVoice,
        play,
        replay,
        stop,
    }
}
