import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { matchSorter } from 'match-sorter'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { BreedAttached, services } from '../../services'
import { ScreenLoader } from '../ScreenLoader'
import { ScreenMessage } from '../ScreenMessage'
import { FiltersToolbar } from './FiltersToolbar'

export function BreedsPage() {
  const [breeds, setBreeds] = useState<readonly BreedAttached[]>()
  const [debouncedQuery, setDebouncedQuery] = useState('')
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
        : !debouncedQuery
        ? breeds
        : matchSorter(breeds, debouncedQuery, {
            keys: ['name', 'countryCode', 'bredFor', 'breedGroup', 'temperament'],
          }),
    [breeds, debouncedQuery]
  )

  const navigate = useNavigate()

  const theme = useTheme()

  if (!filteredBreeds) return <ScreenLoader />

  return (
    <>
      <FiltersToolbar setDebouncedQuery={setDebouncedQuery} unitSystem={unitSystem} setUnitSystem={setUnitSystem} />

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
                  navigate({ pathname: '/dogs', search: `breed_id=${breed.id}` })
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
                        Lives:&nbsp;
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
