import { Box, FormControlLabel, Typography } from "@mui/material";
import { AntSwitch } from "../Switch";
import { grey } from "@mui/material/colors";

interface InvestigationTitleRequirementProps {
  title: string;
  required: boolean; // Estado del switch
  onToggleRequired: (checked: boolean) => void;
}

export default function InvestigationTitleRequirement({
  title,
  required,
  onToggleRequired,
}: InvestigationTitleRequirementProps) {
  return (
    <Box
      sx={{
        width: "845px",
        height: "54px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${grey[300]}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          px: 2,
        }}
      >
        <Typography color="#212121" fontWeight={700} fontSize={16} lineHeight="24px">
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1, mr: 2 }}>
          <FormControlLabel
            control={
              <AntSwitch
                checked={required}
                onChange={(event) => onToggleRequired(event.target.checked)}
              />
            }
            label={
              <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
                Required
              </Typography>
            }
            labelPlacement="start"
          />
        </Box>
      </Box>
    </Box>
  );
}
