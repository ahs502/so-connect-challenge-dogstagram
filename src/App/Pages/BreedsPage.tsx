import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField, Toolbar } from '@mui/material'
import { matchSorter } from 'match-sorter'
import { useMemo, useState } from 'react'
import { useEffectOnce } from 'react-use'
import { BreedAttached, services } from '../services'
import { ScreenLoader } from './ScreenLoader'
import { ScreenMessage } from './ScreenMessage'

export function BreedsPage() {
  const [breeds, setBreeds] = useState<readonly BreedAttached[]>()
  const [query, setQuery] = useState('')

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

  const filteredBreeds = useMemo(
    () =>
      breeds === undefined
        ? undefined
        : !query
        ? breeds
        : matchSorter(breeds, query, { keys: ['name', 'countryCode', 'bredFor', 'breedGroup', 'temperament'] }),
    [breeds, query]
  )

  if (!filteredBreeds) return <ScreenLoader />

  return (
    <>
      <Toolbar sx={theme => ({ margin: theme.spacing(2, 0) })}>
        <TextField
          fullWidth
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
                <IconButton onClick={() => setQuery('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </Toolbar>

      {filteredBreeds.length > 0 ? (
        <>
          {filteredBreeds.map(breed => (
            <div key={breed.id}>{breed.name}</div>
          ))}
        </>
      ) : (
        <ScreenMessage>Nothing found!</ScreenMessage>
      )}
    </>
  )
}
