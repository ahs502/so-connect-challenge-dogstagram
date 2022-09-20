import { Breed } from '../types/Breed'

export function parseBreed(data: any): Breed {
  return {
    weight: data.weight,
    height: data.height,
    id: data.id,
    name: data.name,
    countryCode: data.country_code,
    bredFor: data.bred_for,
    breedGroup: data.breed_group,
    lifeSpan: data.life_span,
    temperament: data.temperament,
    referenceImageId: data.reference_image_id,
  }
}
