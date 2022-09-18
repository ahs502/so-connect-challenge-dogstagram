import { Switch } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { themePalleteModeLocalStorageEntry } from '../styling'

export function Pages() {
  const theme = useTheme()

  return (
    <div>
      <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>

      <Switch
        checked={theme.palette.mode === 'light'}
        onChange={(event, checked) => {
          themePalleteModeLocalStorageEntry.write(checked ? 'light' : 'dark')
        }}
      />
    </div>
  )
}
