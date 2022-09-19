import { useAuthenticationCheck } from './useAuthenticationCheck'

export function DogsPage() {
  useAuthenticationCheck({ shouldBeAuthenticated: true })

  return <>Here are the dogs!</>
}
