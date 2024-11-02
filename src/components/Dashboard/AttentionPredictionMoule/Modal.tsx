import { Box, Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import prediction from '../../../assets/prediction.png';
import video from '../../../assets/video.png';
import imageNotSelected from '../../../assets/imageNotSelected.png';
import config from '../../../assets/config.png';
import analysis from '../../../assets/analysis.png';
import any1 from '../../../assets/any1.png';
import any2 from '../../../assets/any2.png';
import any3 from '../../../assets/any3.png';
import any4 from '../../../assets/any4.png';
import { AnalysisBox } from "./AnalysisBox";

export function Modal({handleOpen}: {handleOpen: () => void}) {
    return (
    <Box sx={{
      border: `1px solid ${grey[300]}`,
      mt: 2,
      width: '801.5px',
      height: 'auto',
    }}>
      <Stack sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        p: 1,
        gap: 2.5,
        width: '100%',
      }}>
        <Typography fontSize={12} fontWeight={500} lineHeight='20px' color='#252BE6' display='flex' alignItems='center' gap={1}>
          <img src={prediction} alt="prediction" style={{ width: '11.81px' }} />
          Prediction
        </Typography>
        <Typography fontSize={12} fontWeight={500} lineHeight='20px' color='#565656' display='flex' alignItems='center' gap={1}>
          <img src={video} alt="video" style={{ width: '11.81px' }} />
          Attention Video
        </Typography>
        <Typography fontSize={12} fontWeight={500} lineHeight='20px' color='#565656' display='flex' alignItems='center' gap={1}>
          <img src={imageNotSelected} alt="image" style={{ width: '11.81px' }} />
          Image
        </Typography>
        <Button onClick={handleOpen} variant='text'>
          <Typography fontSize={12} fontWeight={500} lineHeight='20px' color='#565656' display='flex' alignItems='center' gap={1} ml={50} textTransform='initial'>
            <img src={config} alt="config" style={{ width: '11.81px' }} />
            Settings
          </Typography>
        </Button>
      </Stack>
      <div style={{
        height: '1px',
        width: '100%',
        backgroundColor: grey[300],
      }} />
      <img src={analysis} alt="analysis" style={{ width: '801.5px' }} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        mb: 2,
      }}>
        <AnalysisBox image={any1} />
        <AnalysisBox image={any2} />
        <AnalysisBox image={any3} />
        <AnalysisBox image={any4} />
      </Box>
    </Box>
    )
};
  