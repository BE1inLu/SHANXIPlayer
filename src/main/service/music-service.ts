/**
 * 控制相关
 * TODO:
 * 播放队列
 * 播放模式
 */
import type { musicFile } from '../types/index'
import { util } from '../util/index'

export class musicFileService {
    private playFile!: musicFile
    private context: AudioContext = new AudioContext()
    private localGain: GainNode = this.context.createGain()
    private source: AudioBufferSourceNode = this.context.createBufferSource()
    public voiceNum: number

    constructor() {
        this.voiceNum = 0.8
        this.source.connect(this.localGain)
        this.localGain.connect(this.context.destination)
    }

    public clear() {}

    public play() {}
    public replay() {
        if (this.context.state === 'suspended') {
            this.context.resume()
        }
    }
    public stop() {
        if (this.context.state === 'running') {
            this.context.suspend()
        }
    }
    public close() {
        this.context.close()
    }

    public setVoice(num: number) {
        if (num > 1 && num < 0) {
            console.error('voice err')
            return
        }
        this.voiceNum = num
        this.localGain.gain.value = this.voiceNum
    }

    get getPlayFile() {
        return this.playFile
    }

    set setPlayFile(file: musicFile) {
        this.playFile = file
        this.setFileBufferData()
        let flacData = this.playFile.bufferData

        this.context.decodeAudioData(flacData!).then((buffer) => {
            this.source.buffer = buffer
        })
    }

    private setFileBufferData() {
        const { getBufferData } = util()
        this.playFile.bufferData = getBufferData(this.playFile.url).buffer
    }
}
