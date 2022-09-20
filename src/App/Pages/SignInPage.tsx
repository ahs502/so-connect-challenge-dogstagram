import { Button, Divider, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useGetSet } from 'react-use'
import { makeStyles } from 'tss-react/mui'
import { config } from '../../config'
import { authenticatedUserIdLocalStorageEntry } from '../authenticatedUserIdLocalStorageEntry'
import { Logo } from '../Logo'
import { useAuthenticationCheck } from './useAuthenticationCheck'

const useStyles = makeStyles({ name: 'SignInPage' })((theme, _, classes) => ({
  root: {
    width: '100%',
    height: '100vh',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  },
  paper: {
    width: theme.spacing(60),
  },
  logo: {
    marginTop: theme.spacing(3),
    alignSelf: 'center',
  },
  form: {
    width: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    overflow: 'hidden',
  },
}))

export function SignInPage() {
  const [userId, setUserId] = useState('')
  const [getUserIdError, setUserIdError] = useGetSet('')
  const [password, setPassword] = useState('')
  const [getPasswordError, setPasswordError] = useGetSet('')

  useAuthenticationCheck({ shouldBeAuthenticated: false })

  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={event => {
            event.preventDefault()
            setUserIdError(
              !userId ? 'User ID is required' : userId.length < 5 ? 'User ID should be at least 5 characters' : ''
            )
            setPasswordError(
              !password
                ? 'Password is required'
                : password !== `${userId}${config.passwordPostfix}`
                ? 'Password is incorrect'
                : ''
            )
            if (getUserIdError() || getPasswordError()) return
            authenticatedUserIdLocalStorageEntry.write(userId)
          }}
        >
          <Logo size={15} className={classes.logo} />

          <Typography variant="h5" gutterBottom alignSelf="center">
            Welcome to Dogstagram!
          </Typography>

          <Divider />

          <Typography variant="subtitle1">Sign in:</Typography>

          <TextField
            fullWidth
            label="User ID"
            autoComplete="off"
            value={userId}
            onChange={event => {
              setUserId(event.target.value)
              setUserIdError('')
            }}
            error={Boolean(getUserIdError())}
            helperText={getUserIdError()}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={event => {
              setPassword(event.target.value)
              setPasswordError('')
            }}
            error={Boolean(getPasswordError())}
            helperText={getPasswordError()}
          />

          <Button variant="contained" color="primary" fullWidth type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </div>
  )
}
