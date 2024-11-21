import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function ContainerGrid({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{
        width: '845px',
        height: '426px',
        borderRadius: '4px',
        border: `1px solid ${grey[300]}`,
        bgcolor: 'white',
    }}>
        {children}
    </Box>
  )
}
