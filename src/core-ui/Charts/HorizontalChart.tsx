import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { LabelChips } from '../LabelChips';
import { CSATQuestion } from './CSATQuestion';
import { ResponsesCard } from '../Cards/ResponsesCard';

export default function HorizontalChart() {
    return (
        <Box sx={{
            width: '845px',
            height: '455.66px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: 1,
            display: 'flex',
            flexDirection: 'column',
        }}
        >
            <Box sx={{
                width: '844px',
                height: '358px',
                display: 'flex',
                flexDirection: 'column',
            }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottom: `1px solid ${grey[300]}`,
                    width: '100%',
                }}>
                    <Typography pl={2} pt={2} pb={2} fontWeight={700} fontSize={16} lineHeight='24px' color='#212121'>1.0.- Smart VOC</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    pt: 2,
                    pl: 2,
                    gap: 3,
                }}>
                    <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='black'>2.1.- Question: Customer Satisfaction Score (CSAT)</Typography>
                    <LabelChips />
                </Box>

                <Box sx={{
                    pl: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gap: 2,
                }}>
                    <CSATQuestion />
                    <ResponsesCard />
                </Box>
            </Box>
        </Box>
    )
}