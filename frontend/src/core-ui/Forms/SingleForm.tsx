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
    SelectChangeEvent,
    FormControl,
    Stack,
    Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AntSwitch } from "../Switch";
import { useCognitiveTaskStore, Choice } from "../../store/useCognitiveTaskStore";

interface SingleFormProps {
    questionId: number;
}

export const SingleForm: React.FC<SingleFormProps> = ({ questionId }) => {
    const {
        questions,
        toggleVisibility,
        setQuestionRequired,
        updateQuestionText,
        updateUploadedFile,
        updateSelectedFrame,
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

    const handleOptionChange = (event: SelectChangeEvent<"singleChoice" | "multipleChoice" | "linearScale">) => {
        setChoiceType(questionId, event.target.value as "singleChoice" | "multipleChoice" | "linearScale");
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
                    onChange={handleOptionChange}
                    sx={{ minWidth: 180 }}
                >
                    <MenuItem value="singleChoice">Single Choice</MenuItem>
                    <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                    <MenuItem value="linearScale">Linear Scale</MenuItem>
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

            {choiceType === "singleChoice" && (
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

            {/* Opciones dinámicas (solo si es Linear Scale) */}
            {choiceType === "linearScale" && (
                <Box sx={{ mt: 3 }}>
                    <LinearScaleForm
                        question={questionText}
                        isRequired={required}
                        fileUploadLabel={fileUploadLabel}
                        deviceFrameOptions={deviceFrameOptions}
                    />
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
                            onChange={handleFrameChange}
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
                marginTop: 30,
                marginBottom: 30
            }} />
        </Box>
    );
};

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
                value={["qualify", "disqualify"].includes(item.qualifier) ? item.qualifier : "qualify"}
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


interface LinearScaleProps {
    question: string;
    isRequired?: boolean;
    fileUploadLabel?: string;
    deviceFrameOptions?: string[];
};

const LinearScaleForm: React.FC<LinearScaleProps> = () => {
    const [startValue, setStartValue] = useState(1);

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