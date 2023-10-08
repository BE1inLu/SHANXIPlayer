/**
 * flac 文件
 */
export type musicFile = {
    /** 文件 id */
    id: number | string | undefined
    /**文件名 */
    name: string
    /**文件类型 */
    ext: ext
    /**文件路径 */
    url: string
    /**音频长度 */
    length: number | undefined
    /**音频长度-- str 类型 */
    lengthstr?: string
    /**音频内容 */
    bufferData?: Uint8Array | ArrayBuffer
}

/**文件类型 */
type ext = 'flac' | 'wav' | 'mp3'
