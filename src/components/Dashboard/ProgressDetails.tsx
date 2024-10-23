import { Box, Stack, Typography } from '@mui/material';

export default function ProgressDetails() {
  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column' }}>
      <Typography fontWeight={300} mb={2}>
        Details
      </Typography>

      <Stack sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}>   
        <div style={{
            width: '1.5px',
            height: '85px',
            backgroundColor: 'green',
        }}>
            <div style={{
                position: 'relative',
                left: '-6px',
                top: '7px',
                backgroundColor: 'white',
                width: '10px',
                height: '10px',
                borderRadius: '100%',
                border: '2px solid green',
            }}/>
        </div>
        <Stack sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 0.5,
        }}>
            <Typography ml={2.5} color='green'>Loading images</Typography>
            <Typography ml={2.5} color='green' fontWeight={400} fontSize='14px' lineHeight='22px'>4 of 4 files (100%)</Typography>
        </Stack>
      </Stack>

      <Stack sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}>   
        <div style={{
            width: '1.5px',
            height: '85px',
            backgroundColor: 'blue',
        }}>
            <div style={{
                position: 'relative',
                left: '-6px',
                top: '7px',
                backgroundColor: 'white',
                width: '10px',
                height: '10px',
                borderRadius: '100%',
                border: '2px solid blue',
            }}/>
        </div>
        <Stack sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 0.5,
        }}>
            <Typography ml={2.5} color='#262626'>Processing images</Typography>
            <Typography ml={2.5} fontWeight={400} fontSize='14px' lineHeight='22px' color='#939393'>1 of 4 steps</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
