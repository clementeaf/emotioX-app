import { Box, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { EnableSwitch } from '../Switch'

export default function FormNameAndEnable() {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '845px',
    }}>
        <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderBottom: `1px solid ${grey[300]}`,
        }}>
            <Typography fontSize='16px' fontWeight={700} p={2} color='#212121' lineHeight='24px'>1.0.- Screener</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                mr: 2,
            }}>
                <EnableSwitch />
            </Box>
        </Stack>
    </Box>
  )
}
