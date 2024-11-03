import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LanIcon from '@mui/icons-material/Lan';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Datos iniciales para las etapas
const stages = [
  { id: 1, label: 'Screener', icon: <InsertDriveFileIcon /> },
  { id: 2, label: 'Welcome screen', icon: <InsertDriveFileIcon /> },
  { id: 3, label: 'Implicit Association', icon: <LanIcon /> },
  { id: 4, label: 'Cognitive task', icon: <PersonIcon /> },
  { id: 5, label: 'Eye Tracking', icon: <VisibilityIcon /> },
  { id: 6, label: 'Thank you screen', icon: <InsertDriveFileIcon /> },
];

// Estilos para el texto seleccionado
const StyledListItemText = styled(ListItemText)<{ selected?: boolean }>(
  ({ selected }) => ({
    color: selected ? '#252BE6' : 'inherit',
    fontWeight: selected ? 'bold' : 'normal',
  })
);

export const RecruitSideBar: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number>(1);

  return (
    <Box sx={{ width: '250px', ml: 2, mt: 2 }}>
      {/* Título */}
      <Typography color="#8C8C8C" fontSize={14} fontWeight={400} lineHeight="22px" mb={1.5}>
        Research’ stages
      </Typography>

      {/* Lista de etapas */}
      <List>
        {stages.map((stage) => (
          <ListItem
            component="li"
            key={stage.id}
            onClick={() => setSelectedStage(stage.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 0.5,
              color: selectedStage === stage.id ? '#252BE6' : 'inherit',
            }}
          >
            <StyledListItemText
              primary={stage.label}
              selected={selectedStage === stage.id}
              sx={{ cursor: 'pointer' }}
            />
            <ListItemIcon sx={{ minWidth: 'auto', ml: 1, color: selectedStage === stage.id ? '#252BE6' : '#4F4F4F', cursor: 'pointer' }}>
              {stage.icon}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
