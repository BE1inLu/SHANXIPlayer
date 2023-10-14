import type {
    musicFile as musicType,
    musicFileExt as musicExt,
    configItem as _configItem,
} from '@main/types/index'

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

export type musicFile = musicType

export type musicFileExt = musicExt

export type tabsList = {
    id: number
    name: string
    listName?: string
    data: musicFileExt[]
}

export type configItem = _configItem
