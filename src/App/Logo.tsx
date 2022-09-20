import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles<{ size?: number }>({ name: 'Logo' })((theme, { size }, classes) => ({
  root:
    size !== undefined
      ? {
          width: theme.spacing(size),
          height: theme.spacing(size),
        }
      : {},
}))

export function Logo({
  size,
  className,
  ...otherProps
}: Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src' | 'alt'> & {
  size?: number
}) {
  const { classes, cx } = useStyles({ size })

  return <img src="android-chrome-192x192.png" alt="Logo" {...otherProps} className={cx(classes.root, className)} />
}
