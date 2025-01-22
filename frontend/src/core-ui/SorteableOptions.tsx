import React, { useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { EligibilityInput } from "./ElegibilityInput";
import { useScreenerStore } from "../store/useScreenerStore";

export const SorteableOptions: React.FC = () => {
  const options = useScreenerStore((state) => state.options);
  const questionType = useScreenerStore((state) => state.questionType);
  const isRequired = useScreenerStore((state) => state.isRequired);
  const addOption = useScreenerStore((state) => state.addOption);
  const updateOption = useScreenerStore((state) => state.updateOption);
  const deleteOption = useScreenerStore((state) => state.deleteOption);

  useEffect(() => {
    if (options.length === 0) {
      addOption();
    } else if (questionType === "Single choice" && options.length > 1) {
      const [firstOption] = options;
      updateOption(firstOption.id, { ...firstOption });
    }
  }, [options, questionType, addOption, updateOption]);

  const filteredOptions =
    questionType === "Single choice" ? options.slice(0, 1) : options;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography color="#8C8C8C" fontSize={14} fontWeight={400} lineHeight="22px" my={2}>
        Choices (Press ENTER for new line or paste a list)
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
        {filteredOptions.map((item) => (
          <SortableItem
            key={item.id}
            question={item}
            onUpdate={(updatedData) => updateOption(item.id, updatedData)}
            onDelete={() => deleteOption(item.id)}
            disableDelete={filteredOptions.length === 1}
            isDisabled={!isRequired}
          />
        ))}
      </Box>
      <AddChoiceButton
        handleAddChoice={addOption}
        disabled={!isRequired || (questionType === "Single choice" && options.length >= 1)}
      />
    </Box>
  );
};

const SortableItem = React.memo(function SortableItem({
  question,
  onUpdate,
  onDelete,
  disableDelete,
  isDisabled,
}: {
  question: { id: string; option1: string; selection: string };
  onUpdate: (updatedData: Partial<typeof question>) => void;
  onDelete: () => void;
  disableDelete: boolean;
  isDisabled: boolean;
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
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          variant="outlined"
          value={question.option1}
          placeholder={`Option`}
          onChange={(e) => onUpdate({ option1: e.target.value })}
          fullWidth
          disabled={isDisabled}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: 14,
              "& fieldset": { borderColor: isDisabled ? "#d3d3d3" : "#E0E0E0" },
            },
          }}
        />
      </Box>
      <EligibilityInput
        value={question.selection}
        onChange={(newEligibility) => onUpdate({ selection: newEligibility })}
        disabled={isDisabled}
      />
      <Button
        sx={{ color: disableDelete ? "gray" : "red", ml: 2 }}
        onClick={disableDelete || isDisabled ? undefined : onDelete}
        disabled={disableDelete || isDisabled}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
});

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
