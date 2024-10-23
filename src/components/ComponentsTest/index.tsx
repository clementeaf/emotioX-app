import { Box, Stack } from "@mui/material";
import WelcomeScreen from "../../core-ui/Forms/WelcomeScreen";
import { TechniqueDescription } from "../../core-ui/Forms/TechniqueDescription";
import { AddQuestionSection } from "../../core-ui/AddQuestionSection";
import { SorteableOptions } from "../../core-ui/SorteableOptions";
import { QuestionHeader } from "../../core-ui/Forms/QuestionHeader";
import { useState } from "react";
import { UploadSection } from "../../core-ui/Forms/UploadSection";
import { QuestionTitleInput } from "../../core-ui/Forms/QuestionTitleInput";
import { RangeInput } from "../../core-ui/Forms/RangeInput";
import { FileTestSection } from "../../core-ui/Forms/FileTestSection";
import { FilesUpload } from "../../core-ui/Forms/FilesUpload";
import { FileListTable } from "../../core-ui/Tables/FileListTable";
import RecruitmentLink from "../../core-ui/Forms/RecruitmentLink";

export default function Index() {
    const [showConditionality, setShowConditionality] = useState(false);
    const [deviceFrame, setDeviceFrame] = useState('No Frame');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState('Single choice');
    const [required, setRequired] = useState(false);
    const [startValue, setStartValue] = useState(1);
    const [endValue, setEndValue] = useState(5);
    const [startLabel, setStartLabel] = useState('');
    const [endLabel, setEndLabel] = useState('');
    const [deviceFrameV2, setDeviceFrameV2] = useState('No Frame');

    console.log('uploadedImage: ', uploadedImage);
    console.log('imagePreview: ', imagePreview);

    // Manejo de la carga de archivos
    const handleUploadClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = handleFileChange;
        fileInput.click();
    };

    // Manejo del cambio de archivo
    const handleFileChange = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            setUploadedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Manejo de duplicación y eliminación de la pregunta
    const handleDuplicateQuestion = () => console.log('Duplicating question');
    const handleDeleteQuestion = () => console.log('Deleting question');

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '845px',
            height: 'auto',
            gap: 3,
            bgcolor: 'white',
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: 'auto',
                gap: 3,
            }}>
                <WelcomeScreen />
                <TechniqueDescription />
            </Stack>

            <QuestionHeader
                questionText="3.1.- Question _italic_ **bold** - bullet list 1. ordered list"
                showConditionality={showConditionality}
                onToggleConditionality={() => setShowConditionality(prev => !prev)}
                onDuplicate={handleDuplicateQuestion}
                onDelete={handleDeleteQuestion}
            />

            {/* Componente de entrada de pregunta */}
            <QuestionTitleInput
                questionText={questionText}
                questionType={questionType}
                required={required}
                onQuestionTextChange={setQuestionText}
                onQuestionTypeChange={setQuestionType}
                onRequiredToggle={() => setRequired(prev => !prev)}
            />

            <SorteableOptions />

            <UploadSection
                deviceFrame={deviceFrame}
                setDeviceFrame={setDeviceFrame}
                onUploadClick={handleUploadClick}
            />
            <RangeInput
                startValue={startValue}
                endValue={endValue}
                startLabel={startLabel}
                endLabel={endLabel}
                onStartValueChange={setStartValue}
                onEndValueChange={setEndValue}
                onStartLabelChange={setStartLabel}
                onEndLabelChange={setEndLabel}
            />

            <FileTestSection
                deviceFrame={deviceFrameV2}
                setDeviceFrame={setDeviceFrameV2}
            />

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
            }}>
                <FilesUpload />
            </Box>
            <FileListTable />

            <AddQuestionSection />

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
            }}>
                <RecruitmentLink />
            </Box>
        </Box>
    );
}
