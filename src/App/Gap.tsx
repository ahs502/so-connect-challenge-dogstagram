import { useTheme } from '@mui/material/styles'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export function Gap({
  horizontal,
  vertical,
  px,
  grow,
  shrink,
  style,
  ...otherProps
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  horizontal?: number
  vertical?: number
  px?: boolean
  grow?: boolean | number
  shrink?: boolean | number
}) {
  const theme = useTheme()

  return (
    <div
      {...otherProps}
      style={{
        ...style,
        display: style?.display ?? 'inline-block',
        width: typeof horizontal === 'number' ? (px ? horizontal : theme.spacing(horizontal)) : style?.width,
        height: typeof vertical === 'number' ? (px ? vertical : theme.spacing(vertical)) : style?.height,
        flexGrow: typeof grow === 'number' ? grow : grow ? 1 : 0,
        flexShrink: typeof shrink === 'number' ? shrink : shrink ? 1 : 0,
      }}
    />
  )
}
