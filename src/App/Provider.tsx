import { PropsWithChildren } from 'react'
import { StylingProvider } from './styling'

export function Provider({ children }: PropsWithChildren<{}>) {
  return (
    <StylingProvider>
      <>{children}</>
    </StylingProvider>
  )
}
