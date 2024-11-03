import { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// Datos de ejemplo para las categorías de filtro
const filterData = {
  country: ['Estonia', 'Chile', 'Mexico', 'Spain', 'Show more'],
  ageRange: ['< 19 (1)', '30-34 (4)', '35-39 (8)', '40-44 (23)', 'Show more'],
  gender: ['Male (24)', 'Female (23)'],
  educationLevel: [
    'High school graduate (8)',
    'Some college (3)',
    'College graduate (6)',
    'Some postgraduate work (2)',
    'Post graduate degree (12)',
    'Show more',
  ],
  userId: [
    'e5adfa14-18be-433e-e5d4-ce82...',
    'eytd414-12he-123e-e52h4-ck85...',
    'y9dhcr89-11xk-643s-g7s9-ch72...',
    'gtdo874-11ae-193b-f65h1-cl85...',
    'Show more',
  ],
  participants: [
    '11 mar 2024, Chile',
    '11 mar 2024, Chile',
    '11 mar 2024, Chile',
    '11 mar 2024, Chile',
    'Show more',
  ],
};

// Componente principal de Filtros
export const FiltersPanel = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: Set<string> }>({
    country: new Set(['Chile', 'Mexico']),
    ageRange: new Set(['30-34 (4)', '35-39 (8)']),
    gender: new Set(['Male (24)', 'Female (23)']),
    educationLevel: new Set(),
    userId: new Set(),
    participants: new Set(),
  });

  // Manejar la expansión o contracción de una sección
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Manejar la selección de un filtro
  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const newSelected = new Set(prev[category]);
      if (newSelected.has(value)) {
        newSelected.delete(value);
      } else {
        newSelected.add(value);
      }
      return { ...prev, [category]: newSelected };
    });
  };

  return (
    <Box sx={{ width: 300, p: 2, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'white', maxHeight: '100%', height: 'auto'}}>
      {/* Encabezado */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Filters
      </Typography>

      {/* Mensaje de nueva data con botón */}
      <Box
        sx={{
          p: 2,
          border: '1px solid #a1c6fa',
          borderRadius: 2,
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: '#e8f2fd',
        }}
      >
        <Typography variant="body2" color="#0261e0" sx={{ fontWeight: 500 }}>
          New data was obtained
          <br />
          Please, update study
        </Typography>
        <Button variant="contained" size="small" sx={{ color: 'white', bgcolor: '#252BE6', height: 28, width: 65, px: 5, py: 2  }}>
          <Typography textTransform='initial' fontWeight={200} fontSize={14}>Update</Typography>
        </Button>
      </Box>

      {/* Secciones de filtros */}
      {Object.keys(filterData).map((category) => (
        <Box key={category} sx={{ mb: 2 }}>
          {/* Título de la sección */}
          <ListItemButton onClick={() => toggleSection(category)} sx={{ px: 0 }}>
            <ListItemText primary={category.replace(/([A-Z])/g, ' $1')} sx={{ fontWeight: 'bold', textTransform: 'capitalize' }} />
            {expandedSections[category] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Lista de filtros */}
          <Collapse in={expandedSections[category]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(filterData[category as keyof typeof filterData] || []).map((item) => (
                <ListItem key={item} sx={{ pl: 1 }}>
                  <Checkbox
                    checked={selectedFilters[category as keyof typeof selectedFilters].has(item)}
                    onChange={() => handleFilterChange(category as keyof typeof selectedFilters & string, item)}
                    color="primary"
                  />
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default FiltersPanel;
