import { Box, Button } from "@mui/material";
import { TechniqueDescription } from "./Forms/TechniqueDescription";
import { TitleRow } from "./Forms/TitleRow";
import { SorteableOptions } from "./SorteableOptions";
import { QuestionTitleInput } from "./Forms/QuestionTitleInput";
import { useScreenerStore } from "../store/useScreenerStore";

export function ScreenerScreenContainer() {
  const titleRequired = useScreenerStore((state) => state.titleRequired);
  const isRequired = useScreenerStore((state) => state.isRequired);
  const questionText = useScreenerStore((state) => state.questionText);
  const questionType = useScreenerStore((state) => state.questionType);

  const setTitleRequired = useScreenerStore((state) => state.setTitleRequired);
  const setIsRequired = useScreenerStore((state) => state.setIsRequired);
  const setQuestionText = useScreenerStore((state) => state.setQuestionText);
  const setQuestionType = useScreenerStore((state) => state.setQuestionType);

  const handleSubmit = () => {
    const preparedData = useScreenerStore.getState().getPreparedData();
    if (preparedData) {
      console.log("Datos enviados al backend:", preparedData);
    } else {
      console.log("Condiciones no cumplidas. No se envían datos.");
    }
  };

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
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>
      <TechniqueDescription />
    </Box>
  );
}
