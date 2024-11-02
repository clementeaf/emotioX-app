import React, { useState } from 'react';
import { Box, Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { grey } from '@mui/material/colors';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import dashIcon from '../../assets/line.png';

// Definir la estructura de la lista
const stages = [
  'Welcome screen',
  'Implicit Association',
  'Cognitive task',
  'Eye Tracking',
  'Thank you screen',
];

// Estilo para los elementos de la lista
const StyledListItem = styled(ListItem)<{ selected?: boolean }>(() => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '8px',
  padding: '8px',
  transition: 'background-color 0.3s, color 0.3s',
}));

// Componente principal
const ResearchStages: React.FC = () => {
  const [selectedStages, setSelectedStages] = useState<string[]>([
    'Welcome screen',
    'Implicit Association',
    'Cognitive task',
    'Eye Tracking',
  ]);

  const [items, setItems] = useState<string[]>(stages);

  // Manejar el cambio de selección de los elementos
  const handleToggle = (stage: string) => {
    setSelectedStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  };

  // Reordenar elementos después de arrastrar
  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Manejar el evento de arrastrar y soltar
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedItems = reorder(items, result.source.index, result.destination.index);
    setItems(reorderedItems);
  };

  return (
    <Box sx={{ width: 'auto', mt: 4 }}>
      <Typography sx={{ mb: 2, ml: 2, color: '#8C8C8C', fontWeight: 500, fontSize: 12, lineHeight: '20px' }}>Research’ stages</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((stage, index) => {
                const isSelected = selectedStages.includes(stage);
                return (
                  <Draggable key={stage} draggableId={stage} index={index}>
                    {(provided) => (
                      <StyledListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        selected={isSelected}
                        onClick={() => handleToggle(stage)}
                        sx={{
                          cursor: 'pointer',
                          borderBottom: `1px solid ${grey[200]}`,
                          mb: 1,
                        }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleToggle(stage)}
                            sx={{
                              p: 0,
                              m: 0,
                              '&.Mui-checked': {
                                color: isSelected ? '#253ce6' : 'black',
                              },
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={stage} />
                        <DragIndicatorIcon sx={{ color: grey[500], ml: 'auto' }} />
                      </StyledListItem>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Button sx={{
          width: '156px',
          height: '40px',
          bgcolor: '#252BE6',
          placeSelf: 'center',
        }}>
          <Typography textTransform='initial' fontWeight={400} fontSize={14} color='white' lineHeight='22px'>
            Add New Stage
          </Typography>
        </Button>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          gap: 3,
          mt: 4,
        }}>
          <Typography width='100%' textAlign='center' color='#1890FF'><b>Estimated time</b>: 8 to 11 mins</Typography>
          <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: 1,
            px: 2,
          }}>
            <img src={dashIcon} alt="dashIcon" style={{ width: '60px' }}/>
            <Typography width='auto' textAlign='center'>Save and</Typography>
            <img src={dashIcon} alt="dashIcon" style={{ width: '60px' }}/>
          </Stack>
        </Box>
        <Stack sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          gap: 1,
          my: 2,
        }}>
          <Button sx={{
            width: '104px',
            height: '40px',
            bgcolor: 'wite',
            placeSelf: 'center',
            border: `1px solid ${grey[200]}`,
          }}>
            <Typography textTransform='initial' fontWeight={400} fontSize={14} color='black' lineHeight='22px'>
              Preview
            </Typography>
          </Button>
          <Button sx={{
            width: '104px',
            height: '40px',
            bgcolor: '#252BE6',
            placeSelf: 'center',
          }}>
            <Typography textTransform='initial' fontWeight={400} fontSize={14} color='white' lineHeight='22px'>
              Publish
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ResearchStages;
