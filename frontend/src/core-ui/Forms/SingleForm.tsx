import React from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControlLabel,
    Select,
    MenuItem,
    IconButton,
    SelectChangeEvent,
    FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AntSwitch } from "../Switch";
import { useCognitiveTaskStore, Choice } from "../../store/useCognitiveTaskStore";

interface SingleFormProps {
    questionId: number; // ID de la pregunta desde el store
}

export const SingleForm: React.FC<SingleFormProps> = ({ questionId }) => {
    // Extraer datos y acciones del store
    const {
        questions,
        toggleVisibility,
        setQuestionRequired,
        updateQuestionText,
        updateUploadedFile,
        updateSelectedFrame,
        toggleConditionality,
        addChoice,
        removeChoice,
        updateChoice,
        setChoiceType,
    } = useCognitiveTaskStore((state) => state);

    const question = questions.find((q) => q.id === questionId);
    if (!question) return null;

    const {
        question: questionText,
        isVisible,
        required,
        placeholder,
        choiceType,
        choices,
        showConditionality,
        fileUploadLabel,
        deviceFrameOptions,
        selectedFrame,
        uploadedFile,
    } = question;

    // Handlers
    const handleAddChoice = () => addChoice(questionId);

    const handleDeleteChoice = (choiceId: number) => removeChoice(questionId, choiceId);

    const handleChoiceChange = (choiceId: number, key: keyof Choice, value: string) => {
        updateChoice(questionId, choiceId, key, value);
    };

    const handleOptionChange = (event: SelectChangeEvent<"singleChoice" | "multipleChoice">) => {
        const value = event.target.value as "singleChoice" | "multipleChoice";
        setChoiceType(questionId, value);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            updateUploadedFile(questionId, e.target.files[0]);
        }
    };

    const handleFrameChange = (event: SelectChangeEvent<string>) => {
        updateSelectedFrame(questionId, event.target.value);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 800 }}>
            {/* Encabezado */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {questionText}
                </Typography>
                <FormControlLabel
                    control={
                        <AntSwitch
                            checked={isVisible}
                            onChange={() => toggleVisibility(questionId)}
                        />
                    }
                    label="Show Conditionality"
                />
            </Box>

            {/* Campo de entrada principal */}
            <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={placeholder}
                    value={question.inputText || ""}
                    onChange={(e) => updateQuestionText(questionId, e.target.value)}
                />
                <Select
                    value={choiceType}
                    onChange={handleOptionChange} // Cambiar entre Single y Multiple Choice
                    sx={{ minWidth: 180 }}
                >
                    <MenuItem value="singleChoice">Single Choice</MenuItem>
                    <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                </Select>
                <FormControlLabel
                    control={
                        <AntSwitch
                            checked={required}
                            onChange={(e) => setQuestionRequired(questionId, e.target.checked)}
                        />
                    }
                    label="Required"
                />
            </Box>

            {/* Opciones dinámicas (solo si es Multiple Choice) */}
            {choiceType === "multipleChoice" && (
                <Box sx={{ mt: 3 }}>
                    {choices.map((choice) => (
                        <SimpleItem
                            key={choice.id}
                            item={choice}
                            onDelete={handleDeleteChoice}
                            onChange={handleChoiceChange}
                        />
                    ))}
                    <Button variant="contained" onClick={handleAddChoice} sx={{ mt: 2 }}>
                        Add Option
                    </Button>
                </Box>
            )}

            {/* Subida de archivo */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: 2,
                    p: 2,
                    border: '1px solid #aaa',
                    width: '100%',
                    maxWidth: 775,
                    height: 104,
                    bgcolor: '#e9f0fc',
                }}
            >
                <Typography>
                    <strong>{required ? '*' : ''} Upload (optional):</strong>
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
                            onChange={(e) => updateSelectedFrame(questionId, e.target.value)}
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

            {/* Selección del marco del dispositivo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                <Typography>Device Frame</Typography>
                <Select
                    value={selectedFrame}
                    onChange={handleFrameChange}
                    sx={{ minWidth: 180 }}
                >
                    {deviceFrameOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Mostrar condición adicional */}
            <Box sx={{ mt: 2 }}>
                <FormControlLabel
                    control={
                        <AntSwitch
                            checked={showConditionality}
                            onChange={() => toggleConditionality(questionId)}
                        />
                    }
                    label="Enable Conditionality"
                />
            </Box>
        </Box>
    );
};

// Subcomponente SimpleItem para manejar cada opción individual
interface SimpleItemProps {
    item: Choice;
    onDelete: (id: number) => void;
    onChange: (id: number, key: keyof Choice, value: string) => void;
}

const SimpleItem: React.FC<SimpleItemProps> = ({ item, onDelete, onChange }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                p: 1,
                border: "1px solid #ccc",
                borderRadius: 1,
            }}
        >
            <TextField
                value={item.textInput}
                onChange={(e) => onChange(item.id, "textInput", e.target.value)}
                fullWidth
            />
            <Select
                value={item.qualifier}
                onChange={(e) => onChange(item.id, "qualifier", e.target.value)}
                sx={{ minWidth: 180 }}
            >
                <MenuItem value="qualify">Qualify</MenuItem>
                <MenuItem value="disqualify">Disqualify</MenuItem>
            </Select>
            <IconButton onClick={() => onDelete(item.id)} color="error">
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};
