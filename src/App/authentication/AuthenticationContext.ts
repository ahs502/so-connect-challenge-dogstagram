import { createContext } from 'react'
import { Authentication } from './types'

export const AuthenticationContext = createContext<Authentication>({
  authenticatedUserId: undefined,
  setAuthenticatedUserId() {
    throw Error('Not provided.')
  },
})
