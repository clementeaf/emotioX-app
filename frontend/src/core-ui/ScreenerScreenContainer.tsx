import { Box, Typography } from "@mui/material";
import { TechniqueDescription } from "./Forms/TechniqueDescription";
import { TitleRow } from "./Forms/TitleRow";
import { QuestionTitleInput } from "./Forms/QuestionTitleInput";
import { SorteableQuestion, useScreenerStore } from "../store/useScreenerStore";
import { SorteableOptions } from "./SorteableOptions";
import { useEffect, useState } from "react";

export function ScreenerScreenContainer() {
  const {
    questions,
    screenerRequired,
    setScreenerRequired,
    questionRequired,
    setQuestionRequired,
    updateQuestion,
    sorteableQuestions,
    addSorteableQuestion,
    updateSorteableQuestion,
    setSorteableQuestionsOrder,
  } = useScreenerStore();

  const [currentResearchId, setCurrentResearchId] = useState<string | null>(null);

  useEffect(() => {
    const storedResearchId = localStorage.getItem("currentResearchId");
    setCurrentResearchId(storedResearchId);
  }, []);

  // Actualiza el texto de una pregunta
  const handleTextChange = (index: number, text: string) => {
    updateQuestion(index, { questionText: text });
  };

  // Cambia el tipo de pregunta
  const handleTypeChange = (index: number, type: string) => {
    updateQuestion(index, { questionType: type });
  };

  // Alterna el estado de "required" en una pregunta
  const handleRequiredToggle = (index: number) => {
    setQuestionRequired(!questionRequired);
    updateQuestion(index, { required: !questionRequired });
  };

  // Agrega una nueva opción ordenable
  const handleAddOption = () => {
    const newOption: SorteableQuestion = {
      id: (sorteableQuestions.length + 1).toString(),
      option1: `Option ${sorteableQuestions.length + 1}`,
      selection: ["Qualify", "Disqualify"],
      required: false,
    };
    addSorteableQuestion(newOption);
  };

  // Actualiza una opción ordenable
  const handleUpdateOption = (id: string, updatedData: Partial<SorteableQuestion>) => {
    updateSorteableQuestion(id, updatedData);
  };

  // Elimina una opción ordenable
  const handleDeleteOption = (id: string) => {
    setSorteableQuestionsOrder((prev: SorteableQuestion[]) =>
      prev.filter((option) => option.id !== id)
    );
  };

  const question = questions[0];

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
              opacity: screenerRequired ? 1 : 0.5,
              pointerEvents: screenerRequired ? "auto" : "none",
            }}
          >
            <QuestionTitleInput
              questionText={question.questionText}
              questionType={question.questionType}
              required={questionRequired}
              onTextChange={(text) => handleTextChange(0, text)}
              onTypeChange={(type) => handleTypeChange(0, type)}
              onToggleRequired={() => handleRequiredToggle(0)}
            />
            <SorteableOptions
              options={sorteableQuestions}
              questionType={question.questionType}
              onAddOption={handleAddOption}
              onUpdateOption={handleUpdateOption}
              onDeleteOption={handleDeleteOption}
            />
          </Box>
        </Box>
      </Box>
      <TechniqueDescription />
    </Box>
  );
}
