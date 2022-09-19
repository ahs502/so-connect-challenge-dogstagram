import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './ErrorPage'
import { RootPage } from './RootPage'
import { SignInPage } from './SignInPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/signin',
        element: <SignInPage />,
      },
      {
        path: '/dogs',
        element: <div>Here are the dogs!</div>,
      },
    ],
  },
])
