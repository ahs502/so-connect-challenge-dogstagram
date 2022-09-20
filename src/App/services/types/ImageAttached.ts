import { Breed } from './Breed'
import { Favorite } from './Favorite'
import { Image } from './Image'

export interface ImageAttached extends Image {
  readonly breeds: readonly Breed[]
  readonly favoriteId?: Favorite['id']
}
