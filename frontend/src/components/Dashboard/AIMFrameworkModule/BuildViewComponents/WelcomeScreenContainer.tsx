import { Box } from "@mui/material";
import WelcomeScreen from "../../../../core-ui/Forms/WelcomeScreen";
import { TechniqueDescription } from "../../../../core-ui/Forms/TechniqueDescription";

export function WelcomeScreenContainer() {
    return (
      <Box sx={{
        display: 'flex',
        gap: 3,
      }}>
        <WelcomeScreen />
        <TechniqueDescription />
      </Box>
    )
  }