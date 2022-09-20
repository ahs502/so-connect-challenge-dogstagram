import { Star as StarIcon, StarOutline as StarOutlineIcon } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles<void, 'favorited' | 'favoriting' | 'fullOpacity'>({ name: 'FavoriteButton' })(
  (theme, _, classes) => ({
    favorite: {
      color: '#FFFF00',
      transition: 'opacity 0.2s, transform 0.8s',
      '& svg': {
        filter: 'drop-shadow(0 0 5px rgb(0 0 0 / 0.9))',
      },
      [`&:not(.${classes.favorited})`]: {
        opacity: 0.3,
        [`&.${classes.fullOpacity}`]: {
          opacity: 1,
        },
      },
      [`&.${classes.favorited}`]: {
        opacity: 1,
        transform: 'rotate(-0.6turn)',
      },
    },
    favorited: {},
    favoriting: {},
    fullOpacity: {},
  })
)

export function FavoriteButton({
  fullOpacity,
  favorited,
  onClick,
  disabled,
  className,
  ...otherProps
}: Omit<IconButtonProps, 'onClick'> & {
  fullOpacity?: boolean
  favorited: boolean
  onClick: () => void | Promise<void>
}) {
  const [favoriting, setFavoriting] = useState(false)

  const { classes, cx } = useStyles()

  return (
    <IconButton
      {...otherProps}
      className={cx(
        classes.favorite,
        favorited && classes.favorited,
        favoriting && classes.favoriting,
        fullOpacity && classes.fullOpacity,
        className
      )}
      disabled={disabled || favoriting}
      onClick={async event => {
        event.stopPropagation()
        setFavoriting(true)
        await onClick()
        setFavoriting(false)
      }}
    >
      {favorited ? <StarIcon /> : <StarOutlineIcon />}
    </IconButton>
  )
}
