import { North as NorthIcon, Shuffle as ShuffleIcon, South as SouthIcon } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Toolbar, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import { BreedAttached, services } from '../../services'
import { Filters } from './types'

export function FiltersToolbar({
  filters,
  onChangeFilters,
}: {
  filters: Filters
  onChangeFilters(filters: Filters): void
}) {
  const [breeds, setBreeds] = useState<readonly BreedAttached[]>()

  useEffectOnce(
    () =>
      void (async (): Promise<void> => {
        try {
          const response = await services.getAllBreeds()
          setBreeds(response.breads)
        } catch (error) {
          console.error(error)
        }
      })()
  )

  return (
    <Toolbar sx={theme => ({ marginTop: theme.spacing(2), gap: theme.spacing(2) })}>
      <FormControl sx={theme => ({ width: { xs: theme.spacing(15), sm: theme.spacing(25), md: theme.spacing(35) } })}>
        <InputLabel>Breed</InputLabel>
        <Select
          label="Breed"
          disabled={!breeds}
          value={String(filters.breedId ?? '-')}
          onChange={event => {
            onChangeFilters({
              ...filters,
              breedId: event.target.value === '-' ? undefined : Number(event.target.value),
            })
          }}
        >
          <MenuItem value="-">All</MenuItem>
          {breeds?.map(breed => (
            <MenuItem key={breed.id} value={String(breed.id)}>
              {breed.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={theme => ({ width: theme.spacing(12) })}>
        <InputLabel>Type</InputLabel>
        <Select
          label="Type"
          value={filters.type}
          onChange={event => {
            onChangeFilters({
              ...filters,
              type: event.target.value as Filters['type'],
            })
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="jpg">JPG</MenuItem>
          <MenuItem value="png">PNG</MenuItem>
          <MenuItem value="gif">GIF</MenuItem>
        </Select>
      </FormControl>

      <Tooltip
        title={
          filters.order === 'random'
            ? 'Random'
            : filters.order === 'asc'
            ? 'Ascending'
            : filters.order === 'desc'
            ? 'Descending'
            : '?'
        }
      >
        <IconButton
          onClick={() => {
            onChangeFilters({
              ...filters,
              order:
                filters.order === 'random'
                  ? 'asc'
                  : filters.order === 'asc'
                  ? 'desc'
                  : filters.order === 'desc'
                  ? 'random'
                  : 'asc',
            })
          }}
        >
          {filters.order === 'random' ? (
            <ShuffleIcon />
          ) : filters.order === 'asc' ? (
            <SouthIcon />
          ) : filters.order === 'desc' ? (
            <NorthIcon />
          ) : null}
        </IconButton>
      </Tooltip>

      <Box sx={{ flexGrow: 1 }} />

      <Button variant="text" color="primary" onClick={() => onChangeFilters({ type: 'all', order: 'asc' })}>
        Reset
      </Button>
    </Toolbar>
  )
}
