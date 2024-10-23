import { Active, closestCenter, DndContext, Over } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { CSS } from '@dnd-kit/utilities';
import { Box, Button, Checkbox, FormControlLabel, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface Item {
    id: string;
    text: string;
    eligibility: string;
}

const initialItems: Item[] = [
    { id: '1', text: 'Option 1', eligibility: 'Qualify' },
    { id: '2', text: 'Option 2', eligibility: 'Disqualify' },
    { id: '3', text: 'Option 3', eligibility: 'Disqualify' },
];

export default function FormSorteable() {
    const [items, setItems] = useState<Item[]>(initialItems);

    const handleOnDragEnd = ({ active, over }: { active: Active; over: Over | null }) => {
        if (!over || active.id === over.id) return;

        setItems((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
        });
    };

    // Handle adding a new choice
    const handleAddChoice = () => {
        const newId = (items.length + 1).toString();
        setItems([...items, { id: newId, text: `Option ${newId}`, eligibility: 'Qualify' }]);
    };

    // Handle deleting a choice
    const handleDelete = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <Box sx={{
            width: '100%',
            height: 'auto',
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                ml: 2,
                mt: 2,
                gap: 1,
            }}>
                <Typography>1.1.- Question _italic_ **bold** - bullet list 1. ordered list</Typography>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                <TextField
                    placeholder='Ask something'
                    variant="outlined"
                    sx={{ flexGrow: 1, mr: 2, width: '100%' }}
                    onChange={() => { }}
                />
                            <Select
                value='Single choice'
                onChange={() => { }}
                sx={{ minWidth: '120px', mr: 2 }}
            >
                <MenuItem value="Single choice">Single choice</MenuItem>
            </Select>
                </Stack>
            </Stack>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleOnDragEnd}
            >
                <SortableContext
                    items={items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            mt: 2,
                        }}
                    >
                        <Stack sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            px: 2
                        }}>
                            <Stack sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                width: '100%',
                            }}>
                                <Typography
                                    fontWeight={400}
                                    fontSize='14px'
                                    lineHeight='22px'
                                    color='#8C8C8C'
                                    mb={2}
                                >
                                    Choices (Press ENTER for new line or paste a list)
                                </Typography>
                                <Typography
                                    fontWeight={400}
                                    fontSize='14px'
                                    lineHeight='22px'
                                    color='#8C8C8C'
                                    mb={2}
                                    ml={38.5}
                                >
                                    Elegibility
                                </Typography>
                            </Stack>

                            <Stack sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}>
                                {items.map((item) => (
                                    <SortableItem
                                        key={item.id}
                                        item={item}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </Stack>

                            <Button
                                variant="contained"
                                onClick={handleAddChoice}
                                sx={{ mt: 1, bgcolor: '#6C9EFF', width: '158px', height: '40px' }}
                            >
                                <Typography textTransform='initial' fontWeight={400} fontSize={14} color='#fffff' lineHeight='22px'>
                                    Add another choice
                                </Typography>
                            </Button>
                            <FormControlLabel
                                control={<Checkbox />}
                                label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Randomize the order of questions</Typography>}
                                labelPlacement="end"
                                sx={{
                                    mt: 1,
                                }}
                            />
                        </Stack>
                    </Box>
                </SortableContext>
            </DndContext>
        </Box>
    );
}

function SortableItem({ item, onDelete }: { item: Item, onDelete: (id: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const combinedTransition = `${transition || ''} background-color 0.2s ease`;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: combinedTransition,
    };

    return (
        <Box
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                p: 1,
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                ...style,
            }}
        >
            <DragIndicatorIcon sx={{ color: 'gray', mr: 2, cursor: 'grab' }} />

            <TextField
                variant="outlined"
                value={item.text}
                sx={{ flexGrow: 1, mr: 2 }}
                onChange={() => { }}
            />

            <Select
                value={item.eligibility}
                onChange={() => { }}
                sx={{ minWidth: '120px', mr: 2 }}
            >
                <MenuItem value="Qualify">Qualify</MenuItem>
                <MenuItem value="Disqualify">Disqualify</MenuItem>
            </Select>

            <IconButton
                onClick={() => onDelete(item.id)}
                color="error"
                aria-label="delete"
            >
                <Typography
                    fontWeight={400}
                    fontSize='14px'
                    lineHeight='22px'
                    color='#8C8C8C'
                    mr={1}
                >
                    Delete
                </Typography>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}
