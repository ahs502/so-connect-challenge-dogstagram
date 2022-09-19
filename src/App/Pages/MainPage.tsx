import { Outlet } from 'react-router-dom'
import { useAuthenticationCheck } from './useAuthenticationCheck'

export function MainPage() {
  useAuthenticationCheck({ shouldBeAuthenticated: true })

  return (
    <div>
      <div>Header...</div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
