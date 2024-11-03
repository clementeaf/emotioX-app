import { Box, Typography } from '@mui/material';
import { LabelChips } from '../LabelChips';
import { CSATQuestion } from './CSATQuestion';
import { ResponsesCard } from '../Cards/ResponsesCard';

export default function HorizontalChart() {
    return (
        <Box sx={{
            width: 844,
            height: '358px',
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
                    alignItems: 'flex-start',
                    pt: 2,
                    pl: 2,
                    gap: 3,
                }}>
                    <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='black'>2.1.- Question: Customer Satisfaction Score (CSAT)</Typography>
                    <LabelChips />
                </Box>

                <Box sx={{
                    ml: 3,
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 4,
                    mt: 2,
                }}>
                    <CSATQuestion />
                    <ResponsesCard />
                </Box>
            </Box>
        </Box>
    )
}