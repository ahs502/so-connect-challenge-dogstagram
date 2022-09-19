import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export function Pages() {
  return <RouterProvider router={router} />
}
