import { useCallback, useRef } from 'react'
import { useMountedState } from 'react-use'

export function useDebouncedCallback<C extends (...args: any[]) => void>(
  callback: C,
  minimumDelayMilliseconds: number,
  maximumDelayMilliseconds?: number
): [debouncedCallback: C, cancel: () => void] {
  const ref = useRef<{
    callback: C
    minimumDelayMilliseconds: number
    maximumDelayMilliseconds?: number
    minimumTimeout?: any
    maximumTimeout?: any
  }>({
    callback,
    minimumDelayMilliseconds,
    maximumDelayMilliseconds,
  })
  ref.current.callback = callback

  const isMounted = useMountedState()

  const debouncedCallback = useCallback((...args: any[]) => {
    if (!isMounted()) return
    if (ref.current.minimumTimeout) {
      clearTimeout(ref.current.minimumTimeout)
    } else {
      if (
        ref.current.maximumDelayMilliseconds &&
        ref.current.maximumDelayMilliseconds > ref.current.minimumDelayMilliseconds
      ) {
        ref.current.maximumTimeout = setTimeout(call, ref.current.maximumDelayMilliseconds)
      }
    }
    ref.current.minimumTimeout = setTimeout(call, ref.current.minimumDelayMilliseconds)

    function call(): void {
      cancel()
      if (isMounted()) {
        ref.current.callback(...args)
      }
    }
  }, [])

  const cancel = useCallback((): void => {
    if (ref.current.minimumTimeout) {
      clearTimeout(ref.current.minimumTimeout)
      delete ref.current.minimumTimeout
    }
    if (ref.current.maximumTimeout) {
      clearTimeout(ref.current.maximumTimeout)
      delete ref.current.maximumTimeout
    }
  }, [])

  return [debouncedCallback as any, cancel]
}
