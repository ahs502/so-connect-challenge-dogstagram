import { Button, Divider, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { config } from '../../config'
import { useAuthentication } from '../authentication'

const useStyles = makeStyles({ name: 'SignInPage' })((theme, _, classes) => ({
  root: {
    width: '100vw',
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
  form: {
    width: '100%',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    overflow: 'hidden',
  },
}))

export function SignInPage() {
  const [userId, setUserId] = useState('')
  const [userIdError, setUserIdError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { setAuthenticatedUserId } = useAuthentication()

  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={event => {
            event.preventDefault()
            if (!userId) {
              setUserIdError('User ID is required')
              return
            }
            if (!password) {
              setPasswordError('Password is required')
              return
            }
            // The rest is just mocking a server-side process in the real life:
            if (password !== config.password) {
              setPasswordError('Password is incorrect')
              return
            }
            setAuthenticatedUserId(userId)
          }}
        >
          <Typography variant="h5" gutterBottom alignSelf="center">
            🐶 Welcome to Dogstagram!
          </Typography>

          <Divider />

          <Typography variant="subtitle1">Please, sign in:</Typography>

          <TextField
            fullWidth
            label="User ID"
            value={userId}
            onChange={event => {
              setUserId(event.target.value)
              setUserIdError('')
            }}
            error={Boolean(userIdError)}
            helperText={userIdError}
          />

          <TextField
            fullWidth
            label="Password"
            value={password}
            onChange={event => {
              setPassword(event.target.value)
              setPasswordError('')
            }}
            error={Boolean(passwordError)}
            helperText={passwordError}
          />

          <Button variant="contained" color="primary" fullWidth type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </div>
  )
}
