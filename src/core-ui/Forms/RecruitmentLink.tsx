import { Box, FormControlLabel, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { AntSwitch } from '../Switch'

export default function RecruitmentLink() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '556.5px',
            height: '813px',
            bgcolor: 'white',
            borderRadius: '4px',
            border: `1px solid ${grey[300]}`,
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: '54px',
                borderBottom: `1px solid ${grey[300]}`,
            }}>
                <Typography fontWeight={500} fontSize={16} lineHeight='28px' color='#262626' p={2}>
                    Recruitment link
                </Typography>
            </Box>

            {/** Demographic questions */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <FormControlLabel sx={{ p: 2 }} control={<AntSwitch />} label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Demographic questions</Typography>} labelPlacement="end" />
                <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#8C8C8C'>Please select</Typography>
            </Box>
        </Box>
    )
}
