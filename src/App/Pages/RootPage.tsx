import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { authenticatedUserIdLocalStorageEntry } from '../authenticatedUserIdLocalStorageEntry'

export function RootPage() {
  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      if (!authenticatedUserIdLocalStorageEntry.read()) {
        navigate('/signin', { replace: true })
      } else {
        navigate('/dogs', { replace: true })
      }
    }
  }, [location])

  return <Outlet />
}
