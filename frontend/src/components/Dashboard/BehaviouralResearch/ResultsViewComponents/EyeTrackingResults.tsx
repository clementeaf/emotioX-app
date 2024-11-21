import { Box, Typography } from '@mui/material'
import FiltersPanel from '../../../../core-ui/FiltersPanel';
import { Modal } from '../../AttentionPredictionMoule/Modal';
import { useState } from 'react';
import { PredictionModal } from './PredictionModa';
import EmotionFlowChart from '../../../../core-ui/Charts/EmotionFlowChart';
import GradientBar from '../../../../core-ui/Progress/GradientBar';

export default function EyeTrackingResults() {
    const [displatModal, setDisplatModal] = useState(false);
    
    const handleOpen = () => {
        setDisplatModal(!displatModal);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
            width: '100%',
            maxWidth: 1134,
            height: '100%',
            maxHeight: 11290,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                border: `1px solid #E0E0E0`,
                borderRadius: 1,
                gap: 2,
                width: '100%',
                maxWidth: 845,
                height: '100%',
                maxHeight: 11290,
                bgcolor: 'white',
            }}>
                <Box sx={{ borderBottom: `1px solid #E0E0E0`, width: '100%' }}>
                    <Typography m={2} color='#212121' fontSize={16} fontWeight={700}>5.0.- Eye Tracking</Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 2,
                    width: '100%',
                    maxWidth: 800,
                    maxHeight: '100%',
                    ml: 2,
                    mb: 2,
                    borderRadius: 1,
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <Typography color='#2B3674' mt={2} ml={2} fontSize={18} fontWeight={500}>Task description</Typography>
                    </Box>

                    <Box mb={2} width='100%'>
                        <Modal handleOpen={handleOpen} />
                    </Box>

                    <Box  mb={2} width='100%'>
                        <EmotionFlowChart maxWidth={800}/>
                    </Box>
                    <Box mb={2} width='100%'>
                        <GradientBar maxWidth={800} />
                    </Box>
                </Box>
            </Box>
            <FiltersPanel />
            {displatModal && <PredictionModal handleClose={handleOpen}/>}
        </Box>
    )
}