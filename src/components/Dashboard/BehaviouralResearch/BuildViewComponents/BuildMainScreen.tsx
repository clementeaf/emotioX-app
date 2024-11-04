import { Box, Typography } from "@mui/material";
import { useStepStore } from "../../../../store/useStepStore";
import { WelcomeScreenContainer } from "../../../../core-ui/WelcomeScreenContainer";
import { ScreenerScreenContainer } from "../../../../core-ui/ScreenerScreenContainer";
import { ThankYouScreenContainer } from "../../AIMFrameworkModule/BuildViewComponents/ThankYouScreenContainer";

export default function BuildMainScreen() {
    const { step } = useStepStore();

  const renderContent = () => {
    switch (step) {
      case 0:
        return <ScreenerScreenContainer />;
      case 2:
        return <WelcomeScreenContainer />;
      case 3:
        return <ThankYouScreenContainer />;
      default:
        return <Typography>Seleccione una etapa</Typography>;
    }
  };
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
    }}>
      <Typography mb={3} mt={1} color='#262626' fontWeight={700} fontSize={20} lineHeight='28px'>New Behavioural Research’s name</Typography>
      {renderContent()}
      <Box sx={{
        mt: 2,
      }}>
      </Box>
    </Box>
  )
}
