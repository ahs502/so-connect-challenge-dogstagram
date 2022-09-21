import { extendThemeOptions } from '../extendThemeOptions'
import { baseThemeOptions } from './baseThemeOptions'

export const darkThemeOptions = extendThemeOptions(baseThemeOptions, {
  palette: {
    mode: 'dark',
  },
})
