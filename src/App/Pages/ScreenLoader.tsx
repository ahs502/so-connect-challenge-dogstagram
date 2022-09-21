import { Box, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export function ScreenLoader() {
  const theme = useTheme()

  return (
    <Box sx={theme => ({ padding: theme.spacing(10, 0), textAlign: 'center' })}>
      <CircularProgress size={theme.spacing(5)} color="primary" />
    </Box>
  )
}
