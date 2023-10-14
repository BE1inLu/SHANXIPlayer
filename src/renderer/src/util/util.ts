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

    return { debounce }
}
