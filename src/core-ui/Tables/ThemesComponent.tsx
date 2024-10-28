import React from 'react';
import { Box, Typography, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Datos para la tabla de temas
const themesData = [
  { theme: 'Theme 001', magnitude: 0.89, sentiment: 0.986 },
  { theme: 'Theme 002', magnitude: 0.89, sentiment: 0.783 },
  { theme: 'Theme 003', magnitude: 0.89, sentiment: 0.376 },
  { theme: 'Theme 004', magnitude: 0.89, sentiment: -0.536 },
  { theme: 'Theme 005', magnitude: 0.89, sentiment: -0.978 },
];

// Función para determinar el color de fondo basado en el valor de "sentiment"
const getSentimentColor = (value: number) => {
  if (value > 0.75) return '#4CAF50'; // Verde oscuro
  if (value > 0.25) return '#8BC34A'; // Verde claro
  if (value > 0) return '#FFEB3B';    // Amarillo
  if (value > -0.5) return '#FF5722'; // Rojo claro
  return '#F44336';                   // Rojo oscuro
};

// Componente principal
export const ThemesComponent = () => {
  const [activeTab, setActiveTab] = React.useState(1);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, borderRadius: 2, boxShadow: 1, bgcolor: '#fff' }}>
      {/* Navegación por pestañas */}
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        indicatorColor="primary"
        textColor="primary"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        <Tab label="Sentiment" />
        <Tab label="Themes" />
        <Tab label="Keywords" />
      </Tabs>

      {/* Contenido de la pestaña "Themes" */}
      {activeTab === 1 && (
        <>
          {/* Título y descripción de la sección */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Relevant themes
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Resume of the idea of themes: Then I explore the nature of cognitive developmental improvements in working memory, the role of working memory in learning, and some potential implications of working memory and its development for the education of children and adults.
          </Typography>

          {/* Tabla de temas */}
          <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Detected Themes</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Magnitude</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sentiment Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {themesData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.theme}</TableCell>
                    <TableCell>{row.magnitude.toFixed(2).replace('.', ',')}</TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        bgcolor: getSentimentColor(row.sentiment),
                        color: '#fff',
                        textAlign: 'center',
                        borderRadius: 1,
                      }}
                    >
                      {row.sentiment.toFixed(3).replace('.', ',')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default ThemesComponent;
