import { useState } from 'react';
import { Box, Tab, Tabs, Button } from '@mui/material';
import heatMap from '../assets/heatMapAnalysis.png';
// import RespondentTable from './Tables/RespondentTable';

// Componente principal
export const HeatmapComponent = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    // Control de las pestañas
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ p: 2, width: 800, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#fff' }}>
            {/* Navegación de pestañas */}
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="heatmap tabs"
                sx={{ mb: 2, display: 'flex', alignItems: 'center', height: 40 }}
            >
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                <Tab label="Heat map" iconPosition="start" icon={<Box component="span" sx={{ color: '#FF6B6B' }}>🔥</Box>} />
                <Tab label="Opacity map" iconPosition="start" icon={<Box component="span" sx={{ color: '#FFD700' }}>☀️</Box>} />
                <Tab label="Scan Path" iconPosition="start" icon={<Box component="span" sx={{ color: '#3A86FF' }}>👁️</Box>} />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: 'none', bgcolor: '#3A86FF', ':hover': { bgcolor: '#2B5FBB' }, height: 40 }}
                        onClick={() => alert('Descargar imagen')}
                    >
                        Download image
                    </Button>
                </Box>
            </Tabs>

            {/* Contenedor de la imagen */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '800px',
                height: '100%',
                mb: 2,
            }}>
                <Box sx={{ position: 'relative', width: 800, height: 473, overflow: 'hidden' }}>
                    <img src={heatMap} alt='heat map analysis' style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }} />
                </Box>
                {/* <RespondentTable /> */}
            </Box>
        </Box>
    );
};
