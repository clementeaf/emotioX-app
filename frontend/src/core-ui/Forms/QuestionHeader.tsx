import { Box, FormControlLabel, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { AntSwitch } from '../Switch';

interface QuestionHeaderProps {
  questionText: string;
  showConditionality: boolean;
  onToggleConditionality: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function QuestionHeader({
  questionText,
  showConditionality,
  onToggleConditionality,
  onDuplicate,
  onDelete,
}: QuestionHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        ml: 2,
        width: '804px',
      }}
    >
      {/* Texto de la pregunta */}
      <Typography
        sx={{ fontWeight: 400, fontSize: 14, lineHeight: '22px', color: '#8C8C8C' }}
      >
        {questionText}
      </Typography>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Opción de mostrar condicionalidad */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1, mr: 2, }}>
          <FormControlLabel
            control={<AntSwitch defaultChecked={showConditionality} onClick={onToggleConditionality}/>}
            label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Show conditionality</Typography>}
            labelPlacement="start"
          />
        </Box>

        {/* Botones de duplicar y eliminar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton onClick={onDuplicate}>
            <ContentCopyIcon />
          </IconButton>
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
