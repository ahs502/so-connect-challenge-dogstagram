import { useEffect } from 'react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const routeError = useRouteError()

  const navigate = useNavigate()

  useEffect(() => {
    if (isRouteErrorResponse(routeError) && routeError.status === 404) {
      navigate('/', { replace: true })
    }
  }, [routeError])

  console.log(...[routeError, 'routeError ='].reverse()) //!Delete it

  return <>ErrorPage!</>
}
