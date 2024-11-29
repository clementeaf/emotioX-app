import { Box } from '@mui/material';
import ContainerGrid from '../ContainerGrid'
import { TitleRow } from './TitleRow'
import { TextInput } from './TextInput';
import { TextAreaInput } from './TextAreaInput';
import { useWelcomeScreenStore } from '../../store/useWelcomeScreenStore';

export default function WelcomeScreen() {
    const {
      welcomeScreen,
      setWelcomeScreenTitle,
      setWelcomeScreenMessage,
      setWelcomeScreenButtonText,
      setWelcomeScreenIsRequired,
    } = useWelcomeScreenStore();
  
    return (
      <ContainerGrid>
        <TitleRow
          title="1.0.- Welcome screen"
          isRequired={welcomeScreen.isRequired}
          onToggleRequired={() => setWelcomeScreenIsRequired(!welcomeScreen.isRequired)}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "426px",
            px: 2,
          }}
        >
          <TextInput
            label="Title"
            placeholder="Title of the screen"
            value={welcomeScreen.title}
            disabled={!welcomeScreen.isRequired}
            onChange={(e) => setWelcomeScreenTitle(e.target.value)}
          />
          <TextAreaInput
            label="Message"
            placeholder="Message to display"
            value={welcomeScreen.message}
            disabled={!welcomeScreen.isRequired}
            onChange={(e) => setWelcomeScreenMessage(e.target.value)}
          />
          <TextInput
            label="Start button text"
            placeholder="Name the button to start the test"
            value={welcomeScreen.buttonText}
            disabled={!welcomeScreen.isRequired}
            onChange={(e) => setWelcomeScreenButtonText(e.target.value)}
          />
        </Box>
      </ContainerGrid>
    );
  }

  export function ThankYouScreen() {
    const {
      thankYouScreen,
      setThankYouScreenTitle,
      setThankYouScreenMessage,
      setThankYouScreenIsRequired,
    } = useWelcomeScreenStore();
  
    return (
      <ContainerGrid>
        <TitleRow
          title="4.0.- Thank you screen"
          isRequired={thankYouScreen.isRequired}
          onToggleRequired={() => setThankYouScreenIsRequired(!thankYouScreen.isRequired)}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "426px",
            px: 2,
          }}
        >
          <TextInput
            label="Title"
            placeholder="Title of the screen"
            value={thankYouScreen.title}
            onChange={(e) => setThankYouScreenTitle(e.target.value)}
          />
          <TextAreaInput
            label="Message"
            placeholder="Message to display"
            value={thankYouScreen.message}
            onChange={(e) => setThankYouScreenMessage(e.target.value)}
          />
        </Box>
      </ContainerGrid>
    );
  }
  