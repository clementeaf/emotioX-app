import { Box, Stack, Typography } from "@mui/material";
import happy from '../../assets/happy.png';

export function TechniqueDescription() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '267px',
            height: '623px',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: 3,
                width: '100%',
                height: '200px',
                bgcolor: '#252BE6',
                color: 'white',
            }}>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    p: 4
                }}>
                    <Typography fontSize={20} fontWeight={700} lineHeight='28px' textTransform="initial" mb={2}>
                        Technique
                    </Typography>
                    <Typography width={217} fontSize={14} fontWeight={400} lineHeight='22px' textTransform="initial">
                        Get started with notes for better consumer neurosciences research
                    </Typography>
                    <img src={happy} alt="happy" style={{ width: '36px', marginLeft: 180 }} />
                </Stack>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%',
                bgcolor: 'white',
            }}>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    pl: 3,
                }}>
                    <Typography fontSize={16} fontWeight={700} lineHeight='24px' textTransform="initial" mt={2} color="#1D1D1D" p={0}>
                        AIM Framework Stage 3:
                    </Typography>
                    <Typography fontSize={16} fontWeight={700} lineHeight='24px' textTransform="initial" mb={2} color="#1D1D1D" p={0}>
                        Smart VOC
                    </Typography>
                    <Typography fontSize={14} fontWeight={700} lineHeight='22px' textTransform="initial"  color="#252BE6">
                        Notes:
                    </Typography>
                    <Typography fontSize={14} fontWeight={700} lineHeight='22px' textTransform="initial" mb={2} color="#8C8C8C" width={219}>
                        By default, this research includes key metrics fo your Customer Experience program. Here you can find basic metrics to measure a key interaction like CSAT, CES, CV and VOC, but also you can find metrics to estimate the relationship with your clients and the experiences they are building with your brand, so, NPS and NEV will be a must have metrics to track the loyalty of your users.
                    </Typography>
                </Stack>
            </Box>
        </Box>
    )
}