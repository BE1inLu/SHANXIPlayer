import { musicFile } from '@main/types'
import { util } from '@main/util'

/**
 * main 音乐控制
 * @returns 
 */
export const musicService = () => {
    let musicfile: musicFile
    const context: AudioContext = new AudioContext()
    const localGain: GainNode = context.createGain()
    const source: AudioBufferSourceNode = context.createBufferSource()
    let voiceNum: number = 0.8
    let initflag: boolean = false

    /* 初始化 */
    const init = () => {
        if (initflag) return
        source.connect(localGain)
        localGain.connect(context.destination)
        initflag = !initflag
    }

    /** 播放操作 */
    let play = () => {
        source.start(0)
    }

    /** 继续播放 */
    const replay = () => {
        if (context.state === 'suspended') {
            context.resume()
        }
    }

    /**停止播放 */
    const stop = () => {
        if (context.state === 'running') {
            context.suspend()
            source.stop()
        }
    }

    /** 设置声响大小 */
    const setVoice = (num: number) => {
        if (num > 1 && num < 0) {
            console.error('voice err')
            return
        }
        voiceNum = num
        localGain.gain.value = voiceNum
    }

    /** 读取音频文件内容 -- 读取buffer */
    const setFileBufferData = () => {
        const { getBufferData } = util()
        musicfile.bufferData = getBufferData(musicfile.url)
    }

    /** 读取文件 */
    const setFile = (file: musicFile) => {
        musicfile = file
        setFileBufferData()
        let flacData = musicfile.bufferData
        context.decodeAudioData(flacData!).then((buffer) => {
            source.buffer = buffer
        })
    }

    return {
        voiceNum,
        init,
        play,
        replay,
        stop,
        setVoice,
        setFile,
    }
}
