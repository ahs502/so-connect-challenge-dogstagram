import { Box, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { themePalleteModeLocalStorageEntry } from '../styling'

export function SettingsPage() {
  const themePalleteMode = themePalleteModeLocalStorageEntry.useRead()

  return (
    <Container
      maxWidth="sm"
      sx={theme => ({ padding: theme.spacing(6, 3), display: 'flex', flexDirection: 'column', gap: theme.spacing(6) })}
    >
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
      </Box>
    </Container>
  )
}
