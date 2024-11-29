import { Box, Typography } from "@mui/material";
import { TechniqueDescription } from "./Forms/TechniqueDescription";
import { TitleRow } from "./Forms/TitleRow";
import { QuestionTitleInput } from "./Forms/QuestionTitleInput";
import { useScreenerStore } from "../store/useScreenerStore";
import { SorteableOptions } from "./SorteableOptions";

export function ScreenerScreenContainer() {
  const {
    questions,
    screenerRequired,
    setScreenerRequired,
    questionRequired,
    setQuestionRequired,
    updateQuestion,
  } = useScreenerStore();

  const handleTextChange = (index: number, text: string) => {
    updateQuestion(index, { questionText: text });
  };

  const handleTypeChange = (index: number, type: string) => {
    updateQuestion(index, { questionType: type });
  };

  const handleRequiredToggle = (index: number) => {
    setQuestionRequired(!questionRequired);
    updateQuestion(index, { required: !questionRequired });
  };

  const question = questions[0]; // Trabajamos con la primera pregunta.

  if (!question) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No question available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", maxWidth: 1134, height: "100%", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
          maxWidth: "844px",
          bgcolor: "white",
          height: "auto",
          maxHeight: "580px",
        }}
      >
        <TitleRow
          title="1.0.- Screener"
          isRequired={screenerRequired}
          onToggleRequired={() => setScreenerRequired(!screenerRequired)}
        />
        <Box sx={{ width: "100%", maxWidth: "804px", mt: 2 }}>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              px: 2,
              opacity: screenerRequired ? 1 : 0.5, // Opacidad según el estado
              pointerEvents: screenerRequired ? "auto" : "none", // Habilitar o deshabilitar interacción
            }}
          >
            <QuestionTitleInput
              questionText={question.questionText}
              questionType={question.questionType}
              required={questionRequired}
              onTextChange={(text) => handleTextChange(0, text)} // Cambios de texto
              onTypeChange={(type) => handleTypeChange(0, type)} // Cambios de tipo
              onToggleRequired={() => handleRequiredToggle(0)} // Alterna el required
            />
            <SorteableOptions />
          </Box>
        </Box>
      </Box>
      <TechniqueDescription />
    </Box>
  );
}
