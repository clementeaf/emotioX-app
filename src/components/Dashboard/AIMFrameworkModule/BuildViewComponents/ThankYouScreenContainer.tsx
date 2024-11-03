import { Box } from "@mui/material";
import { ThankYouScreen } from "../../../../core-ui/Forms/WelcomeScreen";
import { TechniqueDescription } from "../../../../core-ui/Forms/TechniqueDescription";

export function ThankYouScreenContainer() {
    return (
      <Box sx={{
        display: 'flex',
        gap: 3,
      }}>
        <ThankYouScreen />
        <TechniqueDescription />
      </Box>
    )
  }