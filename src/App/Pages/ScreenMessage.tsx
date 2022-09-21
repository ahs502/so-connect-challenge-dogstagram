import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { PropsWithChildren } from 'react'

export function ScreenMessage({ children }: PropsWithChildren<{}>) {
  const theme = useTheme()

  return (
    <Box sx={theme => ({ padding: theme.spacing(10, 0), textAlign: 'center' })}>
      <Typography variant="subtitle1" color={theme.palette.text.secondary}>
        {children}
      </Typography>
    </Box>
  )
}
