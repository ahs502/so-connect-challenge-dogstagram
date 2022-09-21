import { extendThemeOptions } from '../extendThemeOptions'
import { baseThemeOptions } from './baseThemeOptions'

export const lightThemeOptions = extendThemeOptions(baseThemeOptions, {
  palette: {
    mode: 'light',
  },
})
