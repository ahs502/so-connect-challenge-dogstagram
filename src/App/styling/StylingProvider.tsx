import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PropsWithChildren, useMemo } from 'react'
import { getThemeOptions } from './getThemeOptions'
import { themePalleteModeLocalStorageEntry } from './themePalleteModeLocalStorageEntry'
import { useSystemThemePaletteMode } from './useSystemThemePaletteMode'

export function StylingProvider({ children }: PropsWithChildren<{}>) {
  const { systemThemePaletteMode } = useSystemThemePaletteMode()

  const themePaletteMode = themePalleteModeLocalStorageEntry.useRead()

  const theme = useMemo(() => {
    const evaluatedThemePaletteMode = themePaletteMode ?? systemThemePaletteMode
    const evaluatedThemeOptions = getThemeOptions(evaluatedThemePaletteMode)
    const evaluatedTheme = createTheme(evaluatedThemeOptions)
    return evaluatedTheme
  }, [systemThemePaletteMode, themePaletteMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
