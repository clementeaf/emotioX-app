import { Box, Stack, Typography } from '@mui/material';
import DotChart from '../../../core-ui/Charts/DotChart';
import { grey } from '@mui/material/colors';
import redDot from '../../../assets/redDot.png';
import blueDot from '../../../assets/blueDot.png';
import edit from '../../../assets/edit2.png';

const dummyData = [
  { time: '00', benefit: 14.6, attractiveness: 12.4 },
  { time: '03', benefit: 20.0, attractiveness: 18.5 },
  { time: '06', benefit: 36.0, attractiveness: 30.5 },
  { time: '09', benefit: 46.78, attractiveness: 44.35 },
  { time: '12', benefit: 32.9, attractiveness: 28.4 },
  { time: '15', benefit: 24.5, attractiveness: 22.9 },
  { time: '18', benefit: 28.6, attractiveness: 26.8 },
  { time: '21', benefit: 30.0, attractiveness: 28.3 },
  { time: '23', benefit: 25.7, attractiveness: 23.9 },
];

export default function ChartAndDescription() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      width: '1135px',
      height: '401px',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'white',
        border: `1px solid ${grey[200]}`,
        borderRadius: '4px',
        height: '387px',
        width: '768px',
      }}>
        {/** University research projects description */}
        <Stack sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '720px',
          height: '85px',
          mt: 2,
          gap: 2,
        }}>
          {/** University research projects */}
          <Stack sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <Typography fontWeight={700} fontSize={20} lineHeight='28px' color='#262626'>Universidad del Desarrollo</Typography>
            <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#8C8C8C'>23 research projects</Typography>
          </Stack>

          {/** Description of values at chart */}
          <Stack sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            {/** Red values */}
            <Stack sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}>
                <img src={redDot} alt='redDot' style={{ width: '8px', height: '8px' }} />
                <Stack sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                  <Typography fontWeight={700} fontSize={12} lineHeight='20px' color='#FF4D4F'>Visual Attractiveness</Typography>
                  <Typography fontWeight={700} fontSize={12} lineHeight='20px' color='#8C8C8C'>The Cost or difficulty of recognize the value of the product</Typography>
                </Stack>
              </Stack>
            </Stack>

            {/** Blue values */}
            <Stack sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}>
                <img src={blueDot} alt='blueDot' style={{ width: '8px', height: '8px' }} />
                <Stack sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                  <Typography fontWeight={700} fontSize={12} lineHeight='20px' color='#252BE6'>Benefit Association</Typography>
                  <Typography fontWeight={700} fontSize={12} lineHeight='20px' color='#8C8C8C'>The Benefit or ability to recognize the value of the product</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/** University research projects Chart */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '720px',
          height: '214px',
          mb: 2,
        }}>
          <DotChart data={dummyData} />
        </Box>
      </Box>

      <WhoIsContainer />
    </Box>
  )
}

function WhoIsContainer() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'white',
      width: '343px',
      height: '401PX',
      border: `1px solid ${grey[200]}`,
      borderRadius: '4px',
    }}>
      <Stack sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        mt: 3,
        mx: 3,
      }}>
        <Stack sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 1,
        }}>
          <Typography fontWeight={500} fontSize={20} lineHeight='16px' color='#1D1D1D'>Who is </Typography>
          <Typography fontWeight={300} fontSize={16} lineHeight='16px' color='#1D1D1D'>Universidad del Desarrollo?</Typography>
        </Stack>
          <img src={edit} alt="edit" style={{ width: '34.28px', height: '34.28px' }} />
      </Stack>
      <Typography fontSize={14} fontWeight={400} color='#8C8C8C'  width={280} height={264} alignSelf='justify' ml={3} mt={3}>The Universidad del Desarrollo (UDD) is a private autonomous university in Chile, with headquarters in Concepción and Santiago, specifically in the commune of Las Condes. It was founded by a group of academics and politicians in 1990. It is currently accredited by the National Accreditation Commission (CNA) for 6 years (of a maximum of 7), from October 2021 to October 2027, being the first Chilean private university. to receive said accreditation in all areas. </Typography>
    </Box>
  )
}