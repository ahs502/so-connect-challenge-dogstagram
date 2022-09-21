import { Box, BoxProps } from '@mui/material'
import { RefObject, useMemo, useRef, useState } from 'react'
import { useDebouncedCallback } from '../../useDebouncedCallback'
import { Item } from './Item'
import { useWatchSize } from './useWatchSize'

export function MasonryLayout<T>({
  items,
  getKey,
  render,
  maximumColumnWidth,
  gap = 0,
  paddingByGap,
  ...otherProps
}: BoxProps & {
  items: readonly T[]
  getKey: (item: T) => number | string
  render: (provided: {
    item: T
    rootRef: RefObject<any>
    top: number
    left: number
    width: number
    hidden: boolean
  }) => JSX.Element | null
  maximumColumnWidth: number
  gap?: number
  paddingByGap?: boolean
}) {
  const [rootWidth, setRootWidth] = useState(0)
  const [rootHeightObject, setRootHeightObject] = useState({ rootHeight: 0 })

  const columnCount = useMemo(
    () => Math.ceil((rootWidth + gap + (paddingByGap ? -2 * gap : 0)) / (maximumColumnWidth + gap)),
    [gap, maximumColumnWidth, rootWidth]
  )
  const columnWidth = useMemo(
    () => (rootWidth + gap + (paddingByGap ? -2 * gap : 0)) / columnCount - gap,
    [gap, rootWidth, columnCount]
  )

  const { elementRef } = useWatchSize({
    resizeObserverOptions: {
      box: 'content-box',
    },
    onResize(element) {
      setRootWidth(element?.clientWidth ?? 0)
    },
  })

  const itemPositionMapRef = useRef(
    new Map<
      T,
      {
        height: number
        top?: number
        left?: number
      }
    >()
  )

  const [restructureLayoutDebounced] = useDebouncedCallback(
    (): void => {
      const columnHeights = Array.from({ length: columnCount }, () => (paddingByGap ? gap : 0))
      let currentColumnIndex = 0
      items.forEach(iteratingItem => {
        const iteratingItemPosition = itemPositionMapRef.current.get(iteratingItem)
        if (!iteratingItemPosition) return
        itemPositionMapRef.current.set(iteratingItem, {
          ...iteratingItemPosition,
          top: columnHeights[currentColumnIndex],
          left: currentColumnIndex * (columnWidth + gap) + (paddingByGap ? gap : 0),
        })
        columnHeights[currentColumnIndex] += iteratingItemPosition.height + gap
        currentColumnIndex = 0
        columnHeights.forEach((columnHeight, index) => {
          if (index !== currentColumnIndex && columnHeight < columnHeights[currentColumnIndex]) {
            currentColumnIndex = index
          }
        })
      })
      const maximumColumnHeight = columnHeights.reduce((current, columnHeight) => Math.max(current, columnHeight))
      setRootHeightObject({ rootHeight: maximumColumnHeight + (paddingByGap ? 0 : -gap) })
    },
    300,
    1000
  )

  return (
    <Box
      {...otherProps}
      ref={elementRef}
      style={{
        ...otherProps.style,
        position: 'relative',
        height: rootHeightObject.rootHeight,
      }}
    >
      {items.map((item, index) => {
        const itemPosition = itemPositionMapRef.current.get(item)
        return (
          <Item
            key={getKey(item)}
            render={({ rootRef }) =>
              render({
                item,
                rootRef,
                top: itemPosition?.top ?? 0,
                left: itemPosition?.left ?? 0,
                width: columnWidth,
                hidden: itemPosition?.top === undefined || itemPosition.left === undefined,
              })
            }
            onResize={height => {
              itemPositionMapRef.current.set(item, { ...itemPosition, height })
              restructureLayoutDebounced()
            }}
          />
        )
      })}
    </Box>
  )
}
