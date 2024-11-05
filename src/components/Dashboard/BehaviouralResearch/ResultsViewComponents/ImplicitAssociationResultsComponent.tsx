import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import RadarChartComponent from '../../../../core-ui/Charts/RadarChartComponent';
import { grey } from '@mui/material/colors';
import FiltersPanel from '../../../../core-ui/FiltersPanel';
import { StackedBarChartComponent } from '../../../../core-ui/Charts/StackedBarChartComponent';
import HorizontalBarChartComponent from '../../../../core-ui/Charts/HorizontalBarChartComponent';

export default function ImplicitAssociationResultsComponent() {
    // State to track selected tab
    const [selectedTab, setSelectedTab] = useState(0);

    // Handle tab change
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '1134px',
            height: '100%',
            gap: 2,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 2,
                width: '845px',
                maxWidth: '845px',
                height: '943px',
                bgcolor: 'white',
            }}>
                <Box sx={{ width: '100%', borderBottom: `1px solid ${grey[300]}` }}>
                    <Typography m={2} fontWeight={700} fontSize={16} color='#212121'>
                        3.0.- Implicit Association
                    </Typography>
                </Box>

                {/* Tabs for switching between components */}
                <Tabs value={selectedTab} onChange={handleTabChange} sx={{ borderBottom: `1px solid ${grey[300]}`, width: '100%' }}>
                    <Tab label="Radar Chart" />
                    <Tab label="StackedBar Chart" />
                    <Tab label="HorizontalBar Chart" />
                </Tabs>

                {/* Render content based on the selected tab */}
                <Box sx={{ p: 2, width: '100%' }}>
                    {selectedTab === 0 && <RadarChartComponent />}
                    {selectedTab === 1 && <StackedBarChartComponent />}
                    {selectedTab === 2 && <HorizontalBarChartComponent />}
                </Box>
            </Box>

            {/* Filters Panel */}
            <Box>
                <FiltersPanel />
            </Box>
        </Box>
    );
}
