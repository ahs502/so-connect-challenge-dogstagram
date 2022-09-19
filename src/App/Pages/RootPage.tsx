import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthentication } from '../authentication'

export function RootPage() {
  const { authenticatedUserId } = useAuthentication()

  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      if (!authenticatedUserId) {
        navigate('/signin', { replace: true })
      } else {
        navigate('/dogs', { replace: true })
      }
    }
  }, [authenticatedUserId, location])

  return <Outlet />
}
