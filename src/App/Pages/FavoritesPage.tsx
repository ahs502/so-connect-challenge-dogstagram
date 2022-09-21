import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useMountedState, useScrollbarWidth } from 'react-use'
import { config } from '../../config'
import { useInfiniteScroll } from '../../useInfiniteScroll'
import { MasonryLayout } from '../MasonryLayout'
import { Favorite, FavoriteAttached, services } from '../services'
import { ImageCard } from './ImageCard'
import { imageSizeLocalStorageEntry } from './imageSizeLocalStorageEntry'
import { ScreenLoader } from './ScreenLoader'
import { ScreenMessage } from './ScreenMessage'

export function FavoritesPage() {
  const imageSize = imageSizeLocalStorageEntry.useRead()

  const [favorites, setFavorites] = useState<readonly FavoriteAttached[]>([])
  const [totalCount, setTotalCount] = useState(1) // Any initial value more than 0 while having an empty array of items, causes at least one initial request

  const noMoreFavorites = favorites.length >= totalCount

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
        setFavorites(current => {
          const favoriteDictionary = current.reduce<Record<Favorite['id'], FavoriteAttached>>(
            (dictionary, favorite) => {
              dictionary[favorite.id] = favorite
              return dictionary
            },
            {}
          )
          const notDuplicatedFavorites = response.favorites.filter(favorite => !(favorite.id in favoriteDictionary))
          return [...current, ...notDuplicatedFavorites]
        })
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
          <ImageCard
            ref={rootRef}
            style={{
              position: 'absolute',
              top,
              left,
              width,
              visibility: hidden ? 'hidden' : 'visible',
            }}
            imageId={item.imageId}
            imageUrl={item.imageUrl}
            favoriteId={item.id}
            favoriteCreatedAt={item.createdAt}
            breeds={undefined}
            onAddToFavorites={async imageId => {
              // Currently, we have no situation in the UI that ends up calling this callback:
              try {
                const { favoriteId } = await services.addUserFavorite({ imageId })
                const { favorite } = await services.getUserFavorite({ favoriteId })
                setFavorites(current => [...current, favorite])
              } catch (error) {
                console.error(error)
              }
            }}
            onRemoveFromFavorites={async favoriteId => {
              try {
                await services.removeUserFavorite({ favoriteId })
                setFavorites(current => {
                  const index = current.indexOf(item)
                  if (index < 0) return current
                  return [...current.slice(0, index), ...current.slice(index + 1)]
                })
              } catch (error) {
                console.error(error)
              }
            }}
          />
        )}
        maximumColumnWidth={Number(
          theme.spacing(imageSize === 'small' ? 30 : imageSize === 'large' ? 60 : 45).slice(0, -2)
        )}
        gap={Number(theme.spacing(2).slice(0, -2))}
        paddingByGap
      />

      {!noMoreFavorites && <ScreenLoader />}

      {noMoreFavorites && favorites.length === 0 && <ScreenMessage>No favorites yet!</ScreenMessage>}
    </div>
  )
}
