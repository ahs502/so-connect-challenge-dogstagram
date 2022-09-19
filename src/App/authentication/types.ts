import { Dispatch, SetStateAction } from 'react'

export interface Authentication {
  readonly authenticatedUserId: string | undefined
  readonly setAuthenticatedUserId: Dispatch<SetStateAction<string | undefined>>
}
