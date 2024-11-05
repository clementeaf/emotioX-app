import { Box, Typography } from '@mui/material'
import RadarChartComponent from '../../../../core-ui/Charts/RadarChartComponent'
import { grey } from '@mui/material/colors'
import FiltersPanel from '../../../../core-ui/FiltersPanel'

export default function ImplicitAssociationResultsComponent() {
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
                height: '943px',
                bgcolor: 'white',
            }}>
                <Box sx={{ width: '100%', borderBottom: `1px solid ${grey[300]}` }}>
                    <Typography m={2} fontWeight={700} fontSize={16} color='#212121'>3.0.- Implicit Association</Typography>
                </Box>
                <RadarChartComponent />
            </Box>

            <Box>
                <FiltersPanel />
            </Box>
        </Box>
    )
}
