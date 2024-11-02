import { Box, Typography } from '@mui/material'
import WelcomeScreen from '../../../core-ui/Forms/WelcomeScreen'
import { TechniqueDescription } from '../../../core-ui/Forms/TechniqueDescription'

export default function index() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
    }}>
      <Typography color='#262626' fontWeight={700} fontSize={20} lineHeight='28px'>AIM Framework Stage 3’s name</Typography>
      <Box sx={{
        display: 'flex',
        width: 1134,
        height: 623,
        gap: 3,
      }}>
        <WelcomeScreen />
        <TechniqueDescription />
      </Box>
    </Box>
  )
}
