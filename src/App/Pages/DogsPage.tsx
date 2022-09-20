import { Box, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRef } from 'react'
import { useState } from 'react'
import { useScrollbarWidth } from 'react-use'
import { config } from '../../config'
import { useInfiniteScroll } from '../../useInfiniteScroll'
import { Image, ImageAttached, services } from '../services'
import { MasonryLayout } from './MasonryLayout'

export function DogsPage() {
  const [images, setImages] = useState<readonly ImageAttached[]>([])
  const [totalCount, setTotalCount] = useState(1) // Any initial value more than 0 while having an empty array of items, causes at least one initial request

  const noMoreImages = images.length >= totalCount

  const imageDictionaryRef = useRef<Record<Image['id'], ImageAttached>>({}) // Helps to efficiently remove items with the same ID

  useInfiniteScroll({
    disabled: noMoreImages,
    threshold: {
      px: 500,
      vh: 200,
    },
    async onReachingEnd() {
      try {
        const response = await services.searchImages({
          page: Math.floor(images.length / config.theDogApi.recommendedLimit),
          limit: config.theDogApi.recommendedLimit,
          order: 'asc',
        })
        const filteredDuplicatedImages = response.images.filter(image => {
          if (image.id in imageDictionaryRef.current) return false
          imageDictionaryRef.current[image.id] = image
          return true
        })
        setImages(current => [...current, ...filteredDuplicatedImages])
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
        items={images}
        getKey={item => item.id}
        render={({ item, rootRef, top, left, width, hidden }) => (
          <img
            ref={rootRef as any}
            src={item.url}
            alt=""
            style={{
              position: 'absolute',
              top,
              left,
              width,
              opacity: hidden ? 0 : 1,
            }}
          />
        )}
        maximumColumnWidth={Number(theme.spacing(35).slice(0, -2))}
        gap={Number(theme.spacing(2).slice(0, -2))}
        paddingByGap
      />

      {!noMoreImages && (
        <Box sx={theme => ({ padding: theme.spacing(10, 0), textAlign: 'center' })}>
          <CircularProgress size={theme.spacing(5)} color="primary" />
        </Box>
      )}
    </div>
  )
}
