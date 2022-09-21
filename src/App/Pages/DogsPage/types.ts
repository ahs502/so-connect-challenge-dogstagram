import { Breed } from '../../services'

export interface Filters {
  readonly breedId?: Breed['id']
  readonly type: 'all' | 'jpg' | 'png' | 'gif'
  readonly order: 'random' | 'asc' | 'desc'
}
