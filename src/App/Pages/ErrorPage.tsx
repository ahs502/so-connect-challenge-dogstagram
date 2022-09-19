import { Button, Typography } from '@mui/material'
import { useLayoutEffect } from 'react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'

import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({ name: 'ErrorPage' })((theme, _, classes) => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(4),
  },
}))

export function ErrorPage() {
  const routeError = useRouteError()

  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (isRouteErrorResponse(routeError) && routeError.status === 404) {
      navigate('/', { replace: true })
    } else {
      console.error(routeError)
    }
  }, [routeError])

  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h5">Oops! Something unexpected happened.</Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          navigate('/')
        }}
      >
        Reset the page
      </Button>
    </div>
  )
}
