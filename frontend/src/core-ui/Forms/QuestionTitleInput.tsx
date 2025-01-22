import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { AntSwitch } from "../Switch";
import { useScreenerStore } from "../../store/useScreenerStore";

interface QuestionInputProps {
  questionText: string;
  questionType: string;
  required: boolean;
  onTextChange: (text: string) => void;
  onTypeChange: (type: string) => void;
  onToggleRequired: () => void;
}

export function QuestionTitleInput({
  questionText,
  questionType,
  required,
  onTextChange,
  onTypeChange,
  onToggleRequired,
}: QuestionInputProps) {
  const resetToDefaultSorteableQuestions = useScreenerStore(
    (state) => state.resetToDefaultSorteableQuestions
  );

  const handleTypeChange = (type: string) => {
    onTypeChange(type);
    if (type === "Multiple choice") {
      resetToDefaultSorteableQuestions();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
    >
      <DragIndicatorIcon sx={{ color: "#C4C4C4", cursor: "grab" }} />

      <TextField
        variant="outlined"
        placeholder="Ask something"
        value={questionText}
        onChange={(e) => onTextChange(e.target.value)}
        fullWidth
        disabled={!required}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
            fontSize: 14,
            "& fieldset": { borderColor: "#E0E0E0" },
          },
        }}
      />

      <FormControl size="small" sx={{ minWidth: 160 }} disabled={!required}>
        <Select
          value={questionType}
          onChange={(e) => handleTypeChange(e.target.value)}
          displayEmpty
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E0E0E0",
            },
          }}
        >
          {["Single choice", "Multiple choice", "Short text", "Long text", "Linear scale", "Ranking"].map(
            (type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>

      <FormControlLabel
        control={<AntSwitch checked={required} onChange={onToggleRequired} />}
        label={
          <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
            Required
          </Typography>
        }
        labelPlacement="start"
        sx={{ marginRight: 2 }}
      />
    </Box>
  );
}
