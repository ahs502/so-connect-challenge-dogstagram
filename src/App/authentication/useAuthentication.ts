import { useContext } from 'react'
import { AuthenticationContext } from './AuthenticationContext'
import { Authentication } from './types'

export function useAuthentication(): Authentication {
  return useContext(AuthenticationContext)
}
