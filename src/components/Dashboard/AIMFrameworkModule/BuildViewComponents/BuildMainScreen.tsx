import { useStepStore } from '../../../../store/useStepStore';
import { Box, Typography } from '@mui/material';
import { AddQuestionSection } from '../../../../core-ui/AddQuestionSection';
import { WelcomeScreenContainer } from './WelcomeScreenContainer';
import { SmartVocForm } from './SmartVocForm';
import { CognitiveTaskForm } from './CognitiveTaskForm';
import { ThankYouScreenContainer } from './ThankYouScreenContainer';

export default function BuildMainScreen() {
    const { step } = useStepStore();

  const renderContent = () => {
    switch (step) {
      case 0:
        return <WelcomeScreenContainer />;
      case 1:
        return <SmartVocForm />;
      case 2:
        return <CognitiveTaskForm />;
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
      <Typography mb={3} mt={1} color='#262626' fontWeight={700} fontSize={20} lineHeight='28px'>AIM Framework Stage 3’s name</Typography>
      {renderContent()}
      <Box sx={{
        mt: 2,
      }}>
        {step !== 0 && step !== 3 && <AddQuestionSection />}
      </Box>
    </Box>
  )
}
