import {
  Check as CheckIcon,
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
import { useRef, useState } from 'react'
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
}))

export function MainPage() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const mainMenuAnchorRef = useRef<HTMLButtonElement>(null)
  const userMenuAnchorRef = useRef<HTMLButtonElement>(null)

  const { authenticatedUserId } = useAuthenticationCheck({ shouldBeAuthenticated: true })

  const location = useLocation()

  const navigatedToDogsPage = location.pathname.startsWith('/dogs')
  const navigatedToFavoritesPage = location.pathname.startsWith('/favorites')

  const navigate = useNavigate()

  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar sx={theme => ({ display: 'flex', gap: theme.spacing(2) })}>
          <>
            <IconButton ref={mainMenuAnchorRef} sx={{ display: { sm: 'none' } }} onClick={() => setMainMenuOpen(true)}>
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
              <MenuItem
                onClick={() => {
                  setMainMenuOpen(false)
                  navigate('/dogs')
                }}
              >
                <ListItemIcon>{navigatedToDogsPage && <CheckIcon />}</ListItemIcon>
                <ListItemText>Dogs</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setMainMenuOpen(false)
                  navigate('/favorites')
                }}
              >
                <ListItemIcon>{navigatedToFavoritesPage && <CheckIcon />}</ListItemIcon>
                <ListItemText>Favorites</ListItemText>
              </MenuItem>
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
            <Button
              variant={navigatedToDogsPage ? 'outlined' : 'text'}
              onClick={() => {
                navigate('/dogs')
              }}
            >
              Dogs
            </Button>

            <Button
              variant={navigatedToFavoritesPage ? 'outlined' : 'text'}
              onClick={() => {
                navigate('/favorites')
              }}
            >
              Favorites
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <>
            <IconButton ref={userMenuAnchorRef} onClick={() => setUserMenuOpen(true)}>
              <Avatar sx={theme => ({ width: theme.spacing(4), height: theme.spacing(4) })}>
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
                    <Avatar sx={theme => ({ width: theme.spacing(4), height: theme.spacing(4) })}>
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
                    authenticatedUserIdLocalStorageEntry.delete()
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

      <div>
        <Outlet />
      </div>
    </div>
  )
}
