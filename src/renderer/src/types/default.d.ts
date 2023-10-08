/** playList 播放队列对象 */
export type playList = {
    /** 队列编号 */
    no?: number
    /** 标题 */
    title: string
    /** 长度 */
    length: string
    /** 默认编号, UUID 唯一值 */
    ID?: string
    /** 数据 */
    data?: Uint8Array
}
