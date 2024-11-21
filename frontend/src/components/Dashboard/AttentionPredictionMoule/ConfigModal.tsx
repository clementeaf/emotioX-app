import { Box, Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import close from '../../../assets/close.png';
import heat from '../../../assets/heat.png';
import sun from '../../../assets/sun.png';
import analysis from '../../../assets/analysis.png';
import { Setter } from "./Setter";
import { PredictionModel } from "./PredictionModel";

export function ConfigModal({handleClose}: {handleClose: () => void}) {
    return (
      <Box sx={{
        position: 'absolute',
        zIndex: 10,
        top: '0px',
        bottom: '0px',
        right: '0px',
        left: '0px',
        bgcolor: 'rgba(128, 128, 128, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box sx={{
          width: '1200px',
          height: '640px',
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Stack sx={{
            borderBottom: `1px solid ${grey[300]}`,
            py: 1.3,
            pl: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Typography fontSize={16} fontWeight={500} lineHeight='24px' color='#262626'>Respondents ID’ settings</Typography>
            <Button variant='text' sx={{
              p: 0,
            }}
            onClick={handleClose}>
              <img src={close} alt="close" style={{ width: '14px' }} />
            </Button>
          </Stack>
  
          <Stack sx={{
            width: '100px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 2,
          }}>
            <Stack sx={{
              border: `1px solid ${grey[300]}`,
              mt: 2,
              ml: 2,
              width: '801px',
            }}>
              <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
                <Stack sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                  <Typography fontWeight={500} fontSize={12} color='#252BE6' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src={heat} alt="heat" style={{ width: '14px' }} />
                    Heat map
                  </Typography>
                  <Typography fontWeight={500} fontSize={12} color='#565656' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src={sun} alt="sun" style={{ width: '14px' }} />
                    Opacity map
                  </Typography>
                  <Button variant='contained' sx={{ width: '140px' }}>
                    <Typography textTransform='initial' fontWeight={400} fontSize={14} >Download image</Typography>
                  </Button>
                </Stack>
              </Stack>
              <img src={analysis} alt="analysis" style={{ width: '801px' }} />
            </Stack>
            <Stack sx={{
              width: '350px',
              height: '498px',
              mt: 2,
              gap: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
              <Setter title='Blur' description='Set the range of the blur radius'/>
              <Setter title='Opacity' description='Set the opacity range in percentage'/>
              <Setter title='Treshold' description='Set the minimum value to consider in the map'/>
              <PredictionModel title='Prediction model' description='Set model to be used'/>
            </Stack>
          </Stack>
        </Box>
      </Box>
    )
  }