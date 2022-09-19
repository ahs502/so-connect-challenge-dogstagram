import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticatedUserIdLocalStorageEntry } from '../authenticatedUserIdLocalStorageEntry'

export const useAuthenticationCheck: {
  (options: { shouldBeAuthenticated: true }): { authenticatedUserId: string }
  (options: { shouldBeAuthenticated: false }): { authenticatedUserId: null }
} = options => {
  const authenticatedUserId = authenticatedUserIdLocalStorageEntry.useRead()

  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (
      (options.shouldBeAuthenticated && !authenticatedUserId) ||
      (!options.shouldBeAuthenticated && authenticatedUserId)
    ) {
      navigate('/')
    }
  }, [options.shouldBeAuthenticated, authenticatedUserId])

  return {
    authenticatedUserId: authenticatedUserId as any,
  }
}
