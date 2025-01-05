import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
import { TestConfigurationProps } from '../types/types';

export default function TestConfiguration({
  title,
  note,
  checkboxsSelection,
  onSelectionChange,
}: TestConfigurationProps) {
  return (
    <Box
      sx={{
        width: '770px',
        height: '100%',
        maxHeight: '208px',
        border: `1px solid ${grey[300]}`,
        borderRadius: 2,
        px: 2,
        pt: 2,
        pb: 4,
        bgcolor: 'white',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography fontWeight={600} fontSize={16}>
          {title}
        </Typography>
        <Typography fontSize={14} color={grey[500]}>
          {note}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {checkboxsSelection.map(({ id, title, selection }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={selection}
                onChange={(e) => onSelectionChange(id, e.target.checked)}
                sx={{
                  color: grey[500],
                  '&.Mui-checked': {
                    color: indigo[600],
                  },
                }}
              />
            }
            label={title}
          />
        ))}
      </Box>
    </Box>
  );
}
