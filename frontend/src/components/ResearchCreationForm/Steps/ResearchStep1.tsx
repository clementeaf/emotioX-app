import { Stack, TextField, Typography, MenuItem, Select } from '@mui/material';
import { useResearchStore } from '../../../store/useResearchStore';
import { grey } from '@mui/material/colors';

export default function ResearchStep1() {
  const { researchName, enterpriseName, setResearchName, setEnterpriseName } = useResearchStore();

  return (
    <>
      {/* Título principal */}
      <Typography variant="h6" fontWeight={500} color={grey[600]} alignSelf="flex-start">
        Name the Research
      </Typography>
      <Typography variant="body2" color="gray" mt={1.5} mb={3} width="340px" alignSelf="flex-start">
        Please, name the research project and assign it to an existing client or create a new one.
      </Typography>

      <Stack spacing={3} width="100%">
        {/* Campo de entrada para el nombre del proyecto */}
        <FieldContainer
          label="Research's name"
          description="Enter the name of the research project."
        >
          <TextField
            variant="outlined"
            fullWidth
            name="researchName"
            value={researchName}
            onChange={(e) => setResearchName(e.target.value)}
            placeholder="Project 001"
          />
        </FieldContainer>

        {/* Campo de selección de empresa */}
        <FieldContainer
          label="It's made for"
          description="Select or assign the client for this project."
        >
          <Select
            fullWidth
            value={enterpriseName || ""}
            onChange={(e) => setEnterpriseName(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <span style={{ fontWeight: 400, fontSize: 14, color: '#262626', lineHeight: '22px' }}>
                Enterprise's name
              </span>
            </MenuItem>
            <MenuItem value="Enterprise 1">Enterprise 1</MenuItem>
            <MenuItem value="Enterprise 2">Enterprise 2</MenuItem>
          </Select>
        </FieldContainer>
      </Stack>
    </>
  );
}

/** Componente reutilizable para contenedores de campos */
interface FieldContainerProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

const FieldContainer: React.FC<FieldContainerProps> = ({ label, description, children }) => (
  <Stack spacing={1} alignItems="flex-start" width="100%">
    <Typography fontWeight={400} fontSize={13} lineHeight="22px" color={grey[600]}>
      {label}
    </Typography>
    <Typography variant="caption" color={grey[500]} mb={1}>
      {description}
    </Typography>
    {children}
  </Stack>
);
