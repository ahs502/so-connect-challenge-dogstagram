import { PropsWithChildren } from 'react'
import { AuthenticationProvider } from './authentication'
import { StylingProvider } from './styling'

export function Provider({ children }: PropsWithChildren<{}>) {
  return (
    <StylingProvider>
      <AuthenticationProvider>
        <>{children}</>
      </AuthenticationProvider>
    </StylingProvider>
  )
}
