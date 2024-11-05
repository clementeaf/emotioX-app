import { Box } from '@mui/material'
import RecruitmentLink from '../../../../core-ui/Forms/RecruitmentLink'
import { RecruitmentConfiguration } from '../../../../core-ui/Forms/RecruitmentConfiguration'
import { CircularProgressCard } from '../../../../core-ui/Cards/CircularProgressCard'

export default function EyeTrackingView() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
  }}>
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
