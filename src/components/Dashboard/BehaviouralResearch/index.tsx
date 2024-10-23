import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import FormNameAndEnable from '../../../core-ui/Forms/FormNameAndEnable';
import FormSorteable from '../../../core-ui/Forms/FormSorteable';

export default function index() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
            mb: 3,
        }}>
            <Typography sx={{ width: '100%' }} my={2} fontWeight={700} fontSize={20} lineHeight='28px' color='#262626' width='200px'>New Behavioural Research’s name</Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 3,
                width: '1134px',
            }}>
                {/** Form */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '844px',
                    border: `1px solid ${grey[300]}`,
                    borderRadius: '4px',
                    bgcolor: 'white',
                    minHeight: '396px',
                    maxHeight: 'auto',
                }}>
                    <FormNameAndEnable />
                    <FormSorteable />
                </Box>

                {/** technique description */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '267px',
                    height: '601px',
                    bgcolor: 'white',
                    borderRadius: '4px',
                    border: `1px solid ${grey[300]}`,
                }}>
                    <Box sx={{
                        width: '267px',
                        height: '200px',
                        bgcolor: '#252BE6',
                    }}>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}