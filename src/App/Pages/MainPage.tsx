import {
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { authenticatedUserIdLocalStorageEntry } from '../authenticatedUserIdLocalStorageEntry'
import { Logo } from '../Logo'
import { useAuthenticationCheck } from './useAuthenticationCheck'

const useStyles = makeStyles({ name: 'MainPage' })((theme, _, classes) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
  },
  body: {
    width: '100%',
    minHeight: '100%',
  },
}))

const routes: readonly { readonly title: string; readonly path: string }[] = [
  { title: 'Dogs', path: '/dogs' },
  { title: 'Breeds', path: '/breeds' },
  { title: 'Favorites', path: '/favorites' },
]

export function MainPage() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [confirmSignOutDialogOpen, setConfirmSignOutDialogOpen] = useState(false)

  const mainMenuAnchorRef = useRef<HTMLButtonElement>(null)
  const userMenuAnchorRef = useRef<HTMLButtonElement>(null)

  const { authenticatedUserId } = useAuthenticationCheck({ shouldBeAuthenticated: true })

  const location = useLocation()

  const navigatedRoute = useMemo(() => routes.find(route => location.pathname.startsWith(route.path)), [location])

  const navigate = useNavigate()

  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar sx={theme => ({ display: 'flex', gap: theme.spacing(2) })}>
          <>
            <IconButton
              ref={mainMenuAnchorRef}
              edge="start"
              color="inherit"
              sx={{ display: { sm: 'none' } }}
              onClick={() => setMainMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              open={mainMenuOpen}
              anchorEl={mainMenuAnchorRef.current}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              PaperProps={{ sx: theme => ({ minWidth: theme.spacing(20) }) }}
              onClose={() => setMainMenuOpen(false)}
            >
              {routes.map((route, index) => (
                <MenuItem
                  key={index}
                  selected={route === navigatedRoute}
                  onClick={() => {
                    setMainMenuOpen(false)
                    navigate(route.path)
                  }}
                >
                  {route.title}
                </MenuItem>
              ))}
            </Menu>
          </>

          <Logo size={4} />

          <Typography variant="h6">Dogstagram</Typography>

          <Box
            sx={theme => ({
              marginLeft: theme.spacing(2),
              display: { xs: 'none', sm: 'inline-flex' },
              gap: theme.spacing(1),
            })}
          >
            {routes.map((route, index) => (
              <Button
                key={index}
                variant={route === navigatedRoute ? 'outlined' : 'text'}
                color="inherit"
                onClick={() => {
                  navigate(route.path)
                }}
              >
                {route.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <>
            <IconButton ref={userMenuAnchorRef} edge="end" color="inherit" onClick={() => setUserMenuOpen(true)}>
              <Avatar sx={theme => ({ width: theme.spacing(4), height: theme.spacing(4), color: 'inherit' })}>
                <PersonIcon />
              </Avatar>
            </IconButton>

            <Menu
              open={userMenuOpen}
              anchorEl={userMenuAnchorRef.current}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              PaperProps={{ sx: theme => ({ minWidth: theme.spacing(30) }) }}
              MenuListProps={{ disablePadding: true }}
              onClose={() => setUserMenuOpen(false)}
            >
              <List>
                <MenuItem>
                  <ListItemAvatar>
                    <Avatar sx={theme => ({ width: theme.spacing(4), height: theme.spacing(4), color: 'inherit' })}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={authenticatedUserId} secondary="User ID" />
                </MenuItem>
              </List>

              <Divider />

              <List>
                <MenuItem
                  onClick={() => {
                    setUserMenuOpen(false)
                    navigate('/settings')
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>

                <MenuItem
                  sx={theme => ({ color: theme.palette.error.main })}
                  onClick={() => {
                    setUserMenuOpen(false)
                    setConfirmSignOutDialogOpen(true)
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>Sign out</ListItemText>
                </MenuItem>
              </List>
            </Menu>
          </>
        </Toolbar>
      </AppBar>

      <Dialog open={confirmSignOutDialogOpen} onClose={() => setConfirmSignOutDialogOpen(false)}>
        <DialogTitle>Are you sure to sign out?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your data will be preserved for you!
            <br />
            Please, sign-in again with your User ID "<strong>{authenticatedUserId}</strong>" next time soon!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setConfirmSignOutDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setConfirmSignOutDialogOpen(false)
              authenticatedUserIdLocalStorageEntry.delete()
            }}
          >
            Sign out
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.body}>
        <Outlet />
      </div>
    </div>
  )
}
