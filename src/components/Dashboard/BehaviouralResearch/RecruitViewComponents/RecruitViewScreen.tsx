import { Box, Typography } from '@mui/material'
import RecruitmentLink from '../../../../core-ui/Forms/RecruitmentLink'
import { RecruitmentConfiguration } from '../../../../core-ui/Forms/RecruitmentConfiguration'
import { CircularProgressCard } from '../../../../core-ui/Cards/CircularProgressCard'
import { useSelectedResearchStore } from '../../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../../config/researchConfig';

export default function RecruitViewScreen() {
  const { researchType, stageIndex } = useSelectedResearchStore();
  const stages = researchStagesConfig[researchType];
  console.log('stages: ', stages);

  const renderContent = () => {
    return stages[stageIndex]?.component || <Typography>Seleccione una etapa</Typography>;
  };
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
  }}>
      <Typography fontWeight={700} fontSize={20} color='#262626' lineHeight='28px'>New Behavioural Research’s name</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
          <RecruitmentLink />
          <RecruitmentConfiguration />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2, width: 1134, height: 139 }}>
          <CircularProgressCard title="Interviews" status="Complete" totalIDs={219} percentage={57} />
          <CircularProgressCard title="Interviews" status="Complete" totalIDs={219} percentage={57} />
          <CircularProgressCard title="Interviews" status="Complete" totalIDs={219} percentage={57} />
      </Box>
  </Box>
  )
}
