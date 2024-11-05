import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { AntSwitch } from '../Switch';

interface QuestionInputProps {
  questionText: string;
  questionType: string;
  required: boolean;
  onQuestionTextChange: (text: string) => void;
  onQuestionTypeChange: (type: string) => void;
  onRequiredToggle: () => void;
}

export function QuestionTitleInput({
  questionText,
  questionType,
  onQuestionTextChange,
  onQuestionTypeChange,
  onRequiredToggle,
}: QuestionInputProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      {/* Icono de arrastre */}
      <DragIndicatorIcon sx={{ color: '#C4C4C4', cursor: 'grab' }} />

      {/* Campo de entrada de texto de pregunta */}
      <TextField
        variant="outlined"
        placeholder="Ask something"
        value={questionText}
        onChange={(e) => onQuestionTextChange(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            borderColor: '#E0E0E0',
            fontSize: 14,
          },
        }}
      />

      {/* Selector de tipo de pregunta */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <Select
          value={questionType}
          onChange={(e) => onQuestionTypeChange(e.target.value)}
          displayEmpty
          sx={{
            bgcolor: 'white',
            borderRadius: 1,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E0E0E0',
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

      {/* Switch de "Requerido" */}
      <FormControlLabel
        sx={{ mr: 2 }}
        control={<AntSwitch onChange={onRequiredToggle} />}
        label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Required</Typography>}
        labelPlacement="start"
      />
    </Box>
  );
}
