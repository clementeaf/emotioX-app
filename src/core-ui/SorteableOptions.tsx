import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { EligibilityInput } from './ElegibilityInput';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AddChoiceButton } from './Forms/AddCoiceButton';

// Valores iniciales
const initialItems = [
    { id: '1', text: 'Option 1', eligibility: 'Qualify' },
    { id: '2', text: 'Option 2', eligibility: 'Qualify' },
    { id: '3', text: 'Option 3', eligibility: 'Qualify' },
];

// Componente principal
export function SorteableOptions() {
    const [items, setItems] = useState(initialItems);
    const sensors = useSensors(useSensor(PointerSensor));

    // Manejar el cambio de elegibilidad
    const handleEligibilityChange = (id: string, newEligibility: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, eligibility: newEligibility } : item
            )
        );
    };

    // Manejar la reorganización de los elementos después del arrastre
    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;

        setItems((prevItems) => {
            const oldIndex = prevItems.findIndex((item) => item.id === active.id);
            const newIndex = prevItems.findIndex((item) => item.id === over.id);
            return arrayMove(prevItems, oldIndex, newIndex);
        });
    };

    // Añadir un nuevo elemento a la lista
    const handleAddChoice = () => {
        const newId = (items.length + 1).toString(); // Genera un nuevo ID
        const newItem = { id: newId, text: `Option ${newId}`, eligibility: 'Qualify' };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography color='#8C8C8C' fontSize={14} fontWeight={400} lineHeight='22px'>
                Choices (Press ENTER for new line or paste a list)
            </Typography>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                        {items.map((item) => (
                            <SortableItem
                                key={item.id}
                                id={item.id}
                                text={item.text}
                                eligibility={item.eligibility}
                                onEligibilityChange={(newEligibility) => handleEligibilityChange(item.id, newEligibility)}
                            />
                        ))}
                    </Box>
                </SortableContext>
            </DndContext>

            <AddChoiceButton handleAddChoice={handleAddChoice}/>
        </Box>
    );
}

// Componente individual de cada elemento de la lista, con un selector de elegibilidad
function SortableItem({ id, text, eligibility, onEligibilityChange }: { id: string; text: string; eligibility: string; onEligibilityChange: (value: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                bgcolor: '#fff',
                p: 1,
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                width: '804px',
            }}
        >
            <DragIndicatorIcon sx={{ color: 'gray', mr: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
                <Typography>{text}</Typography>
            </Box>
            <EligibilityInput
                value={eligibility}
                onChange={onEligibilityChange}
            />
            <IconButton sx={{ color: 'red', ml: 2 }}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}
