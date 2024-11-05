import { Box, Typography } from '@mui/material';
import DashboardMetrics from '../../../../core-ui/Charts/BriefCharts';
import { TechniqueDescription } from '../../../../core-ui/Forms/TechniqueDescription';
import UserDistributionCard from '../../../../core-ui/Cards/UserDistributionCard';
import UserStatsCard from '../../../../core-ui/Cards/UserStatsCard';
import { ResponsesCardV2 } from '../../../../core-ui/Cards/ResponsesCard';

export default function ResumenComponent() {
    return (
        <Box>
            <Typography>Analytic Overview from average research’s projects</Typography>
            {/** Mini Charts */}
            <Box mt={2} maxWidth={1134}>
                <DashboardMetrics />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                maxWidth: 1134,
                gap: 2,
                mt: 2,
            }}>
                {/** Charts and Tables */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: 845,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%',
                        maxWidth: 845,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        bgcolor: 'white',
                        border: `1px solid ${'#e0e0e0'}`,
                        borderRadius: 1,
                    }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 2, mb: 2, borderBottom: `1px solid ${'#e0e0e0'}`}}>
                            <Typography color='#212121' fontWeight={700} fontSize={16} lineHeight='24px' m={2}>1.0.- Screener</Typography>
                        </Box>

                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 2, mb: 2, ml: 2}}>
                            <Typography color='#212121' fontWeight={700} fontSize={14} lineHeight='24px'>Title of the screener section</Typography>
                            <Typography color='#212121' fontWeight={400} fontSize={14} lineHeight='24px'>Write a few questions, designed to weed out the folks who aren't your intended audience and capture the ones who are.</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            gap: 2,
                            width: '100%',
                            height: 'auto',
                            ml: 2,
                            mb: 2,
                        }}>
                            <UserDistributionCard />
                            <UserStatsCard />
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%',
                        maxWidth: 845,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        bgcolor: 'white',
                        border: `1px solid ${'#e0e0e0'}`,
                        borderRadius: 1,
                    }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 2, mb: 2, borderBottom: `1px solid ${'#e0e0e0'}`}}>
                            <Typography color='#212121' fontWeight={700} fontSize={16} lineHeight='24px' m={2}>2.0.- Welcome screen</Typography>
                        </Box>

                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 2, mb: 2, ml: 2}}>
                            <Typography color='#212121' fontWeight={700} fontSize={14} lineHeight='24px'>Title of the screener section</Typography>
                            <Typography color='#212121' fontWeight={400} fontSize={14} lineHeight='24px'>Write a few questions, designed to weed out the folks who aren't your intended audience and capture the ones who are.</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            gap: 2,
                            width: '100%',
                            height: 'auto',
                            ml: 2,
                            mb: 2,
                        }}>
                            <ResponsesCardV2 />
                            <ResponsesCardV2 />
                        </Box>
                    </Box>
                </Box>

                {/** Techniques description Column */}
                <Box>
                    <TechniqueDescription />
                </Box>
            </Box>
        </Box>
    )
}
