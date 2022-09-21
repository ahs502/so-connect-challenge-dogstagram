import { Close as CloseIcon, Fullscreen as FullscreenIcon } from '@mui/icons-material'
import { AppBar, Box, BoxProps, Button, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material'
import { forwardRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { Logo } from '../../Logo'
import { Breed, Favorite, Image } from '../../services'
import { FavoriteButton } from './FavoriteButton'

const useStyles = makeStyles<void, 'image' | 'shadow' | 'fullscreen' | 'favorite'>({
  name: 'ImageCard',
})((theme, _, classes) => ({
  root: {
    minHeight: theme.spacing(8),
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    '&:hover': {
      [`& .${classes.image}`]: {
        transform: 'scale(1.03)',
      },
      [`& .${classes.shadow}`]: {
        opacity: 1,
      },
      [`& .${classes.fullscreen}`]: {
        opacity: 1,
      },
      [`& .${classes.favorite}`]: {
        opacity: 1,
      },
    },
  },
  image: {
    width: '100%',
    display: 'block', // No unintended bottom line occupied space
    transition: 'transform 0.25s',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: theme.spacing(8),
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7),  rgba(0, 0, 0, 0))',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  fullscreen: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    color: theme.palette.common.white,
    opacity: 0,
    transition: 'opacity 0.2s',
  },
  favorite: {
    position: 'absolute',
    top: theme.spacing(0),
    right: theme.spacing(0),
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
  const [dialogOpen, setDialogOpen] = useState(false)

  const navigate = useNavigate()

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

        <div className={classes.shadow} />

        <FullscreenIcon className={classes.fullscreen} />

        <FavoriteButton
          className={classes.favorite}
          favorited={Boolean(favoriteId)}
          onClick={async () => {
            if (favoriteId) {
              await onRemoveFromFavorites(favoriteId)
            } else {
              await onAddToFavorites(imageId)
            }
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

              <Box sx={{ flexGrow: 1 }} />

              <FavoriteButton
                fullOpacity
                favorited={Boolean(favoriteId)}
                onClick={async () => {
                  if (favoriteId) {
                    await onRemoveFromFavorites(favoriteId)
                  } else {
                    await onAddToFavorites(imageId)
                  }
                }}
              />

              <IconButton
                edge="end"
                color="inherit"
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                onClick={() => setDialogOpen(false)}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {breeds && breeds.length > 0 && (
              <Box
                sx={theme => ({
                  marginBottom: theme.spacing(2),
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing(2),
                  flexWrap: 'wrap',
                })}
              >
                <Typography variant="subtitle1">Breeds</Typography>
                {breeds.map(breed => (
                  <Button
                    key={breed.id}
                    onClick={() => {
                      navigate({ pathname: '/dogs', search: `breed_id=${breed.id}` })
                      setDialogOpen(false)
                    }}
                  >
                    {breed.name}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ height: 0, flex: 'auto', alignSelf: 'center', display: 'flex', alignItems: 'center' }}>
              <img
                src={imageUrl}
                alt=""
                style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }}
                onClick={() => setDialogOpen(false)}
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
})
