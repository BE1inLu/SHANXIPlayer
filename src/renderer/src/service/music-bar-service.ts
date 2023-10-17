import { useMusicStore } from '@renderer/store'
import { playListItem } from '@renderer/types/default'
import { storeToRefs } from 'pinia'

export const useMusicService = () => {
    const musicstore = useMusicStore()
    const { musicPlayList, musicVoice } = storeToRefs(musicstore)
    let listItem: playListItem

    const playListAdd = async () => {
        musicstore.addPlayList(await window.api.file.loadPathFile())
    }
    /**
     * 获取当前音频长度
     * @param val -- 传入进来的参数
     */
    const seek = (val: number) => {
        let player: WebAudioPlayer | undefined
        musicPlayList.value.forEach((i) => {
            if (listItem.title == i.title) {
                player = i.players
            }
        })
        if (player == undefined) return
        player.seek(val)
    }

    /**
     * 设置当前音频播放状态 开始/暂停
     * @param localfile
     */
    const playPause = (localfile: playListItem) => {
        /**
         * 这里2种情况, 会有空文件和非空文件传入
         * todo-fix: 设置成外部处理
         */
        listItem = localfile
        let player: WebAudioPlayer | undefined
        musicPlayList.value.forEach((i) => {
            if (listItem.title == i.title) {
                player = i.players
            }
        })
        if (!player) {
            player = new WebAudioPlayer(listItem)
            musicPlayList.value.forEach((i) => {
                if (listItem.title == i.title) {
                    i.players = player
                }
            })
        }
        if (player.action === true) {
            player.play()
        } else {
            player.stop()
        }
    }

    /**
     * 设置音量大小
     * @param val
     */
    const voice = () => {
        let player: WebAudioPlayer | undefined
        musicPlayList.value.forEach((i) => {
            if (listItem.title == i.title) {
                player = i.players
            }
        })
        if (player == undefined) return
        player.voice = musicVoice.value
    }

    return {
        playListAdd,
        voice,
        seek,
        playPause,
    }
}

class WebAudioPlayer {
    private context: AudioContext
    private file: playListItem
    private store = useMusicStore()
    private progressInterval
    // 当前音频长度
    private offset
    private start
    private decodePromise
    private progressFactor
    private audioBuffer!: AudioBuffer | null
    private source: AudioBufferSourceNode | undefined
    private gain: GainNode | undefined

    constructor(file: playListItem) {
        this.file = file
        this.context = new AudioContext()
        this.startProgress()
        this.stopProgress()
        this.progressFactor = 1000
        this.decodePromise = this.decode()
    }

    /**
     * 获取播放状态
     */
    get action() {
        const { musicStatus } = storeToRefs(this.store)
        return musicStatus.value
    }

    set action(flag: boolean) {
        const { musicStatus } = storeToRefs(this.store)
        musicStatus.value = flag
    }

    get voice() {
        const { musicVoice } = storeToRefs(this.store)
        return musicVoice.value
    }

    set voice(val: number) {
        this.gain!.gain.value = val * 0.01
    }

    set musicBarLength(val: number) {
        const { musicBarLength } = storeToRefs(this.store)
        musicBarLength.value = val
    }

    get musiBarLength() {
        const { musicBarLength } = storeToRefs(this.store)
        return musicBarLength.value
    }

    /** 获取文件音频buffer */
    get fileBuffer() {
        return window.api.file.getBufferData(this.file.url)
    }

    private startProgress = () => {
        clearInterval(this.progressInterval)
        this.progressInterval = this.setProgress
    }

    private stopProgress = () => {
        clearInterval(this.progressInterval)
    }

    private setProgress = () => {
        return setInterval(() => {
            if (this.action == false) {
                /**
                 * 需要修改
                 * 理解: 这里应该是获取当前播放时间和总播放时间
                 * currentTime是当前播放时间 time应该是总播放时间
                 */
                const { musicBarCurrentTime } = storeToRefs(this.store)
                const currentTime =
                    this.offset + parseInt(this.context.currentTime.toFixed(0)) - this.start
                musicBarCurrentTime.value = currentTime
            }
        }, 100)
    }

    private async decode() {
        // 播放条拖拽锁定
        const { musicBarStatus } = storeToRefs(this.store)
        musicBarStatus.value = true
        this.audioBuffer = await this.context
            .decodeAudioData(await this.fileBuffer)
            .then((buffer) => {
                return buffer
            })
            .finally(() => {
                // 播放条拖拽解锁
                musicBarStatus.value = false
            })
    }

    public seek(val: number) {
        // this.stop()
        const { musicBarCurrentTime, musicBarLength } = storeToRefs(this.store)
        console.log('seek val: ' + val)
        console.log('start: ' + this.start)

        const now = parseInt(this.context.currentTime.toFixed(0)) - this.start
        console.log('now: ' + now)
        console.log(this.context.getOutputTimestamp())
        console.log(musicBarCurrentTime.value)
        console.log(musicBarLength.value)


        // this.play(val)
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
            this.gain = this.context.createGain()
            this.source.buffer = this.audioBuffer
            this.gain.gain.value = this.voice * 0.01
            this.source.connect(this.gain)
            this.gain.connect(this.context.destination)
            this.source.start(0, offset)
            this.source.onended = () => {
                // 音频 暂停/结束 事件
                // ...
                this.stop()
                console.log('音频 暂停/结束 事件')
            }

            /**
             * 设置bar的默认信息
             * start, offset, length
             * 设置最大长度
             */
            this.start = parseInt(this.context.currentTime.toFixed(0))
            this.musicBarLength = parseInt(this.source.buffer!.duration.toFixed(0))
            this.offset = offset
            console.log('offset: ' + offset)

            /** @todo 需要设置 lengthvalue */

            /**
             * ...添加对bar的监听
             * @todo 增加对 bar 的监听, 需要获取值来判断
             */
            
            this.startProgress()

            // ...设置播放状态
            this.action = false
        })
    }

    public stop() {
        if (this.source) {
            this.source.onended = null
            this.source.stop()
            this.source.disconnect()
        }

        // ...清除对 bar 的监听
        this.stopProgress()
        // ...更新播放状态
        this.action = true
    }
}
