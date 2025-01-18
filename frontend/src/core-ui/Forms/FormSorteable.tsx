import { Active, closestCenter, DndContext, Over } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';
import { CSS } from '@dnd-kit/utilities';
import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { AntSwitch } from '../Switch';
import { ImageUploadV2 } from '../FIleUpload/ImageUpload';
import trash from "../../assets/trash.png";

interface Item {
    id: string;
    text: string;
    eligibility: string;
}

interface FormSorteableWithSwitchProps {
    question: string;
    isRequired?: boolean;
    fileUploadLabel?: string;
    deviceFrameOptions?: string[];
}

interface LinearScaleProps {
    question: string;
    isRequired?: boolean;
    fileUploadLabel?: string;
    deviceFrameOptions?: string[];
};

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

export function FormSorteableWithSwitch({
    question,
    isRequired = false,
    fileUploadLabel = 'Click to Upload',
    deviceFrameOptions = ['No Frame', 'Device Frame'],
}: FormSorteableWithSwitchProps) {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [selectedFrame, setSelectedFrame] = useState(deviceFrameOptions[0]);

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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setUploadedFile(event.target.files[0]);
        }
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
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: '100%',
                    width: '100%'
                }}>
                    <Typography>{question}</Typography>
                    {/* Condicionalidad */}
                    <FormControlLabel
                        sx={{ mr: 1 }}
                        control={
                            <AntSwitch
                                checked={isRequired}
                                onChange={() => { }}
                            />
                        }
                        label={
                            <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
                                Show Conditionality
                            </Typography>
                        }
                        labelPlacement="start"
                    />
                </Box>
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
                    {/* Condicionalidad */}
                    <FormControlLabel
                        sx={{ mr: 1 }}
                        control={
                            <AntSwitch
                                checked={isRequired}
                                onChange={() => { }}
                            />
                        }
                        label={
                            <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
                                Required
                            </Typography>
                        }
                        labelPlacement="start"
                    />
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
                                label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Show “Other” option</Typography>}
                                labelPlacement="end"
                                sx={{
                                    mt: 1,
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Randomize the order of questions</Typography>}
                                labelPlacement="end"
                            />
                        </Stack>
                    </Box>
                </SortableContext>
            </DndContext>
            {/* Campo de subida de archivo */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: 2,
                    p: 2,
                    border: '1px solid lightgray',
                    borderRadius: 1,
                    width: '100%',
                    maxWidth: 775,
                    ml: 2,
                    mt: 2,
                    height: 104,
                    bgcolor: '#e9f0fc',
                }}
            >
                <Typography>
                    <strong>{isRequired ? '*' : ''} Upload (optional):</strong>
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box sx={{
                        height: '100%',
                        maxHeight: 40,
                        width: '100%',
                        maxWidth: 148,
                        backgroundColor: 'white',
                        border: '1px solid lightgray',
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button
                            variant='text'
                            component="label"
                            sx={{ textTransform: 'none', color: 'black' }}
                        >
                            {fileUploadLabel}
                            <input
                                type="file"
                                hidden
                                onChange={handleFileUpload}
                            />
                        </Button>
                    </Box>
                    {uploadedFile && (
                        <Typography
                            variant="body2"
                            sx={{ color: 'green', mt: 1 }}
                        >
                            File uploaded: {uploadedFile.name}
                        </Typography>
                    )}
                    <Typography variant="caption" sx={{ color: '#555', fontSize: 14, }}>
                        Recommended resolution is 1000x1000px with file size
                    </Typography>
                </Box>
                {/* Selección de marco del dispositivo */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Typography >Device Frame</Typography>
                    <FormControl>
                        <Select
                            value={selectedFrame}
                            onChange={(e) => setSelectedFrame(e.target.value)}
                            sx={{
                                backgroundColor: 'white',
                            }}
                        >
                            {deviceFrameOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <div style={{
                width: 800,
                height: 1,
                backgroundColor: 'lightgray',
                marginLeft: 20,
                marginTop: 30
            }} />
        </Box>
    );

}

export function FormSorteableWithSwitchNoImg({
    question,
    isRequired = false,
}: FormSorteableWithSwitchProps) {
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
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: '100%',
                    width: '100%'
                }}>
                    <Typography>{question}</Typography>
                    {/* Condicionalidad */}
                    <FormControlLabel
                        sx={{ mr: 1 }}
                        control={
                            <AntSwitch
                                checked={isRequired}
                                onChange={() => { }}
                            />
                        }
                        label={
                            <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
                                Show Conditionality
                            </Typography>
                        }
                        labelPlacement="start"
                    />
                </Box>
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
                    {/* Condicionalidad */}
                    <FormControlLabel
                        sx={{ mr: 1 }}
                        control={
                            <AntSwitch
                                checked={isRequired}
                                onChange={() => { }}
                            />
                        }
                        label={
                            <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
                                Required
                            </Typography>
                        }
                        labelPlacement="start"
                    />
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
                                label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Show “Other” option</Typography>}
                                labelPlacement="end"
                                sx={{
                                    mt: 1,
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Randomize the order of questions</Typography>}
                                labelPlacement="end"
                            />
                        </Stack>
                    </Box>
                </SortableContext>
            </DndContext>
            <div style={{
                width: 800,
                height: 1,
                backgroundColor: 'lightgray',
                marginLeft: 20,
                marginTop: 30
            }} />
        </Box>
    );

}

interface ImageTableProps {
    uploadedImages: { file: File; error: boolean; time: number }[];
    onDelete: (index: number) => void;
    onIncreaseTime: (index: number) => void;
    onDecreaseTime: (index: number) => void;
}

export function FormSorteableWithMultipleImg({
    question,
    isRequired = false,
    deviceFrameOptions = ['No Frame', 'Device Frame'],
}: FormSorteableWithSwitchProps) {
    const [selectedFrame, setSelectedFrame] = useState(deviceFrameOptions[0]);
    const [uploadedImages, setUploadedImages] = useState<
        { file: File; error: boolean; time: number }[]
    >([]);

    const handleImageUpload = (file: File) => {
        if (!file) return;
    
        const newImage = {
            file,
            error: file.size > 5 * 1024 * 1024, // Archivo mayor a 5 MB
            time: 0, // Agregar la propiedad 'time' con un valor inicial
        };
    
        setUploadedImages((prevImages) => {
            // Limitar a un máximo de 3 imágenes
            const updatedImages = [...prevImages, newImage];
            return updatedImages.slice(0, 3);
        });
    };

    const removeImage = (index: number) => {
        setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    // Incrementar el tiempo
    const handleIncreaseTime = (index: number) => {
        setUploadedImages((prev) =>
            prev.map((img, i) =>
                i === index ? { ...img, time: img.time + 1 } : img
            )
        );
    };

    // Disminuir el tiempo
    const handleDecreaseTime = (index: number) => {
        setUploadedImages((prev) =>
            prev.map((img, i) =>
                i === index && img.time > 0 ? { ...img, time: img.time - 1 } : img
            )
        );
    };

    // Eliminar una imagen
    const handleDeleteImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
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
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: '100%',
                    width: '100%'
                }}>
                    <Typography>{question}</Typography>
                    {/* Condicionalidad */}
                    <FormControlLabel
                        sx={{ mr: 1 }}
                        control={
                            <AntSwitch
                                checked={isRequired}
                                onChange={() => { }}
                            />
                        }
                        label={
                            <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
                                Show Conditionality
                            </Typography>
                        }
                        labelPlacement="start"
                    />
                </Box>
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
                    {/* Condicionalidad */}
                    <FormControlLabel
                        sx={{ mr: 1 }}
                        control={
                            <AntSwitch
                                checked={isRequired}
                                onChange={() => { }}
                            />
                        }
                        label={
                            <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
                                Required
                            </Typography>
                        }
                        labelPlacement="start"
                    />
                </Stack>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 808,
                    mt: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography fontWeight={600}>File to test</Typography>
                        <Typography color='gray'>Please, upload the image or video to be tested with eye tracking. </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Typography mr={2}>Device Frame</Typography>
                        <FormControl>
                            <Select
                                value={selectedFrame}
                                onChange={(e) => setSelectedFrame(e.target.value)}
                                sx={{
                                    backgroundColor: 'white',
                                }}
                            >
                                {deviceFrameOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>

                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    gap: 3,
                }}>

                    <Stack sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Stack>
                            <ImageUploadV2 handleImageUpload={handleImageUpload} />
                        </Stack>
                        <Stack mt={2} spacing={1} sx={{
                            width: '100%',
                            maxWidth: 255,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {uploadedImages.map((image, index) => (
                                <Stack
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        sx={{ color: image.error ? 'red' : 'inherit' }}
                                    >
                                        {image.file.name} ({(image.file.size / 1024 / 1024).toFixed(2)} MB)
                                    </Typography>
                                    <Button sx={{ p: 0 }} onClick={() => removeImage(index)}><img src={trash} alt="trash" style={{ width: 35, marginLeft: 30, marginBottom: 3 }} /></Button>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>

                    <Stack sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <ImageTable
                            uploadedImages={uploadedImages}
                            onDelete={handleDeleteImage}
                            onIncreaseTime={handleIncreaseTime}
                            onDecreaseTime={handleDecreaseTime}
                        />
                    </Stack>

                </Stack>
            </Stack>

            <div style={{
                width: 800,
                height: 1,
                backgroundColor: 'lightgray',
                marginLeft: 20,
                marginTop: 30
            }} />
        </Box>
    );

}

export const LinearScaleForm: React.FC<LinearScaleProps> = ({
    question,
    isRequired = false,
    fileUploadLabel = 'Click to Upload',
    deviceFrameOptions = ['No Frame', 'Device Frame'],
}) => {
    const [startValue, setStartValue] = useState(1);
    // const [endValue, setEndValue] = useState(5);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [selectedFrame, setSelectedFrame] = useState(deviceFrameOptions[0]);
    const [showConditionally, setShowConditionally] = useState(true);
    const [required, setRequired] = useState(isRequired);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setUploadedFile(event.target.files[0]);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                maxWidth: 800,
                margin: 'auto',
            }}
        >
            {/* Título de la pregunta */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{question}</Typography>
                <FormControlLabel
                    control={
                        <AntSwitch
                            checked={showConditionally}
                            onChange={(e) => setShowConditionally(e.target.checked)}
                        />
                    }
                    label="Show conditionally"
                    labelPlacement="start"
                />
            </Box>

            {/* Inputs principales */}
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
            }}>
                <TextField
                    sx={{
                        width: 504,
                    }}
                    placeholder="Ask something"
                    variant="outlined"
                />
                <FormControl sx={{
                    width: 150,
                }}>
                    <Select value="Linear scale" disabled>
                        <MenuItem value="Linear scale">Linear scale</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<AntSwitch checked={required} onChange={(e) => setRequired(e.target.checked)} />}
                    label="Required"
                    labelPlacement="start"
                />
            </Stack>

            {/* Linear scale inputs */}
            <Stack direction="column" spacing={2} width='100%' alignItems="start">
                <Typography fontSize={14} fontWeight={400} color='#8C8C8C'>Choices (Press ENTER for new line or paste a list)</Typography>
                <Stack direction='column' width='100%' gap={2}>
                    {/* Start Range Value */}
                    <Stack width='100%' direction='row' alignItems='center' gap={2}>
                        <Typography variant="subtitle2" mb={1} width={100}>
                            Start value
                        </Typography>
                        <TextField
                            type="number"
                            value={startValue}
                            onChange={(e) => setStartValue(Number(e.target.value))}
                            sx={{
                                width: 65,
                            }}
                            placeholder="Start value"
                        />
                        <TextField
                            type="text"
                            value={startValue}
                            onChange={(e) => setStartValue(Number(e.target.value))}
                            fullWidth
                            placeholder="Start label (optional)"
                        />
                    </Stack>

                    {/* End Range Value */}
                    <Stack width='100%' direction='row' alignItems='center' gap={2}>
                        <Typography variant="subtitle2" mb={1} width={100}>
                            End value
                        </Typography>
                        <TextField
                            type="number"
                            value={startValue}
                            onChange={(e) => setStartValue(Number(e.target.value))}
                            sx={{
                                width: 65,
                            }}
                            placeholder="Start value"
                        />
                        <TextField
                            type="text"
                            value={startValue}
                            onChange={(e) => setStartValue(Number(e.target.value))}
                            fullWidth
                            placeholder="End label (optional)"
                        />
                    </Stack>
                </Stack>
            </Stack>

            {/* Campo de subida de archivo */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'center',
                    gap: 2,
                    pt: 2,
                    border: '1px solid lightgray',
                    borderRadius: 1,
                    width: '100%',
                    mt: 2,
                    height: 104,
                    bgcolor: '#e9f0fc',
                }}
            >
                <Typography>
                    <strong>{isRequired ? '*' : ''} Upload (optional):</strong>
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box sx={{
                        height: '100%',
                        maxHeight: 40,
                        width: '100%',
                        maxWidth: 148,
                        backgroundColor: 'white',
                        border: '1px solid lightgray',
                        borderRadius: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button
                            variant='text'
                            component="label"
                            sx={{ textTransform: 'none', color: 'black' }}
                        >
                            {fileUploadLabel}
                            <input
                                type="file"
                                hidden
                                onChange={handleFileUpload}
                            />
                        </Button>
                    </Box>
                    {uploadedFile && (
                        <Typography
                            variant="body2"
                            sx={{ color: 'green', mt: 1 }}
                        >
                            File uploaded: {uploadedFile.name}
                        </Typography>
                    )}
                    <Typography variant="caption" sx={{ color: '#555', fontSize: 14, }}>
                        Recommended resolution is 1000x1000px with file size
                    </Typography>
                </Box>
                {/* Selección de marco del dispositivo */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Typography >Device Frame</Typography>
                    <FormControl>
                        <Select
                            value={selectedFrame}
                            onChange={(e) => setSelectedFrame(e.target.value)}
                            sx={{
                                backgroundColor: 'white',
                            }}
                        >
                            {deviceFrameOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* Checkboxes adicionales */}
            <Stack spacing={1}>
                <FormControlLabel
                    control={<Checkbox />}
                    label={<Typography fontSize="14px">Show “Other” option</Typography>}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={<Typography fontSize="14px">Randomize the order of questions</Typography>}
                />
            </Stack>
            <div style={{
                width: 800,
                height: 1,
                backgroundColor: 'lightgray',
                marginLeft: 20,
                marginTop: 30
            }} />
        </Box>
    );
};

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

const ImageTable: React.FC<ImageTableProps> = ({
    uploadedImages,
    onDelete,
    onIncreaseTime,
    onDecreaseTime,
}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow sx={{
                        width: 400
                    }}>
                        <TableCell width={150}>
                            <Typography fontWeight={600}>Name</Typography>
                        </TableCell>
                        <TableCell width={100} align="center">
                            <Typography fontWeight={600}>Time</Typography>
                        </TableCell>
                        <TableCell width={150} align="center">
                            <Typography fontWeight={600}>Actions</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {uploadedImages.map((image, index) => (
                        <TableRow key={index}>
                            {/* Columna Name */}
                            <TableCell>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            backgroundColor: "#e0f7fa",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={URL.createObjectURL(image.file)}
                                            alt={image.file.name}
                                            style={{ width: 30, height: 30 }}
                                        />
                                    </Box>
                                    <Stack>
                                        <Typography>{image.file.name}</Typography>
                                        <Typography
                                            color={image.error ? "red" : "gray"}
                                            fontSize={12}
                                        >
                                            {image.error ? "File too large" : "Edit hitzones"}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </TableCell>

                            {/* Columna Time */}
                            <TableCell align="center">
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IconButton
                                        onClick={() => onDecreaseTime(index)}
                                        size="small"
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography>{image.time} Segs</Typography>
                                    <IconButton
                                        onClick={() => onIncreaseTime(index)}
                                        size="small"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                            </TableCell>

                            {/* Columna Actions */}
                            <TableCell align="center">
                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Typography
                                        sx={{ color: "blue", cursor: "pointer", fontSize: 14 }}
                                    >
                                        Preview
                                    </Typography>
                                    <Typography
                                        sx={{ color: "red", cursor: "pointer", fontSize: 14 }}
                                        onClick={() => onDelete(index)}
                                    >
                                        Delete
                                    </Typography>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};