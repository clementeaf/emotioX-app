import { Chip, Stack } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { grey } from "@mui/material/colors";

export const LabelChips = () => {
    return (
      <Stack direction="row" spacing={2} alignItems="center" sx={{
        pb: 2, borderBottom: `1px solid ${grey[100]}`,
      }}>
        <Chip 
          label="Linear Scale question" 
          variant="filled" 
          sx={{ 
            height: '22px', 
            borderRadius: '4px', 
            bgcolor: '#F6FFED', 
            color: '#52C41A',
            '& .MuiChip-label': {
              color: '#52C41A'
            }
          }} 
        />
        <Chip 
          label="Conditionality disabled" 
          variant="filled" 
          sx={{ 
            height: '22px', 
            borderRadius: '4px', 
            bgcolor: '#E6F7FF', 
            color: '#252BE6',
            '& .MuiChip-label': {
              color: '#252BE6'
            }
          }} 
        />
        <Chip 
          label="Required" 
          variant="filled" 
          sx={{ 
            height: '22px', 
            borderRadius: '4px', 
            bgcolor: '#FFF1F0', 
            color: '#F5222D',
            '& .MuiChip-label': {
              color: '#F5222D'
            }
          }} 
        />
        <FilterListIcon style={{ color: 'gray' }} />
      </Stack>
    );
  };