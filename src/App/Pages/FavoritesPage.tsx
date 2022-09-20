import { Box, CircularProgress, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState, useRef } from 'react'
import { useMountedState, useScrollbarWidth } from 'react-use'
import { config } from '../../config'
import { useInfiniteScroll } from '../../useInfiniteScroll'
import { Favorite, FavoriteAttached, services } from '../services'
import { MasonryLayout } from './MasonryLayout'

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<readonly FavoriteAttached[]>([])
  const [totalCount, setTotalCount] = useState(1) // Any initial value more than 0 while having an empty array of items, causes at least one initial request

  const noMoreFavorites = favorites.length >= totalCount

  const favoriteDictionaryRef = useRef<Record<Favorite['id'], FavoriteAttached>>({}) // Helps to efficiently remove items with the same ID

  const isMounted = useMountedState()

  useInfiniteScroll({
    disabled: noMoreFavorites,
    threshold: {
      px: 500,
      vh: 200,
    },
    async onReachingEnd() {
      try {
        const response = await services.getAllUserFavorites({
          page: Math.floor(favorites.length / config.theDogApi.recommendedLimit),
          limit: config.theDogApi.recommendedLimit,
        })
        if (!isMounted()) return
        const filteredDuplicatedFavorites = response.favorites.filter(favorite => {
          if (favorite.id in favoriteDictionaryRef.current) return false
          favoriteDictionaryRef.current[favorite.id] = favorite
          return true
        })
        setFavorites(current => [...current, ...filteredDuplicatedFavorites])
        setTotalCount(response.totalCount)
      } catch (error) {
        console.error(error)
      }
    },
  })

  const scrollbarWidth = useScrollbarWidth() ?? 0

  const theme = useTheme()

  return (
    <div>
      <MasonryLayout
        sx={{ width: `calc(100vw - ${scrollbarWidth}px)` }}
        items={favorites}
        getKey={item => item.id}
        render={({ item, rootRef, top, left, width, hidden }) => (
          <img
            ref={rootRef}
            src={item.imageUrl}
            alt=""
            style={{
              position: 'absolute',
              top,
              left,
              width,
              visibility: hidden ? 'hidden' : 'visible',
            }}
          />
        )}
        maximumColumnWidth={Number(theme.spacing(35).slice(0, -2))}
        gap={Number(theme.spacing(2).slice(0, -2))}
        paddingByGap
      />

      {!noMoreFavorites && (
        <Box sx={theme => ({ padding: theme.spacing(10, 0), textAlign: 'center' })}>
          <CircularProgress size={theme.spacing(5)} color="primary" />
        </Box>
      )}

      {noMoreFavorites && favorites.length === 0 && (
        <Box sx={theme => ({ padding: theme.spacing(10, 0), textAlign: 'center' })}>
          <Typography variant="subtitle1" color={theme.palette.text.secondary}>
            No favorites yet!
          </Typography>
        </Box>
      )}
    </div>
  )
}
