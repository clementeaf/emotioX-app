import { Box, List, ListItem, ListItemIcon, Typography, Link, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LanIcon from '@mui/icons-material/Lan';
import { useStageStore } from '../../../../store/useStageStore';

// Datos iniciales para las etapas
const stages = [
    { id: 1, label: 'Smart VOC', icon: <InsertDriveFileIcon /> },
    { id: 2, label: 'Cognitive task', icon: <LanIcon /> },
];

export default function ResultsSideBar() {
    const selectedStage = useStageStore((state) => state.selectedStage);
    const setSelectedStage = useStageStore((state) => state.setSelectedStage);

    return (
      <Box sx={{ width: '200px', ml: 2 }}>
        {/* Título */}
        <Typography color="#8C8C8C" fontSize={14} fontWeight={400} lineHeight="22px" mb={1.5}>
          Research’ stages
        </Typography>
  
        {/* Lista de etapas */}
        <List>
          {stages.map((stage) => (
            <ListItem
              key={stage.id}
              component="li"
              onClick={() => setSelectedStage(stage.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 0.5,
                color: selectedStage === stage.id ? '#252BE6' : 'inherit',
              }}
            >
              <ListItemText
                primary={stage.label}
                sx={{ fontWeight: selectedStage === stage.id ? 'bold' : 'normal', cursor: 'pointer' }}
              />
              <ListItemIcon sx={{ minWidth: 'auto', ml: 1, color: selectedStage === stage.id ? '#252BE6' : '#4F4F4F' }}>
                {stage.icon}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
  
        {/* Enlace de descarga */}
        <Link
          href="#"
          underline="none"
          sx={{
            color: '#8C8C8C',
            fontSize: 14,
            display: 'block',
            mt: 2,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Download Raw Data in .csv
        </Link>
      </Box>
    );
}
