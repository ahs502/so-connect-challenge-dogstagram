import { PaletteMode, ThemeOptions } from '@mui/material'
import { darkThemeOptions } from './theme-options/darkThemeOptions'
import { lightThemeOptions } from './theme-options/lightThemeOptions'

export function getThemeOptions(paletteMode: PaletteMode): ThemeOptions {
  switch (paletteMode) {
    case 'light':
      return lightThemeOptions

    case 'dark':
      return darkThemeOptions
  }
}
