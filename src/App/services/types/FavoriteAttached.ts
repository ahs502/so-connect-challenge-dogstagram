import { Favorite } from './Favorite'
import { Image } from './Image'

export interface FavoriteAttached extends Favorite {
  readonly imageUrl: Image['url']
}
