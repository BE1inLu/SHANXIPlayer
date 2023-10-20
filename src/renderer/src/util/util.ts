export const util = () => {
    /**
     * 防抖方法
     * @param fn
     * @param delay
     * @returns
     */
    const debounce = (fn: any, delay: number) => {
        let timer
        const _debounce = (...args) => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
        return _debounce
    }

    /**
     * 获取随机数
     * @param max 随机数最大长度
     * @returns
     */
    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    /**
     * 秒数转时分秒
     * @param val
     * @returns
     */
    const secondToTime = (val: number) => {
        var t = ''
        if (val > -1) {
            var hour = Math.floor(val / 3600)
            var min = Math.floor(val / 60) % 60
            var sec = val % 60
            if (hour < 10) {
                t = '0' + hour + ':'
            } else {
                t = hour + ':'
            }
            if (min < 10) {
                t += '0'
            }
            t += min + ':'
            if (sec < 10) {
                t += '0'
            }
            t += sec.toFixed(0)
        }
        return t
    }

    return { debounce, getRandomInt, secondToTime }
}
