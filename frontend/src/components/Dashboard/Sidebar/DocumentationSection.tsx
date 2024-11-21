import { Box, Typography, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import documentationIcon from '../../../assets/documentationIcon.png';
import logo from '../../../assets/logo-useremotion-black 1.png';

export default function DocumentationSection() {
  return (
    <Box mt={4} textAlign="center" width='170px' bgcolor={grey[100]} p={2} ml={3}>
      <img src={documentationIcon} alt="Documentation Icon" />
      <img src={logo} alt="Logo" />
      <Typography fontWeight={400} fontSize={13} color={grey[400]} my={0.5}>
        Please check our Docs
      </Typography>
      <Button variant="contained" color="primary" fullWidth>
        <Typography textTransform='initial'>Documentation</Typography>
      </Button>
    </Box>
  );
}
