/**
 * 控制相关
 * TODO:
 * 播放队列
 * 播放模式
 */

import { playList as playfile } from '@renderer/types/default'

export class playFileService {
    private playFile!: playfile
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

    set setPlayFile(file: playfile) {
        this.playFile = file
        let flacData = this.playFile.data

        this.context.decodeAudioData(flacData!.buffer).then((buffer) => {
            this.source.buffer = buffer
        })
    }
}
