import { FavoriteAttached } from '../types/FavoriteAttached'
import { parseFavorite } from './parseFavorite'

export function parseFavoriteAttached(data: any): FavoriteAttached {
  return {
    ...parseFavorite(data),
    imageUrl: data.image.url,
  }
}
