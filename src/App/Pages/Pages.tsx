import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DogsPage } from './DogsPage'
import { ErrorPage } from './ErrorPage'
import { FavoritesPage } from './FavoritesPage'
import { MainPage } from './MainPage'
import { RootPage } from './RootPage'
import { SettingsPage } from './SettingsPage'
import { SignInPage } from './SignInPage'

export function Pages() {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([
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
        path: '/',
        element: <MainPage />,
        children: [
          {
            path: '/dogs',
            element: <DogsPage />,
          },
          {
            path: '/favorites',
            element: <FavoritesPage />,
          },
          {
            path: '/settings',
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
])
