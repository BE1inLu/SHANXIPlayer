/**
 * flac 文件
 */
export type musicFile = fileDefaultInfo & musicInfo

/** 文件默认信息 */
type fileDefaultInfo = {
    /** id */
    id?: number
    /** 文件 id */
    fileid: number
    /**文件名 */
    name: string
    /**文件路径 */
    url: string
}

/** flac 音频文件 */
type flacFile = {
    ext: 'flac'
}

/** wav 音频文件 */
type wavFile = {
    ext: 'wav'
}

/** mp3 音频文件 */
type mp3File = {
    ext: 'mp3'
}

/** 音乐文件基本信息 */
type musicInfo = (mp3File | wavFile | flacFile) & {
    /**音频长度 */
    length?: number
    /**音频内容 */
    bufferData?: Uint8Array | ArrayBuffer
}
