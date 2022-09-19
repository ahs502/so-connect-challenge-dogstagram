import { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticatedUserIdLocalStorageEntry } from '../authenticatedUserIdLocalStorageEntry'

export function useAuthenticationCheck(options: { shouldBeAuthenticated: boolean }): void {
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
}
