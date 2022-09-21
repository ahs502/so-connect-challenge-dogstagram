import { ThemeOptions } from '@mui/material'

export function extendThemeOptions(
  baseThemeOptions: ThemeOptions,
  ...extendingThemeOptionsArray: (ThemeOptions | false | null | undefined)[]
): ThemeOptions {
  return extendingThemeOptionsArray.reduce<ThemeOptions>(
    (themeOptions, extendingThemeOptions) =>
      extendingThemeOptions ? deepMerge(themeOptions, extendingThemeOptions) : themeOptions,
    baseThemeOptions
  )

  /**
   * Merges two objects deeply.
   * It has to work properly with Material-UI Theme Options data structure.
   */
  function deepMerge(base: any, extension: any): any {
    if (!base || base.constructor !== Object || extension.constructor !== Object) return extension

    const result: any = {}
    Object.keys(base).forEach(key => {
      result[key] = key in extension ? deepMerge(base[key], extension[key]) : base[key]
    })
    Object.keys(extension).forEach(key => {
      if (!(key in base)) {
        result[key] = extension[key]
      }
    })

    return result
  }
}
