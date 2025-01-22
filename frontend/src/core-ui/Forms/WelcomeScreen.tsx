import { Box, Button, Typography } from "@mui/material";
import ContainerGrid from "../ContainerGrid";
import { TitleRow } from "./TitleRow";
import { TextInput } from "./TextInput";
import { TextAreaInput } from "./TextAreaInput";
import { useWelcomeScreenStore } from "../../store/useWelcomeScreenStore";
import { useState } from "react";

export default function WelcomeScreen() {
  const {
    welcomeScreen,
    setWelcomeScreenTitle,
    setWelcomeScreenMessage,
    setWelcomeScreenButtonText,
    setWelcomeScreenIsRequired,
  } = useWelcomeScreenStore();

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = () => {
    if (!welcomeScreen.title || welcomeScreen.title.trim() === "") {
      setValidationError("The title cannot be empty.");
      return false;
    }
    if (!welcomeScreen.message || welcomeScreen.message.trim() === "") {
      setValidationError("The message cannot be empty.");
      return false;
    }
    if (
      welcomeScreen.isRequired &&
      (!welcomeScreen.buttonText || welcomeScreen.buttonText.trim() === "")
    ) {
      setValidationError("The button text cannot be empty.");
      return false;
    }
    setValidationError(null); // Limpia errores si todo está correcto
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log("Datos del Welcome Screen enviados al backend:", welcomeScreen);
  };

  const isSubmitDisabled =
    welcomeScreen.isRequired &&
    (!welcomeScreen.title ||
      !welcomeScreen.message ||
      !welcomeScreen.buttonText ||
      welcomeScreen.title.trim() === "" ||
      welcomeScreen.message.trim() === "" ||
      welcomeScreen.buttonText.trim() === "");

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
        {validationError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {validationError}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
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

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = () => {
    if (!thankYouScreen.title || thankYouScreen.title.trim() === "") {
      setValidationError("The title cannot be empty.");
      return false;
    }
    if (!thankYouScreen.message || thankYouScreen.message.trim() === "") {
      setValidationError("The message cannot be empty.");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log("Datos del Thank You Screen enviados al backend:", thankYouScreen);
  };

  const isSubmitDisabled =
    thankYouScreen.isRequired &&
    (!thankYouScreen.title ||
      !thankYouScreen.message ||
      thankYouScreen.title.trim() === "" ||
      thankYouScreen.message.trim() === "");

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
          disabled={!thankYouScreen.isRequired}
          onChange={(e) => setThankYouScreenTitle(e.target.value)}
        />
        <TextAreaInput
          label="Message"
          placeholder="Message to display"
          value={thankYouScreen.message}
          disabled={!thankYouScreen.isRequired}
          onChange={(e) => setThankYouScreenMessage(e.target.value)}
        />
        {validationError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {validationError}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </ContainerGrid>
  );
}
