import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { matchSorter } from 'match-sorter'
import { useMemo, useState } from 'react'
import { useEffectOnce } from 'react-use'
import { BreedAttached, services } from '../services'
import { ScreenLoader } from './ScreenLoader'
import { ScreenMessage } from './ScreenMessage'

export function BreedsPage() {
  const [breeds, setBreeds] = useState<readonly BreedAttached[]>()
  const [query, setQuery] = useState('')
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('metric')

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

  const theme = useTheme()

  if (!filteredBreeds) return <ScreenLoader />

  return (
    <>
      <Toolbar
        sx={theme => ({ margin: theme.spacing(2, 0), display: 'flex', alignItems: 'center', gap: theme.spacing(2) })}
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
                <IconButton onClick={() => setQuery('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
          value={query}
          onChange={event => setQuery(event.target.value)}
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
      </Toolbar>

      {filteredBreeds.length > 0 ? (
        <Container
          maxWidth="sm"
          sx={theme => ({
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(3),
            paddingBottom: theme.spacing(4),
          })}
        >
          {filteredBreeds.map(breed => (
            <Card key={breed.id}>
              <CardActionArea
                onClick={() => {
                  // TODO: Open breed filtered dogs
                }}
              >
                <CardMedia
                  component="img"
                  height={theme.spacing(50)}
                  image={breed.referenceImage.url}
                  alt={breed.name}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {breed.name}
                  </Typography>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" display="inline" color="text.secondary">
                        Weight:&nbsp;
                      </Typography>
                      <Typography variant="subtitle1" display="inline">
                        {breed.weight[unitSystem]}&nbsp;{unitSystem === 'metric' ? 'Kg' : 'lb'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" display="inline" color="text.secondary">
                        Height:&nbsp;
                      </Typography>
                      <Typography variant="subtitle1" display="inline">
                        {breed.height[unitSystem]}&nbsp;{unitSystem === 'metric' ? 'cm' : 'in'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" display="inline" color="text.secondary">
                        Life span:&nbsp;
                      </Typography>
                      <Typography variant="subtitle1" display="inline">
                        {breed.lifeSpan}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" display="inline" color="text.secondary">
                        Country:&nbsp;
                      </Typography>
                      <Typography variant="subtitle1" display="inline">
                        {breed.countryCode || <>&ndash;</>}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" display="inline" color="text.secondary">
                        Group:&nbsp;
                      </Typography>
                      <Typography variant="subtitle1" display="inline">
                        {breed.breedGroup || <>&ndash;</>}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" display="inline" color="text.secondary">
                        Bred for:&nbsp;
                      </Typography>
                      <Typography variant="subtitle1" display="inline">
                        {breed.bredFor || <>&ndash;</>}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" display="inline" color="text.secondary">
                        Temperament:&nbsp;
                      </Typography>
                      <Typography variant="subtitle1" display="inline">
                        {breed.temperament}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Container>
      ) : (
        <ScreenMessage>Nothing found!</ScreenMessage>
      )}
    </>
  )
}
