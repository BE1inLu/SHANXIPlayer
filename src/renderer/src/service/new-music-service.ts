import { musicFile } from '@main/types'
import { useMusicStore } from '@renderer/store'
import { storeToRefs } from 'pinia'

export const useMusicService = () => {
    const musicstore = useMusicStore()
    // const { musicBarLength, musicOrderData, musicStatus } = storeToRefs(store)

    /**
     * 获取当前音频长度
     * @param val
     */
    const seek = (val: number) => {}

    /**
     * 设置当前音频播放状态 开始/暂停
     * @param file
     */
    const playPause = (file: musicFile) => {}

    /**
     * 设置音量大小
     * @param val
     */
    const voice = (val: number) => {}
}

class WebAudioPlayer {
    private context: AudioContext
    private file: musicFile
    private store = useMusicStore()
    private progressInterval
    // 当前音频长度
    private offset
    private progressFactor
    private start
    private decodePromise
    private audioBuffer!: AudioBuffer | null
    private source: AudioBufferSourceNode | undefined

    constructor(file: musicFile) {
        this.file = file
        this.context = new AudioContext()
        this.startProgress()
        this.stopProgress()
        this.decodePromise = this.decode()
    }

    /**
     * 获取播放状态
     */
    get action() {
        const { musicStatus } = storeToRefs(this.store)
        return musicStatus.value
    }

    /** 获取文件音频buffer */
    get fileBuffer() {
        return window.api.file.getBufferData(this.file.url)
    }

    private getTime = (seconds: number) => {
        return new Date(seconds * 1000).toISOString().substring(14, 9)
    }

    private startProgress = () => {
        clearInterval(this.progressInterval)
        this.progressInterval = setInterval(() => {
            if (this.action === false) {
                /**
                 * 需要修改
                 * 理解: 这里应该是获取当前播放时间和总播放时间
                 * currentTime是当前播放时间 time应该是总播放时间
                 */
                const currentTime =
                    this.offset + (this.context.currentTime * this.progressFactor - this.start)
                const time = this.getTime(currentTime / this.progressFactor)
            }
        }, 2)
    }

    private stopProgress = () => {
        clearInterval(this.progressInterval)
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

    /**
     * 播放方法
     * @todo 添加音量设置
     * @param offset
     */
    public play(offset: number = 0) {
        this.decodePromise.then(() => {
            this.context.resume()
            this.source = this.context.createBufferSource()
            this.source.buffer = this.audioBuffer
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
}
