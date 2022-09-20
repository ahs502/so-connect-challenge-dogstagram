import { Box, BoxProps, Checkbox } from '@mui/material'
import { forwardRef, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Breed, Favorite, Image } from '../services'

const useStyles = makeStyles({ name: 'ImageCard' })((theme, _, classes) => ({
  root: {
    minHeight: theme.spacing(10), //todo
    position: 'relative',
  },
  image: {
    width: '100%',
  },
  checkbox: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}))

export const ImageCard = forwardRef<
  HTMLDivElement,
  Omit<BoxProps, 'component'> & {
    imageId: Image['id']
    imageUrl: string
    favoriteId: Favorite['id'] | undefined
    favoriteCreatedAt: Date | undefined
    breeds: readonly Breed[] | undefined
    onAddToFavorites: (imageId: Image['id']) => void | Promise<void>
    onRemoveFromFavorites: (favoriteId: Favorite['id']) => void | Promise<void>
  }
>(function ImageCard(
  {
    imageId,
    imageUrl,
    favoriteId,
    favoriteCreatedAt,
    breeds,
    onAddToFavorites,
    onRemoveFromFavorites,
    className,
    ...otherProps
  },
  ref
) {
  const [favoriting, setFavoriting] = useState(false)

  const { classes, cx } = useStyles()

  return (
    <Box ref={ref} {...otherProps} component="div" className={cx(classes.root, className)}>
      <img src={imageUrl} alt="" className={classes.image} />
      <Checkbox
        className={classes.checkbox}
        disabled={favoriting}
        checked={Boolean(favoriteId)}
        onChange={async (event, checked) => {
          if (!favoriteId && checked) {
            setFavoriting(true)
            await onAddToFavorites(imageId)
            setFavoriting(false)
          } else if (favoriteId && !checked) {
            setFavoriting(true)
            await onRemoveFromFavorites(favoriteId)
            setFavoriting(false)
          }
        }}
      />
    </Box>
  )
})
