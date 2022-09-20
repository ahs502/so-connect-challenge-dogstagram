import { Breed } from './Breed'
import { Image } from './Image'

export interface BreedAttached extends Breed {
  readonly referenceImage: Image
}
