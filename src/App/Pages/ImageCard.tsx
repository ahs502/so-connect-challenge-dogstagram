import { Close as CloseIcon } from '@mui/icons-material'
import { AppBar, Box, BoxProps, Checkbox, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material'
import { forwardRef, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Logo } from '../Logo'
import { Breed, Favorite, Image } from '../services'

const useStyles = makeStyles({ name: 'ImageCard' })((theme, _, classes) => ({
  root: {
    minHeight: theme.spacing(10), //todo
    position: 'relative',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
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
    onClick,
    className,
    ...otherProps
  },
  ref
) {
  const [favoriting, setFavoriting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const { classes, cx } = useStyles()

  return (
    <>
      <Box
        ref={ref}
        {...otherProps}
        className={cx(classes.root, className)}
        component="div"
        onClick={event => {
          setDialogOpen(true)
          onClick?.(event)
        }}
      >
        <img src={imageUrl} alt="" className={classes.image} />

        <Checkbox
          sx={theme => ({ position: 'absolute', top: theme.spacing(1), right: theme.spacing(1) })}
          disabled={favoriting}
          checked={Boolean(favoriteId)}
          onChange={async () => {
            setFavoriting(true)
            if (favoriteId) {
              await onRemoveFromFavorites(favoriteId)
            } else {
              await onAddToFavorites(imageId)
            }
            setFavoriting(false)
          }}
        />
      </Box>

      {dialogOpen && (
        <Dialog open fullScreen onClose={() => setDialogOpen(false)}>
          <AppBar position="static">
            <Toolbar sx={theme => ({ display: 'flex', gap: theme.spacing(2) })}>
              <IconButton
                edge="start"
                color="inherit"
                sx={{ display: { sm: 'none' } }}
                onClick={() => setDialogOpen(false)}
              >
                <CloseIcon />
              </IconButton>

              <Logo size={4} />

              <Typography variant="h6">Dogstagram</Typography>

              <Checkbox
                disabled={favoriting}
                checked={Boolean(favoriteId)}
                onChange={async () => {
                  setFavoriting(true)
                  if (favoriteId) {
                    await onRemoveFromFavorites(favoriteId)
                  } else {
                    await onAddToFavorites(imageId)
                  }
                  setFavoriting(false)
                }}
              />

              <Box sx={{ flexGrow: 1 }} />

              <IconButton
                edge="end"
                color="inherit"
                sx={{ display: { xs: 'none', sm: 'block' } }}
                onClick={() => setDialogOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={imageUrl} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
})
