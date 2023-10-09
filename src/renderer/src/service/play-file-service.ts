import { useStore } from '@renderer/store'
import { musicFile } from 'src/main/types'

/**
 * 播放器组件操作
 * @returns
 */
export const musicPlayListService = () => {
    const store = useStore()

    const playListAdd = async (api: { loadPathFile: () => musicFile[] | PromiseLike<musicFile[]> }) => {
        store.setMusicPlayList(await api.loadPathFile())
    }

    const play = async (file?: musicFile) => {}

    return { playListAdd }
}
