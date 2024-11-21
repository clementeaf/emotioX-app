import { Box, Button, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import learnAbout1 from '../../../assets/learnAbout1.png';
import learnAbout2 from '../../../assets/learnAbout2.png';
import learnAbout3 from '../../../assets/learnAbout3.png';
import learnAbout4 from '../../../assets/learnAbout4.png';

const learnAboutItems = [
    {
        title: 'Eye Tracking',
        subTitle: 'By UserEmotion',
        image: learnAbout1,
    },
    {
        title: 'Attention Prediction',
        subTitle: 'By UserEmotion',
        image: learnAbout2,
    },
    {
        title: 'Implicit Priming Test',
        subTitle: 'By UserEmotion',
        image: learnAbout3,
    },
    {
        title: 'Cognitive Analysis',
        subTitle: 'By UserEmotion',
        image: learnAbout4,
    },
]

export default function LearnAbout() {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '380px',
        height: '100%',
        gap: 2,
      }}>
        <Typography fontWeight={500} fontSize={16} lineHeight='24px' color='#262626'>Learn about</Typography>
        
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '380px',
          height: '458px',
          bgcolor: 'white',
          border: `1px solid ${grey[200]}`,
          borderRadius: '4px',
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                height: '100%',
                width: '100%',
                p: 3,
            }}>
                {
                    learnAboutItems.map(({ title, subTitle, image }, idx) => (
                        <LearnAboutItem key={idx} title={title} subTitle={subTitle} image={image} />
                    ))
                }
            </Stack>
        </Box>
    </Box>
  )
}

function LearnAboutItem({ title, subTitle, image }: { title: string, subTitle: string, image: string }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '332px',
            height: '66px',
            py: 2,
            gap: 2,
            borderBottom: `1px solid ${grey[200]}`,
        }}>
            <img src={image} alt="image" style={{ width: '66px', height: '66px' }} />
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                width: '100%',
                justifyContent: 'space-between',
            }}>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '100%',
                }}>
                    <Typography fontWeight={500} fontSize={14} lineHeight='22px' color='#262626'>{title}</Typography>
                    <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#8C8C8C'>{subTitle}</Typography>
                </Stack>
                <Button variant='text' sx={{ p: 0}}>
                    <Typography textTransform='initial' fontWeight={500} fontSize={14} color='#262626' lineHeight='22px'>
                        View
                    </Typography>
                </Button>
            </Stack>
        </Box>
    )
}
