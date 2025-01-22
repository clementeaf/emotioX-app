import { Box, Button, Typography } from "@mui/material";
import { TechniqueDescription } from "./Forms/TechniqueDescription";
import { TitleRow } from "./Forms/TitleRow";
import { SorteableOptions } from "./SorteableOptions";
import { QuestionTitleInput } from "./Forms/QuestionTitleInput";
import { useScreenerStore } from "../store/useScreenerStore";
import { useState } from "react";

export function ScreenerScreenContainer() {
  const titleRequired = useScreenerStore((state) => state.titleRequired);
  const isRequired = useScreenerStore((state) => state.isRequired);
  const questionText = useScreenerStore((state) => state.questionText);
  const questionType = useScreenerStore((state) => state.questionType);
  const options = useScreenerStore((state) => state.options);

  const setTitleRequired = useScreenerStore((state) => state.setTitleRequired);
  const setIsRequired = useScreenerStore((state) => state.setIsRequired);
  const setQuestionText = useScreenerStore((state) => state.setQuestionText);
  const setQuestionType = useScreenerStore((state) => state.setQuestionType);

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = () => {
    if (titleRequired && (!questionText || questionText.trim() === "")) {
      setValidationError("The question text cannot be empty.");
      return false;
    }

    if (
      titleRequired &&
      isRequired &&
      options.some((option) => !option.option1 || option.option1.trim() === "")
    ) {
      setValidationError("All options must have a value.");
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const preparedData = useScreenerStore.getState().getPreparedData();
    if (preparedData) {
      console.log("Datos enviados al backend:", preparedData);
    } else {
      console.log("Condiciones no cumplidas. No se envían datos.");
    }
  };

  const isSubmitDisabled =
    !titleRequired ||
    !questionText ||
    questionText.trim() === "" ||
    (isRequired && options.some((option) => !option.option1 || option.option1.trim() === ""));

  return (
    <Box sx={{ display: "flex", maxWidth: 1134, height: "100%", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
          maxWidth: "845px",
          bgcolor: "white",
          height: "100%",
          maxHeight: "590px",
        }}
      >
        <TitleRow
          title="1.0.- Screener"
          isRequired={titleRequired}
          onToggleRequired={() => setTitleRequired(!titleRequired)}
        />
        <Box sx={{ width: "100%", maxWidth: "804px", mt: 2 }}>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              px: 2,
              opacity: titleRequired ? 1 : 0.5,
              pointerEvents: titleRequired ? "auto" : "none",
            }}
          >
            <QuestionTitleInput
              questionText={questionText || ""}
              questionType={questionType || "Single choice"}
              required={isRequired}
              onTextChange={setQuestionText}
              onTypeChange={setQuestionType}
              onToggleRequired={() => setIsRequired(!isRequired)}
            />
            <SorteableOptions />
          </Box>
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
            sx={{ mt: 2, ml: 2, }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <TechniqueDescription />
    </Box>
  );
}
