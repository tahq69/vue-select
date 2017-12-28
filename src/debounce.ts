export default function debounce(func: (...a: any[]) => any, wait = 100, immediate = false) {
  let timeout: number | null
  let args: IArguments | null
  let context: any
  let timestamp: number
  let result: number

  function later() {
    const last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        context = args = null
      }
    }
  }

  const debounced = function(this: any) {
    context = this
    args = arguments
    timestamp = Date.now()
    const callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }

  return debounced
}
