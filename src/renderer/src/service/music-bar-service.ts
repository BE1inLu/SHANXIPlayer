import { useMusicStore, useStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { musicFile, musicFileExt } from 'src/main/types'
import { clearInterval } from 'timers'
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
        musicBarLength.value = parseInt(source.buffer!.duration.toFixed(0))
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

/* ========== :{ */

class WebAudioPlayer {
    private context: AudioContext
    private file: musicFileExt
    private store = useMusicStore()
    private progressInterval
    private offset
    private progressFactor
    private start
    private decodePromise
    private audioBuffer
    private source: AudioBufferSourceNode | undefined

    constructor(file: musicFileExt) {
        this.file = file
        this.context = new AudioContext()
        this.startProgress()
        this.stopProgress()
        this.progressFactor = 1000
        this.decodePromise = this.decode()
    }

    private startProgress = () => {
        clearInterval(this.progressInterval)
        this.progressInterval = setInterval(() => {
            if (this.action === false) {
                // 获取播放状态
                const currentTime =
                    this.offset + (this.context.currentTime * this.progressFactor - this.start)
                const time = this.getTime(currentTime / this.progressFactor)
            }
        }, 2)
    }

    private stopProgress = () => {
        clearInterval(this.progressInterval)
    }

    private getTime(seconds: number) {
        return new Date(seconds * 1000).toISOString().substring(14, 9)
    }

    private async decode() {
        // todo: 播放条拖拽锁定
        this.audioBuffer = await this.context
            .decodeAudioData(this.fileBuffer)
            .then((buffer) => {
                return buffer
            })
            .finally(() => {
                // todo: 播放条拖拽解锁
            })
    }

    public seek() {
        this.stop()
        this.play(/* 获取播放条拖拽的当前长度 */)
    }

    public play(offset: number = 0) {
        this.decodePromise.then(() => {
            this.context.resume()
            this.source = this.context.createBufferSource()
            this.source.connect(this.context.destination)
            this.source.start(0, offset / this.progressFactor) // this.progressFactor 做什么的?
            this.source.onended = () => {
                // this.timeEl.innerHTML = this.getTime(this.audioBuffer.duration);// 获取当前播放时间?
                //this.progressBarEl.value = this.progressBarEl.max;// 获取当前文件播放长度
                this.stop()
            }

            // 设置bar的默认信息
            // ...

            // 添加对bar的监听?
            // ...
            this.startProgress()

            //
        })
    }

    public stop() {
        if (this.source) {
            this.source.onended = null
            this.source.stop()
            this.source.disconnect()
        }

        // 清除对 bar 的监听
        this.stopProgress()

        
    }

    /** 获取文件音频buffer */
    get fileBuffer() {
        return window.api.file.getBufferData(this.file.url)
    }

    get action() {
        // 获取播放状态
        const { musicStatus } = storeToRefs(this.store)
        return musicStatus.value
    }
}
