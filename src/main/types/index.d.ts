import { UUID } from 'crypto'

/**
 * 音乐文件 -- 基础
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
type musicInfo = {
    ext: 'flac' | 'wav' | 'mp3' | string
    /**音频长度 */
    length?: number
    /**音频内容 */
    bufferData?: Uint8Array | ArrayBuffer
}

/**
 * **音乐文件 -- 扩展**
 * 添加了标签信息，所属队列编号，最后打开时间，音频长度，生成的 UUID
 *
 */
export type musicFileExt = musicFile & {
    tag?: string[]
    listID?: number
    listName?: string
    createTime?: Date | string
    lastOpenTime?: Date | string
    musicLength?: number
    UUID?: UUID | string
}

export type configItem = {
    uuid?: UUID
    configname?: string
    status?: string
    lastchangetime?: string
}
