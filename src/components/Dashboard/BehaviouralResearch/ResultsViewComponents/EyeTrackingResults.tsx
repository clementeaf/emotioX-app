import { Box, Button, Typography } from '@mui/material'
import { HeatmapComponent } from '../../../../core-ui/HeatmapComponent'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function EyeTrackingResults() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
            width: '100%',
            height: '100%',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 2,
                width: '100%',
                maxWidth: 845,
                height: '100%',
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
                    height: '1066px',
                    border: `1px solid #E0E0E0`,
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

                    <Box maxWidth={800} mb={2}>
                        <HeatmapComponent />
                        <Box ml={3} maxWidth={710} display='flex' flexDirection='column' gap={0.6} width='100%'>
                        <AOICard />
                        <AOICard />
                        <AOICard />
                        <AOICard />
                    </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const AOICard: React.FC = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 800,
          padding: '16px',
          backgroundColor: '#F8FAFF',
          borderRadius: '8px',
          border: '1px solid #E0E0E0',
        }}
      >
        <Box
          sx={{
            width: '60px',
            height: '60px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #E0E0E0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '40px',
              height: '40px',
              backgroundColor: '#E0E0E0',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" color="textSecondary">
              Preview
            </Typography>
          </Box>
        </Box>
  
        {/* Text and Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, ml: 2 }}>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 500 }}>
            Area of Interest (AOI)
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 500 }}>
            #1
          </Typography>
          <Typography variant="body1" color="textSecondary">
            6s
          </Typography>
          <Typography variant="body1" sx={{ color: '#252BE6', fontWeight: 600 }}>
            14%
          </Typography>
          <PersonOutlineIcon sx={{ color: '#A0A0A0' }} />
          <Typography variant="body1" color="textSecondary">
            05
          </Typography>
          <FilterListIcon sx={{ color: '#A0A0A0' }} />
        </Box>
  
        {/* Remove Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'white',
            color: '#252BE6',
            textTransform: 'none',
            borderRadius: '6px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#F0F0F0',
              boxShadow: 'none',
            },
          }}
        >
          Remove AOI
        </Button>
      </Box>
    );
  };