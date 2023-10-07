/**
 * 控制相关
 * TODO:
 * 播放队列
 * 播放模式
 */

import { playList } from '@renderer/types/default'

class playListBar {
    private playList: playList[] = []

    constructor() {



    }

    get getPlayList() {
        return this.playList
    }

    set setPlayList(list: playList[]) {
        this.playList = list
    }

    

}

export default { }
