export const utilService = {
    debounce,
    throttle

}

function debounce(func: any, wait: number) {
    let timeout: any
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

function throttle(cb: any, delay = 1000) {
    let shouldWait = false
    let waitingArgs: any

    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false
        } else {
            cb(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args: any) => {
        if (shouldWait) {
            waitingArgs = args
            return
        }
        cb(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
    }
}