import { Box } from "@mui/material";
import WelcomeScreen from "./Forms/WelcomeScreen";
import { TechniqueDescription } from "./Forms/TechniqueDescription";

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