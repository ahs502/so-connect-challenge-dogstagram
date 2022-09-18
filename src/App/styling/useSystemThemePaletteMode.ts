import { PaletteMode, useMediaQuery } from '@mui/material'
import { useMemo } from 'react'

export function useSystemThemePaletteMode(): {
  systemThemePaletteMode: PaletteMode
} {
  const systemThemePaletteMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'

  return useMemo(() => ({ systemThemePaletteMode }), [systemThemePaletteMode])
}
