import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControlLabel,
    Select,
    MenuItem,
    IconButton,
    Stack,
    FormControl,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    SelectChangeEvent,
    Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AntSwitch } from "../Switch";
import { useCognitiveTaskStore, Choice, SingleImageQuestion } from "../../store/useCognitiveTaskStore";
import { ImageUploadV2 } from "../FIleUpload/ImageUpload";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { DeviceFrameProps, LinearScaleProps, SingleFormProps, UploadedImage } from "../../types/types";

/** Componente Principal */
export const SingleForm: React.FC<SingleFormProps> = ({ questionId }) => {
    // Obtener la pregunta específica del store
    const question = useCognitiveTaskStore((state) =>
        state.questions.find((q) => q.id === questionId)
    );

    // Validar si no se encontró la pregunta
    if (!question) {
        console.error(`❌ Question with ID ${questionId} not found.`);
        return null;
    }

    // Extraer propiedades generales de la pregunta
    const {
        question: questionText,
        isVisible,
        required,
        placeholder,
        choiceType,
        fileUploadLabel,
        deviceFrameOptions,
        selectedFrame,
    } = question;

    // Determinar si la pregunta maneja una sola imagen o múltiples imágenes
    const isMultipleImages = choiceType === "multipleImages";

    // Extraer propiedades específicas según el tipo de pregunta
    // const uploadedFile = !isMultipleImages ? (question as SingleImageQuestion).uploadedFile : null;
    // const uploadedImage = !isMultipleImages ? (question as SingleImageQuestion).uploadedImage : null;
    // const uploadedImages = isMultipleImages ? (question as MultipleImagesQuestion).uploadedImages : [];

    // Seleccionar las funciones necesarias del store
    const toggleVisibility = useCognitiveTaskStore((state) => state.toggleVisibility);
    const setQuestionRequired = useCognitiveTaskStore((state) => state.setQuestionRequired);
    const updateQuestionText = useCognitiveTaskStore((state) => state.updateQuestionText);
    const updateSingleImageFile = useCognitiveTaskStore((state) => state.updateSingleImageFile);
    // const updateSingleImageReference = useCognitiveTaskStore((state) => state.updateSingleImageReference);
    const addUploadedImage = useCognitiveTaskStore((state) => state.addUploadedImage);
    const updateSelectedFrame = useCognitiveTaskStore((state) => state.updateSelectedFrame);
    const setChoiceType = useCognitiveTaskStore((state) => state.setChoiceType);

    // Handlers
    const handleOptionChange = (event: SelectChangeEvent) => {
        setChoiceType(questionId, event.target.value as any);
    };

    /** ✅ Manejo de subida de archivos (Single o Multiple) */
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];

        if (isMultipleImages) {
            addUploadedImage(questionId, {
                id: `${Date.now()}-${file.name}`,
                file,
                fileName: file.name,
                size: file.size,
                format: file.type,
                uploadedAt: new Date(),
            });
        } else {
            updateSingleImageFile(questionId, file); // ✅ Aseguramos que se actualice en Zustand
        }
    };

    /** ✅ Manejo del cambio de frame */
    const handleFrameChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if (deviceFrameOptions?.includes(value)) {
            updateSelectedFrame(questionId, value);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 800 }}>
            <Header
                questionText={questionText}
                isVisible={isVisible}
                toggleVisibility={() => toggleVisibility(questionId)}
            />
            <MainInputSection
                placeholder={placeholder}
                inputText={question.inputText || ""}
                updateQuestionText={(text) => updateQuestionText(questionId, text)}
                choiceType={choiceType}
                handleOptionChange={handleOptionChange}
                required={required}
                disabled={!isVisible}
                setQuestionRequired={(value) => setQuestionRequired(questionId, value)}
            />

            {choiceType === "multipleImages" ? (
                <ImageUploadManager disabled={isVisible} />
            ) : (
                <QuestionForm choiceType={choiceType} questionId={questionId} disabled={!isVisible} />
            )}

            {fileUploadLabel && choiceType !== "multipleImages" && (
                <UploadSection
                    fileUploadLabel={fileUploadLabel}
                    uploadedFile={!isMultipleImages ? (question as SingleImageQuestion).uploadedFile : undefined} // ✅ Se obtiene del estado
                    handleFileUpload={handleFileUpload}
                    selectedFrame={selectedFrame}
                    deviceFrameOptions={deviceFrameOptions}
                    handleFrameChange={handleFrameChange}
                    disabled={!isVisible}
                />
            )}
            <div style={{
                width: '100%',
                height: 1,
                backgroundColor: 'lightgray',
                marginTop: 30,
                marginBottom: 30
            }} />
        </Box>
    );
};

/** Subcomponentes */
const Header: React.FC<{
    questionText: string;
    isVisible: boolean;
    toggleVisibility: () => void;
}> = ({ questionText, isVisible, toggleVisibility }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {questionText}
        </Typography>
        <FormControlLabel
            control={<AntSwitch checked={isVisible} onChange={toggleVisibility} />}
            label="Show Conditionality"
        />
    </Box>
);

const MainInputSection: React.FC<{
    placeholder: string;
    inputText: string;
    updateQuestionText: (text: string) => void;
    choiceType: string;
    handleOptionChange: (event: SelectChangeEvent) => void;
    required: boolean;
    setQuestionRequired: (value: boolean) => void;
    disabled: boolean;
}> = ({ placeholder, inputText, updateQuestionText, choiceType, handleOptionChange, required, setQuestionRequired, disabled }) => {
    const [localInputText, setLocalInputText] = useState(inputText);

    const handleBlur = () => {
        if (localInputText !== inputText) {
            updateQuestionText(localInputText); // Actualizar el store solo al desenfocar
        }
    };
    const options = [
        { value: "singleChoice", label: "Single Choice" },
        { value: "multipleChoice", label: "Multiple Choice" },
        { value: "linearScale", label: "Linear Scale" },
        { value: "multipleImages", label: "Multiple Images" },
    ];
    return (
        <Stack direction="row" spacing={2}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder={placeholder}
                value={localInputText}
                onChange={(e) => setLocalInputText(e.target.value)} // Actualizar solo el estado local
                onBlur={handleBlur} // Actualizar el store al desenfocar
                disabled={disabled}
            />
            <Select
                value={choiceType}
                onChange={handleOptionChange}
                sx={{ minWidth: 180 }}
                disabled={disabled}
            >
                {options.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
            <FormControlLabel
                control={
                    <AntSwitch
                        checked={required}
                        onChange={(e) => setQuestionRequired(e.target.checked)}
                        disabled={disabled}
                    />
                }
                label="Required"
            />
        </Stack>
    )
};

const UploadSection: React.FC<{
    fileUploadLabel: string;
    uploadedFile?: File | UploadedImage | null;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFrame?: string;
    deviceFrameOptions?: string[];
    handleFrameChange: (event: SelectChangeEvent) => void;
    disabled: boolean;
}> = ({ fileUploadLabel, uploadedFile, handleFileUpload, selectedFrame, deviceFrameOptions, handleFrameChange, disabled }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "start",
            gap: 2,
            p: 2,
            borderRadius: 2,
            width: "100%",
            maxWidth: 775,
            height: 104,
            bgcolor: "#e9f0fc",
        }}
    >
        <Typography color={disabled ? "#8C8C8C" : ''}>
            <strong><span style={{ color: 'red', marginRight: 8 }}>*</span>Upload (optional):</strong>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
                variant="text"
                component="label"
                sx={{ textTransform: "none", color: "black", backgroundColor: 'white', border: '1px solid lightgrey', px: 2, py: 1.5, maxWidth: 148 }}
                disabled={disabled}
            >
                {fileUploadLabel}
                <input type="file" hidden onChange={handleFileUpload} disabled={disabled} />
            </Button>
            <span style={{
                marginTop: 4,
                fontSize: '14px',
                color: '#8C8C8C',
                fontFamily: 'Arial'
            }}>Recommended resolution is 1000*1000px with file size</span>
            {uploadedFile && (
                <Typography variant="body2" sx={{ color: "green", mt: 1 }}>
                    File uploaded:
                    {uploadedFile instanceof File
                        ? uploadedFile.name
                        : uploadedFile?.fileName ?? "Unnamed file"}
                </Typography>
            )}
        </Box>
        <DeviceFrame
            selectedFrame={selectedFrame}
            handleFrameChange={handleFrameChange}
            deviceFrameOptions={deviceFrameOptions}
            disabled={disabled}
        />
    </Box>
);

const DeviceFrame: React.FC<DeviceFrameProps> = ({
    selectedFrame,
    handleFrameChange,
    deviceFrameOptions,
    disabled
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Typography fontWeight={500} color={disabled ? "#8C8C8C" : ''}>Device Frame</Typography>
            <FormControl>
                <Select
                    value={selectedFrame || ""}
                    onChange={handleFrameChange}
                    sx={{
                        backgroundColor: "white",
                        height: 30,
                    }}
                    disabled={disabled}
                >
                    {deviceFrameOptions?.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

const ImageTable: React.FC<{
    uploadedImages: { file: File; error: boolean; time: number }[];
    onDelete: (index: number) => void;
    onIncreaseTime: (index: number) => void;
    onDecreaseTime: (index: number) => void;
    disabled?: boolean;
}> = ({ uploadedImages, onDelete, onIncreaseTime, onDecreaseTime, disabled }) => (
    <TableContainer sx={{
        width: 500,
    }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {uploadedImages.map((img, index) => (
                    <TableRow key={index}>
                        <TableCell>{img.file.name}</TableCell>
                        <TableCell align="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <IconButton disabled={disabled} onClick={() => onDecreaseTime(index)} size="small">
                                    <RemoveIcon />
                                </IconButton>
                                {img.time}s
                                <IconButton disabled={disabled} onClick={() => onIncreaseTime(index)} size="small">
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                        </TableCell>
                        <TableCell align="center">
                            <Button onClick={() => onDelete(index)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

const QuestionForm: React.FC<{ choiceType: string; questionId: number, disabled: boolean }> = ({ choiceType, questionId, disabled }) => {
    const { questions, addChoice, removeChoice, updateChoice } = useCognitiveTaskStore((state) => state);
    const question = questions.find((q) => q.id === questionId);
    if (!question) return null;

    if (choiceType === "multipleChoice") {
        return (
            <Stack spacing={2} sx={{ mt: 3 }}>
                {question.choices.map((choice) => (
                    <SimpleItem
                        key={choice.id}
                        item={choice}
                        disabled={disabled}
                        onDelete={(id) => removeChoice(questionId, id)}
                        onChange={(id, key, value) => updateChoice(questionId, id, key, value)}
                    />
                ))}
                {choiceType === "multipleChoice" && (
                    <Button variant="contained" sx={{ width: '100%', maxWidth: 150 }} onClick={() => addChoice(questionId)} disabled={disabled}>
                        Add Option
                    </Button>
                )}
            </Stack>
        );
    }


    if (choiceType === "linearScale") {
        return (
            <Box sx={{ mt: 3 }}>
                <LinearScaleForm
                    question={question.question}
                    isRequired={question.required}
                    fileUploadLabel={question.fileUploadLabel}
                    deviceFrameOptions={question.deviceFrameOptions}
                    disabled={disabled}
                />
            </Box>
        );
    }

    return null;
};

export const SimpleItem: React.FC<{
    item: Choice;
    onDelete: (id: number) => void;
    onChange: (id: number, key: keyof Choice, value: string) => void;
    disabled: boolean;
}> = ({ item, onDelete, onChange, disabled }) => (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
            value={item.textInput}
            onChange={(e) => onChange(item.id, "textInput", e.target.value)}
            fullWidth
            disabled={disabled}
        />
        <Select
            value={item.qualifier}
            onChange={(e) => onChange(item.id, "qualifier", e.target.value)}
            sx={{ minWidth: 180 }}
            disabled={disabled}
        >
            <MenuItem value="Qualify">Qualify</MenuItem>
            <MenuItem value="Disqualify">Disqualify</MenuItem>
        </Select>
        <IconButton onClick={() => onDelete(item.id)} color="error" disabled={disabled}>
            <DeleteIcon />
        </IconButton>
    </Stack>
);

const LinearScaleForm: React.FC<LinearScaleProps> = ({ disabled }) => {
    const [startValue, setStartValue] = useState(1);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 800,
                margin: 'auto',
            }}
        >
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
                            disabled={disabled}
                            onChange={(e) => setStartValue(Number(e.target.value))}
                            sx={{
                                width: 65,
                            }}
                            placeholder="Start value"
                        />
                        <TextField
                            type="text"
                            value={startValue}
                            disabled={disabled}
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
                            disabled={disabled}
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
                            disabled={disabled}
                            onChange={(e) => setStartValue(Number(e.target.value))}
                            fullWidth
                            placeholder="End label (optional)"
                        />
                    </Stack>
                </Stack>
            </Stack>

            {/* Checkboxes adicionales */}
            <Stack spacing={1}>
                <FormControlLabel
                    disabled={disabled}
                    control={<Checkbox />}
                    label={<Typography fontSize="14px">Show “Other” option</Typography>}
                />
                <FormControlLabel
                    disabled={disabled}
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

const ImageUploadManager = ({ disabled }: { disabled: boolean }) => {
    const [uploadedImages, setUploadedImages] = useState<
        { file: File; error: boolean; time: number }[]
    >([]);

    const handleImageUpload = (file: File) => {
        const newImage = {
            file,
            error: file.size > 5 * 1024 * 1024,
            time: 0,
        };
        setUploadedImages((prev) => [...prev, newImage].slice(0, 3));
    };

    const removeImage = (index: number) => setUploadedImages((prev) => prev.filter((_, i) => i !== index));

    const adjustTime = (index: number, delta: number) => {
        setUploadedImages((prev) =>
            prev.map((img, i) => (i === index ? { ...img, time: Math.max(0, img.time + delta) } : img))
        );
    };

    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
        }}>
            <ImageUploadV2 disabled={disabled} handleImageUpload={handleImageUpload} />
            <ImageTable
                uploadedImages={uploadedImages}
                disabled={disabled}
                onDelete={removeImage}
                onIncreaseTime={(index) => adjustTime(index, 1)}
                onDecreaseTime={(index) => adjustTime(index, -1)}
            />
        </Stack>
    );
};