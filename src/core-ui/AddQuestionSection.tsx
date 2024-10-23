import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    Typography
  } from '@mui/material';
  
  export function AddQuestionSection() {
    return (
      <Box sx={{ p: 3, backgroundColor: '#F3F6FC', borderRadius: 2 }}>
        {/* Encabezado con el checkbox y botón */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          {/* Checkbox para aleatorizar preguntas */}
          <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
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
              '&:hover': { backgroundColor: '#5300DD' }
            }}
          >
            Add another question
          </Button>
        </Stack>
  
        {/* Título y descripción */}
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
                  height: '95px',
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
      </Box>
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
  