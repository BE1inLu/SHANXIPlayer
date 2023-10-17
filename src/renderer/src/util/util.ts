export const util = () => {
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

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    return { debounce, getRandomInt }
}
