import { ImageAttached } from '../types/ImageAttached'
import { parseBreed } from './parseBreed'
import { parseImage } from './parseImage'

export function parseImageAttached(data: any): ImageAttached {
  return {
    ...parseImage(data),
    breeds: data.breeds.map(parseBreed),
    favoriteId: data.favourite ? data.favourite.id : undefined,
  }
}
