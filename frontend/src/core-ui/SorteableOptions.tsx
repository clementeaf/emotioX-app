import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { EligibilityInput } from "./ElegibilityInput";
import { SorteableQuestion } from "../store/useScreenerStore";

interface SorteableOptionsProps {
  options: SorteableQuestion[];
  questionType: string;
  onAddOption: () => void;
  onUpdateOption: (id: string, updatedData: Partial<SorteableQuestion>) => void;
  onDeleteOption: (id: string) => void;
}

export const SorteableOptions: React.FC<SorteableOptionsProps> = React.memo(
  function SorteableOptions({ options, questionType, onAddOption, onUpdateOption, onDeleteOption }) {

    const filteredOptions =
      questionType === "Single choice" ? options.slice(0, 1) : options;

    return (
      <Box sx={{ width: "100%" }}>
        <Typography color="#8C8C8C" fontSize={14} fontWeight={400} lineHeight="22px">
          Choices (Press ENTER for new line or paste a list)
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
          {filteredOptions.map((item) => (
            <SortableItem
              key={item.id}
              question={item}
              onUpdate={(updatedData) => onUpdateOption(item.id, updatedData)}
              onDelete={() => onDeleteOption(item.id)}
              disableDelete={filteredOptions.length === 1}
            />
          ))}
        </Box>
        <AddChoiceButton
          handleAddChoice={onAddOption}
          disabled={questionType === "Single choice" && options.length >= 1}
        />
      </Box>
    );
  }
);

// Componente para representar cada opción
const SortableItem = React.memo(function SortableItem({
  question,
  onUpdate,
  onDelete,
  disableDelete,
}: {
  question: SorteableQuestion; // Cambiado de Option a SorteableQuestion
  onUpdate: (updatedData: Partial<SorteableQuestion>) => void;
  onDelete: () => void;
  disableDelete: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        bgcolor: "#fff",
        p: 1,
        gap: 2,
        borderRadius: "4px",
        border: "1px solid #e0e0e0",
        width: "804px",
      }}
    >
      {/* Campo de texto para la opción */}
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          variant="outlined"
          value={question.option1}
          placeholder={question.placeholder || `Option`}
          onChange={(e) => onUpdate({ option1: e.target.value })}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: 14,
              "& fieldset": { borderColor: "#E0E0E0" },
            },
          }}
        />
      </Box>

      {/* Componente de selección */}
      <EligibilityInput
        value={question.selection[0]}
        onChange={(newEligibility) =>
          onUpdate({ selection: [newEligibility, ...question.selection.slice(1)] })
        }
      />

      {/* Botón de eliminación */}
      <Button
        sx={{ color: disableDelete ? "gray" : "red", ml: 2 }}
        onClick={disableDelete ? undefined : onDelete}
        disabled={disableDelete}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
});

// Botón para agregar nuevas opciones
function AddChoiceButton({
  handleAddChoice,
  disabled,
}: {
  handleAddChoice: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddChoice}
      disabled={disabled}
      sx={{ mt: 2 }}
    >
      Add Choice
    </Button>
  );
}
