import { DependencyList, useEffect, useRef } from 'react'
import { useEffectOnce, useMountedState } from 'react-use'

export function useInfiniteScroll(
  {
    disabled,
    threshold,
    onReachingEnd,
  }: {
    disabled?: boolean
    threshold?: {
      px?: number
      vh?: number
    }
    onReachingEnd?(): void | Promise<void>
  },
  dependencies?: DependencyList
): void {
  const promiseRef = useRef<Promise<void> | null>(null)
  const checkRef = useRef(check)
  checkRef.current = check

  const isMounted = useMountedState()

  function check(): void {
    if (disabled || !onReachingEnd || promiseRef.current || !isMounted()) return

    const { clientHeight, scrollHeight, scrollTop } = window.document.documentElement
    const evaluatedThreshold = (threshold?.px ?? 0) + ((threshold?.vh ?? 0) * clientHeight) / 100
    const reachingEnd = scrollTop + clientHeight >= scrollHeight - evaluatedThreshold

    if (reachingEnd) {
      promiseRef.current = Promise.resolve(onReachingEnd()).then(() => {
        promiseRef.current = null
        // In order to make sure the component has done rendering new items:
        setTimeout(() => {
          checkRef.current()
        })
      })
    } else {
      // For cases that we miss any exact right opportunity to check,
      // this will make sure we will check again in a short time:
      setTimeout(() => {
        checkRef.current()
      }, 100)
    }
  }

  useEffectOnce(() => {
    check()

    window.addEventListener('scroll', handleEvent)
    window.addEventListener('resize', handleEvent)

    return () => {
      window.removeEventListener('scroll', handleEvent)
      window.removeEventListener('resize', handleEvent)
    }

    function handleEvent(): void {
      checkRef.current()
    }
  })

  useEffect(() => {
    check()
  }, [Boolean(disabled), Boolean(onReachingEnd), threshold?.px, threshold?.vh, ...(dependencies ?? [])])
}
