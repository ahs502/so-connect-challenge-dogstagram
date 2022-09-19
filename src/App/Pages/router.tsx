import { createBrowserRouter } from 'react-router-dom'
import { SignInPage } from './SignInPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Root!</div>,
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
])
