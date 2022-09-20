import { RefObject } from 'react'
import { useWatchSize } from './useWatchSize'

export function Item({
  render,
  onResize,
}: {
  render: (provided: { rootRef: RefObject<HTMLElement> }) => JSX.Element | null
  onResize: (height: number) => void
}) {
  const { elementRef } = useWatchSize({
    resizeObserverOptions: {
      box: 'border-box',
    },
    onResize(element) {
      setTimeout(() => {
        onResize(element?.offsetHeight ?? 0)
      }, 100)
    },
  })

  return render({ rootRef: elementRef })
}
