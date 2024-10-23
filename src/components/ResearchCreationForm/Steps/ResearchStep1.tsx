
import { Stack, TextField, Typography, MenuItem, Select } from '@mui/material';
import { useResearchStore } from '../../../store/useResearchStore';
import { grey } from '@mui/material/colors';

export default function ResearchStep1() {
  const { researchName, enterpriseName, setResearchName, setEnterpriseName } = useResearchStore();

  return (
    <>
      <Typography variant="h6" fontWeight={500} color={grey[600]} alignSelf="flex-start">
        Name the Research
      </Typography>
      <Typography variant="body2" color="gray" mt={1.5} mb={3} width="340px" alignSelf="flex-start">
        Please, name the research project and assign it to an existing client or create a new one.
      </Typography>

      <Stack spacing={2}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            gap: 1,
          }}
        >
          <Typography fontWeight={400} fontSize={13} lineHeight="22px" color={grey[600]}>
            Research's name
          </Typography>
          <TextField
            variant="outlined"
            sx={{ width: '395px', maxWidth: '395px' }}
            name="researchName"
            value={researchName}
            onChange={(e) => setResearchName(e.target.value)}
            placeholder="Project 001"
          />
        </Stack>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            gap: 1,
          }}
        >
          <Typography fontWeight={400} fontSize={13} lineHeight="22px" color={grey[600]}>
            It's made for
          </Typography>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={enterpriseName || ""}
            onChange={(e) => setEnterpriseName(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled style={{ display: 'none', fontWeight: 400, fontSize: 14, color: '#262626', lineHeight: '22px' }}>
              Enterprise's name
            </MenuItem>

            <MenuItem value="Enterprise 1">Enterprise 1</MenuItem>
            <MenuItem value="Enterprise 2">Enterprise 2</MenuItem>
          </Select>
        </Stack>
      </Stack>
    </>
  );
}
