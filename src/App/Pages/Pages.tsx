import { createBrowserRouter, createHashRouter, RouteObject, RouterProvider } from 'react-router-dom'
import { config } from '../../config'
import { BreedsPage } from './BreedsPage'
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

const routes: RouteObject[] = [
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
            path: '/breeds',
            element: <BreedsPage />,
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
]

const router = config.nodeEnvironment === 'development' ? createBrowserRouter(routes) : createHashRouter(routes)
