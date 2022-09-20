import { RefObject, useEffect, useRef } from 'react'

// TODO: Make it work with ref callbacks rather than ref object.
//       This way it'll become aware of ref changes.
//       But, make sure the resize observer isn't created/observing initially like in a useMemo().
//       Creation and observing of the observer should happen with a delay, like in a effect or so.
//       Otherwise, it won't detect resizing clearly.

export function useWatchSize<E extends HTMLElement = HTMLElement>(options: {
  disabled?: boolean
  resizeObserverOptions?: ResizeObserverOptions
  onResize(element: E | null): void
}): {
  elementRef: RefObject<E>
} {
  const optionsRef = useRef(options)
  optionsRef.current = options

  const elementRef = useRef<E>(null)

  useEffect(() => {
    if (!options.disabled && elementRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        optionsRef.current.onResize(elementRef.current)
      })
      resizeObserver.observe(elementRef.current)
      return () => {
        resizeObserver.disconnect()
        optionsRef.current.onResize(null)
      }
    }
  }, [Boolean(options.disabled)])

  return {
    elementRef,
  }
}
