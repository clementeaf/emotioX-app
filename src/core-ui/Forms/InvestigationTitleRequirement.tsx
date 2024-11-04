import { Box, FormControlLabel, Typography } from '@mui/material';
import { AntSwitch } from '../Switch';
import { grey } from '@mui/material/colors';

interface InvestigationTitleRequirementProps {
  title: string;
  showConditionality: boolean;
  onToggleConditionality: () => void;
}

export default function InvestigationTitleRequirement({
    title,
    showConditionality,
    onToggleConditionality,
}: InvestigationTitleRequirementProps) {
  return (
    <Box sx={{
        width: '845px',
        height: '54px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${grey[300]}`,
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            px: 2,
        }}>
            <Typography color='#212121' fontWeight={700} fontSize={16} lineHeight='24px'>{title}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1, mr: 2, }}>
            <FormControlLabel
                control={<AntSwitch defaultChecked={showConditionality} onClick={onToggleConditionality}/>}
                label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Required</Typography>}
                labelPlacement="start"
            />
            </Box>
        </Box>
    </Box>
  )
}
