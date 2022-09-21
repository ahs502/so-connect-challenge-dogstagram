import { Toolbar, ToolbarProps } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({ name: 'StickyToolbar' })((theme, _, classes) => ({
  root: {
    position: 'sticky',
    top: theme.spacing(6),
    padding: theme.spacing(4, 0, 2, 0),
    backgroundColor: theme.palette.background.default,
    zIndex: 1,
  },
}))

export function StickyToolbar({ className, ...otherProps }: ToolbarProps) {
  const { classes, cx } = useStyles()

  return <Toolbar {...otherProps} className={cx(classes.root, className)} />
}
