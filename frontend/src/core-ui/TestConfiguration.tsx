import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";

interface TestConfigurationOption {
  id: number;
  label: string;
  checked: boolean;
}

interface TestConfigurationProps {
  options: TestConfigurationOption[];
  onToggleOption: (id: number) => void;
}

export default function TestConfiguration({
  options,
  onToggleOption,
}: TestConfigurationProps) {
  return (
    <Box
      sx={{
        width: "770px",
        height: "100%",
        maxHeight: "208px",
        border: `1px solid ${grey[300]}`,
        display: 'flex',
        flexDirection: 'column',
        ml: 2,
        borderRadius: 2,
        px: 2,
        pt: 2,
        pb: 4,
        bgcolor: "white",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography fontWeight={600} fontSize={16}>
          Test Configuration
        </Typography>
        <Typography fontSize={14} color={grey[500]}>
          Please select
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {options.map(({ id, label, checked }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={checked}
                onChange={() => onToggleOption(id)}
                sx={{
                  color: grey[500],
                  "&.Mui-checked": {
                    color: indigo[600],
                  },
                }}
              />
            }
            label={label}
          />
        ))}
      </Box>
    </Box>
  );
}
