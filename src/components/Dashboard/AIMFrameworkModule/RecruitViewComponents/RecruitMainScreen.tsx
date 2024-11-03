import { Box, Typography } from '@mui/material';
import RecruitmentLink from '../../../../core-ui/Forms/RecruitmentLink';
import { RecruitmentConfiguration } from '../../../../core-ui/Forms/RecruitmentConfiguration';
import { CircularProgressCard } from '../../../../core-ui/Cards/CircularProgressCard';

export default function RecruitMainScreen() {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
    }}>
        <Typography fontWeight={700} fontSize={20} color='#262626' lineHeight='28px'>New Behavioural Research’s name</Typography>

        {/** Columns */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
            {/** Recuritment link */}
            <RecruitmentLink />

            {/** Research configuration */}
            <RecruitmentConfiguration />
        </Box>

        {/** Cards Section */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2, width: 1134, height: 139 }}>
            <CircularProgressCard title="Interviews" status="Complete" totalIDs={219} percentage={57} />
            <CircularProgressCard title="Interviews" status="Complete" totalIDs={219} percentage={57} />
            <CircularProgressCard title="Interviews" status="Complete" totalIDs={219} percentage={57} />
        </Box>
    </Box>
  )
}
