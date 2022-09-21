import { Breed } from '../../services'

export type UnitSystem = keyof (Breed['weight'] & Breed['height'])
