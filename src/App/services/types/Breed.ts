import { Image } from './Image'

export interface Breed {
  /** @example { "imperial": "30 - 60", "metric": "14 - 27" } */
  readonly weight: Readonly<Record<'imperial' | 'metric', string>>

  /** @example { "imperial": "17 - 21", "metric": "43 - 53" } */
  readonly height: Readonly<Record<'imperial' | 'metric', string>>

  /** @example 15 */
  readonly id: number

  /** @example "American Pit Bull Terrier" */
  readonly name: string

  /** @example "US" */
  readonly countryCode?: string

  /** @example "Fighting" */
  readonly bredFor?: string

  /** @example "Terrier" */
  readonly breedGroup?: string

  /** @example "10 - 15 years" */
  readonly lifeSpan: string

  /** @example "Strong Willed, Stubborn, Friendly, Clownish, Affectionate, Loyal, Obedient, Intelligent, Courageous" */
  readonly temperament: string

  /** @example "HkC31gcNm" */
  readonly referenceImageId: Image['id']
}
