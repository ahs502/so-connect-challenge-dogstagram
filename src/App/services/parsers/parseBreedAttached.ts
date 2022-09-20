import { BreedAttached } from '../types/BreedAttached'
import { parseBreed } from './parseBreed'
import { parseImage } from './parseImage'

export function parseBreedAttached(data: any): BreedAttached {
  return {
    ...parseBreed(data),
    referenceImage: parseImage(data.image),
  }
}
