import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Definimos el tipo de propiedades para el componente
interface ConditionModalProps {
  open: boolean;
  onClose: () => void;
}

export const ConditionModal: React.FC<ConditionModalProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: '403px', height: '500px', borderRadius: '8px', p: 2 },
      }}
    >
      <DialogTitle>
        Show conditionality
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {/* Descripción principal */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
          3.4.- Question
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#4F4F4F' }}>
          Please, select the configuration for this question
        </Typography>

        {/* Primera fila de Selects */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Select
            defaultValue="Show"
            sx={{ width: '100px', height: '40px', mr: 1 }}
          >
            <MenuItem value="Show">Show</MenuItem>
            <MenuItem value="Hide">Hide</MenuItem>
          </Select>
          <Typography variant="body2">this section if</Typography>
        </Box>

        {/* Segunda fila de Selects */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Select
            defaultValue="3.3.- Question Ask something"
            sx={{ width: '100%', height: '40px', mr: 1 }}
          >
            <MenuItem value="3.3.- Question Ask something">
              3.3.- Question Ask something
            </MenuItem>
            <MenuItem value="3.2.- Another Question">
              3.2.- Another Question
            </MenuItem>
          </Select>
        </Box>

        {/* Tercera fila */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            answer is
          </Typography>
          <Select
            defaultValue="Option 2"
            sx={{ width: '100%', height: '40px' }}
          >
            <MenuItem value="Option 1">Option 1</MenuItem>
            <MenuItem value="Option 2">Option 2</MenuItem>
            <MenuItem value="Option 3">Option 3</MenuItem>
          </Select>
        </Box>

        {/* Nota al pie */}
        <Box
          sx={{
            p: 2,
            bgcolor: '#F8F5FF',
            borderRadius: '8px',
            border: '1px solid #E0E0E0',
            mb: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: '#4F4F4F', fontSize: 12 }}>
            <strong>The target you're using for this condition is optional.</strong> 
            If participants don't answer that question this condition won't be triggered, 
            you may want to make it required.
          </Typography>
        </Box>

        {/* Botón de guardar */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#252BE6',
            color: 'white',
            fontWeight: 'bold',
            height: '40px',
            ':hover': { bgcolor: '#1F22CC' },
          }}
        >
          Save configuration
        </Button>
      </DialogContent>
    </Dialog>
  );
};
