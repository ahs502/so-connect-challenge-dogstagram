import { PropsWithChildren, useMemo, useState } from 'react'
import { AuthenticationContext } from './AuthenticationContext'
import { Authentication } from './types'

export function AuthenticationProvider({ children }: PropsWithChildren<{}>) {
  const [authenticatedUserId, setAuthenticatedUserId] = useState<string>()

  const authentication = useMemo<Authentication>(
    () => ({
      authenticatedUserId,
      setAuthenticatedUserId,
    }),
    [authenticatedUserId]
  )

  return <AuthenticationContext.Provider value={authentication}>{children}</AuthenticationContext.Provider>
}
