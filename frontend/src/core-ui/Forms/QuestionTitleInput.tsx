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
            borderColor: "#E0E0E0",
            fontSize: 14,
          },
        }}
      />

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <Select
          value={questionType}
          onChange={(e) => {
            const newType = e.target.value;
            onTypeChange(newType);

            if (newType === "Multiple choice") {
              resetToDefaultSorteableQuestions();
            }
          }}
          displayEmpty
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E0E0E0",
            },
          }}
        >
          <MenuItem value="Single choice">Single choice</MenuItem>
          <MenuItem value="Multiple choice">Multiple choice</MenuItem>
          <MenuItem value="Short text">Short text</MenuItem>
          <MenuItem value="Long text">Long text</MenuItem>
          <MenuItem value="Linear scale">Linear scale</MenuItem>
          <MenuItem value="Ranking">Ranking</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        sx={{ mr: 2 }}
        control={<AntSwitch checked={required} onChange={onToggleRequired} />}
        label={
          <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
            Required
          </Typography>
        }
        labelPlacement="start"
      />
    </Box>
  );
}
