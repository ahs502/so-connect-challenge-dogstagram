import { Box, CircularProgress, ImageList, ImageListItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRef } from 'react'
import { useState } from 'react'
import { config } from '../../config'
import { useInfiniteScroll } from '../../useInfiniteScroll'
import { Image, ImageAttached, services } from '../services'

export function DogsPage() {
  const [images, setImages] = useState<readonly ImageAttached[]>([])
  const [totalCount, setTotalCount] = useState(1) // Any initial value more than 0 while having an empty array of images, causes at least one initial request

  const noMoreImages = images.length >= totalCount

  const imageDictionaryRef = useRef<Record<Image['id'], ImageAttached>>({}) // Helps to efficiently remove images with the same ID

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
        //TODO: Something better to do...
      }
    },
  })

  const theme = useTheme()

  return (
    <div>
      <ImageList variant="masonry" cols={3} gap={Number(theme.spacing(2).slice(0, -2))}>
        {images.map(image => (
          <ImageListItem key={image.id}>
            <img src={image.url} alt="" />
          </ImageListItem>
        ))}
      </ImageList>

      {!noMoreImages && (
        <Box sx={theme => ({ padding: theme.spacing(10, 0), textAlign: 'center' })}>
          <CircularProgress size={theme.spacing(5)} color="primary" />
        </Box>
      )}
    </div>
  )
}
