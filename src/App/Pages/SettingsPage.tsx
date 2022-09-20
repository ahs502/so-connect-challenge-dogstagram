import { West as WestIcon } from '@mui/icons-material'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { themePalleteModeLocalStorageEntry } from '../styling'
import { imageSizeLocalStorageEntry } from './imageSizeLocalStorageEntry'

export function SettingsPage() {
  const themePalleteMode = themePalleteModeLocalStorageEntry.useRead()
  const imageSize = imageSizeLocalStorageEntry.useRead()

  const navigate = useNavigate()

  return (
    <Container
      maxWidth="sm"
      sx={theme => ({ padding: theme.spacing(6, 3), display: 'flex', flexDirection: 'column', gap: theme.spacing(6) })}
    >
      <Button
        sx={{ alignSelf: 'flex-start' }}
        onClick={() => {
          navigate('/dogs')
        }}
      >
        <WestIcon />
        &nbsp;&nbsp;Dogs
      </Button>

      <Box sx={theme => ({ display: 'flex', flexDirection: 'column', gap: theme.spacing(3) })}>
        <Typography variant="h5">Appearance</Typography>

        <FormControl fullWidth>
          <InputLabel>Theme</InputLabel>
          <Select
            label="Theme"
            value={themePalleteMode ?? 'system'}
            onChange={event => {
              themePalleteModeLocalStorageEntry.write(
                event.target.value === 'light' ? 'light' : event.target.value === 'dark' ? 'dark' : null
              )
            }}
          >
            <MenuItem value="system">System</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Image size</InputLabel>
          <Select
            label="Image size"
            value={imageSize}
            onChange={event => {
              imageSizeLocalStorageEntry.write(
                event.target.value === 'small' ? 'small' : event.target.value === 'large' ? 'large' : 'medium'
              )
            }}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  )
}
