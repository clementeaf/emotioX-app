import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { ConditionModal } from './Modals/ConditionalModal';

export function AddQuestionSection() {
  const [displayQuestions, setDisplayQuestions] = useState<boolean>(false);
  const [isConditionModalOpen, setConditionModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setConditionModalOpen(true);
  };

  const handleCloseModal = () => {
    setConditionModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#F3F6FC',
          borderRadius: 2,
          width: 845,
          height: `${displayQuestions ? '381' : 'auto'}`,
          border: `1px solid ${grey[300]}`,
        }}
      >
        {/* Encabezado con el checkbox y botón */}
        <Box sx={{ p: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            {/* Checkbox para aleatorizar preguntas */}
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setDisplayQuestions(!displayQuestions)}
                  color="primary"
                />
              }
              label="Randomize the order of questions"
            />

            {/* Botón para agregar más preguntas */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#6200EE',
                textTransform: 'none',
                color: 'white',
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#5300DD' },
              }}
              onClick={handleOpenModal}
            >
              Add another question
            </Button>
          </Stack>

          {/* Título y descripción */}
          {displayQuestions ? (
            <>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                Add a question
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Please, select a kind of question to add to this section
              </Typography>

              {/* Grid para los tipos de preguntas */}
              <Grid container spacing={2}>
                {questionTypes.map((type, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': { borderColor: '#6200EE' },
                        borderRadius: 2,
                        border: '1px solid #E0E0E0',
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        {type.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {type.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Stack />
          )}
        </Box>
      </Box>

      {/* Modal de condición */}
      {isConditionModalOpen && <ConditionModal open={isConditionModalOpen} onClose={handleCloseModal} />}
    </>
  );
}

// Tipos de preguntas
const questionTypes = [
  { title: 'Short Test', description: 'Open field' },
  { title: 'Long Test', description: 'Open field' },
  { title: 'Single Choice', description: 'Fast selection' },
  { title: 'Multiple Choice', description: 'Slow selection' },
  { title: 'Linear Scale', description: 'Fast selection' },
  { title: 'Ranking', description: 'Slow selection' },
  { title: 'Navigation Flow', description: 'Objective-Oriented Task' },
  { title: 'Preference Test', description: 'Objective-Oriented Task' },
];
