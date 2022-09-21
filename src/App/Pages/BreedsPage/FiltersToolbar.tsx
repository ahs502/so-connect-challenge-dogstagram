import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material'
import { TextField, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useDebouncedCallback } from '../../../useDebouncedCallback'
import { StickyToolbar } from '../StickyToolbar'
import { UnitSystem } from './types'

export function FiltersToolbar({
  setDebouncedQuery,
  unitSystem,
  setUnitSystem,
}: {
  setDebouncedQuery(query: string): void
  unitSystem: UnitSystem
  setUnitSystem(unitSystem: UnitSystem): void
}) {
  const [query, setQuery] = useState('')

  const [setQueryDebounced] = useDebouncedCallback((query: string): void => setDebouncedQuery(query), 400)

  return (
    <StickyToolbar
      sx={theme => ({
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
      })}
    >
      <TextField
        sx={{ flex: 'auto' }}
        label="Search"
        placeholder="e.g.: name, country, breed group, temperament, ..."
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setQuery('')
                  setDebouncedQuery('')
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        value={query}
        onChange={event => {
          setQuery(event.target.value)
          setQueryDebounced(event.target.value)
        }}
      />

      <FormControl sx={theme => ({ width: theme.spacing(15) })}>
        <InputLabel>Units</InputLabel>
        <Select
          label="Units"
          value={unitSystem}
          onChange={event => {
            setUnitSystem(event.target.value as any)
          }}
        >
          <MenuItem value="metric">Metric</MenuItem>
          <MenuItem value="imperial">Imperial</MenuItem>
        </Select>
      </FormControl>
    </StickyToolbar>
  )
}
