import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import user from '../../../assets/user.png';
import lintern from '../../../assets/lintern.png';

export function AnalysisBox({ image }: { image: string }) {
    return (
      <Box sx={{
        mt: 2,
        mx: 2,
        border: `1px solid ${grey[400]}`,
        borderRadius: 3,
        width: '760px',
        height: '100px',
        backgroundColor: '#F4F7FE',
        p: 1,
        display: 'flex',
        alignItems: 'center',
      }}>
        <img src={image} alt='image' style={{ width: '88.99px', height: '80px', border: `1px solid ${grey[400]}`, borderRadius: '5px' }} />
        <Typography fontWeight={500} fontSize='14px' lineHeight='14px' color='#A3AED0' ml={2}>
          Area of Interest (AOI)
        </Typography>
        <Typography fontWeight={500} fontSize='14px' lineHeight='14px' color='#2B3674' ml={1}>
          #1
        </Typography>
        <Typography fontWeight={500} fontSize='14px' lineHeight='14px' color='#A3AED0' ml={10}>
          6s
        </Typography>
        <Typography fontWeight={700} fontSize='14px' lineHeight='14px' color='#4318FF' ml={10}>
          14%
        </Typography>
        <img src={user} alt="user" style={{ width: '14px', marginLeft: 60 }} />
        <Typography fontWeight={500} fontSize='14px' lineHeight='14px' color='#A3AED0' ml={2}>
          05
        </Typography>
        <img src={lintern} alt="lintern" style={{ width: '14px', marginLeft: '18px' }} />
        <Button sx={{
          width: '111px',
          height: '40px',
          borderRadius: '4px',
          bgcolor: 'white',
          boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.1)',
          ml: 4,
        }}>
          <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#252BE6' textTransform='initial'>
            Remove AOI
          </Typography>
        </Button>
      </Box>
    )
  }