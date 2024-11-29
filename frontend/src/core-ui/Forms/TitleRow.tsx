import { Box, FormControlLabel, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AntSwitch } from "../Switch";

interface TitleRowProps {
  title: string; // El título que se mostrará
  isRequired: boolean; // Estado actual de "Required"
  onToggleRequired: () => void; // Acción para alternar el estado
}

export function TitleRow({ title, isRequired, onToggleRequired }: TitleRowProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "54px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${grey[300]}`,
      }}
    >
      <Typography ml={2}>{title}</Typography>
      <FormControlLabel
        sx={{ mr: 2 }}
        control={
          <AntSwitch
            checked={isRequired} // Refleja el estado actual
            onChange={onToggleRequired} // Alterna el estado
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
  );
}
