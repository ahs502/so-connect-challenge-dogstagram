import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useGetSet, useMountedState, useScrollbarWidth, useUpdateEffect } from 'react-use'
import { config } from '../../../config'
import { useInfiniteScroll } from '../../../useInfiniteScroll'
import { MasonryLayout } from '../../MasonryLayout'
import { Image, ImageAttached, services } from '../../services'
import { ImageCard } from '../ImageCard'
import { imageSizeLocalStorageEntry } from '../imageSizeLocalStorageEntry'
import { ScreenLoader } from '../ScreenLoader'
import { ScreenMessage } from '../ScreenMessage'
import { FiltersToolbar } from './FiltersToolbar'

export function DogsPage() {
  const imageSize = imageSizeLocalStorageEntry.useRead()

  const [images, setImages] = useState<readonly ImageAttached[]>([])
  const [totalCount, setTotalCount] = useState(1) // Any initial value more than 0 while having an empty array of items, causes at least one initial request
  const [getFilters, setFilters] = useGetSet<FiltersToolbar.Filters>({ type: 'all', order: 'asc' })

  const noMoreImages = images.length >= totalCount

  useUpdateEffect(() => {
    setImages([])
    setTotalCount(1)
  }, [getFilters()])

  const isMounted = useMountedState()

  useInfiniteScroll({
    disabled: noMoreImages,
    threshold: {
      px: 500,
      vh: 200,
    },
    async onReachingEnd() {
      try {
        const filters = getFilters()
        const response = await services.searchImages({
          page: Math.floor(images.length / config.theDogApi.recommendedLimit),
          limit: config.theDogApi.recommendedLimit,
          breedId: filters.breedId,
          types: filters.type === 'all' ? undefined : [filters.type],
          order: filters.order,
        })
        if (!isMounted() || filters !== getFilters()) return
        setImages(current => {
          const imageDictionary = current.reduce<Record<Image['id'], ImageAttached>>((dictionary, image) => {
            dictionary[image.id] = image
            return dictionary
          }, {})
          const notDuplicatedImages = response.images.filter(image => !(image.id in imageDictionary))
          return [...current, ...notDuplicatedImages]
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
      <FiltersToolbar filters={getFilters()} onChangeFilters={setFilters} />

      <MasonryLayout
        sx={{ width: `calc(100vw - ${scrollbarWidth}px)` }}
        items={images}
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
            imageId={item.id}
            imageUrl={item.url}
            favoriteId={item.favoriteId}
            favoriteCreatedAt={undefined}
            breeds={item.breeds}
            onAddToFavorites={async imageId => {
              try {
                const { favoriteId } = await services.addUserFavorite({ imageId })
                // TODO: The right way to do this is to fetch the new item and replace it in the items array,
                // but TheDogApi doesn't provide such an end-point to get a single image WITH favorite data attached,
                // so we go the hacky way and mutate the item as a temporary workaround for now:
                const itemAsAny = item as any
                itemAsAny.favoriteId = favoriteId
                setImages(current => [...current])
              } catch (error) {
                console.error(error)
              }
            }}
            onRemoveFromFavorites={async favoriteId => {
              try {
                await services.removeUserFavorite({ favoriteId })
                // TODO: The right way to do this is to fetch the new item and replace it in the items array,
                // but TheDogApi doesn't provide such an end-point to get a single image WITH favorite data attached,
                // so we go the hacky way and mutate the item as a temporary workaround for now:
                const itemAsAny = item as any
                itemAsAny.favoriteId = undefined
                setImages(current => [...current])
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

      {!noMoreImages && <ScreenLoader />}

      {noMoreImages && images.length === 0 && <ScreenMessage>No images found!</ScreenMessage>}
    </div>
  )
}
