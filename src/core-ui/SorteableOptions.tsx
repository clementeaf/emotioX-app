import { Active, closestCenter, DndContext, Over } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { CSS } from '@dnd-kit/utilities';
import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { EligibilityInput } from './ElegibilityInput';

const initialItems = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
];

export function SorteableOptions() {
    const [items, setItems] = useState(initialItems);

    const handleOnDragEnd = ({ active, over }: { active: Active; over: Over | null }) => {
        if (!over || active.id === over.id) {
            return;
        }

        setItems((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
        });
    };
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '844px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            ml: 2,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '580px',
            }}>
                <Typography color='#8C8C8C' fontSize={14} fontWeight={400} lineHeight='22px'>Choices (Press ENTER for new line or paste a list)</Typography>
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleOnDragEnd}>
                    <SortableContext
                        items={items.map(item => item.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 4,
                            }}
                        >
                            {items.map((item) => (
                                <SortableItem key={item.id} id={item.id} text={item.text} />
                            ))}
                        </Box>
                    </SortableContext>
                </DndContext>
            </Box>
            <EligibilityInput />
        </Box>
    )
}

function SortableItem({ id, text }: { id: string; text: string }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
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
                bgcolor: '#fff',
                p: 1,
                borderRadius: '4px',
                width: '580px',
                border: '1px solid #e0e0e0',
                ...style,
            }}
        >
            <Typography sx={{ mr: 2, fontWeight: 700 }}>{id}</Typography>
            <DragIndicatorIcon sx={{ color: 'gray', mr: 2 }} />
            <TextField
                variant="outlined"
                value={text}
                sx={{ flexGrow: 1 }}
                slotProps={{
                    input: {
                        readOnly: true,
                    },
                }}
            />
        </Box>
    );
}
