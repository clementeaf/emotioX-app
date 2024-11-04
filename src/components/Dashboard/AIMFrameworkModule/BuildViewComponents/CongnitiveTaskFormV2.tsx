// CognitiveTaskForm.tsx
import { Box, Stack, Typography } from "@mui/material";
import InvestigationTitleRequirement from "../../../../core-ui/Forms/InvestigationTitleRequirement";
import { QuestionHeader } from "../../../../core-ui/Forms/QuestionHeader";
import { QuestionTitleInput } from "../../../../core-ui/Forms/QuestionTitleInput";
import { UploadSection } from "../../../../core-ui/Forms/UploadSection";
import { SorteableOptions } from "../../../../core-ui/SorteableOptions";
import { RangeInput } from "../../../../core-ui/Forms/RangeInput";
import { FileTestSection } from "../../../../core-ui/Forms/FileTestSection";
import { FilesUpload } from "../../../../core-ui/Forms/FilesUpload";
import { FileListTable } from "../../../../core-ui/Tables/FileListTable";
import { TechniqueDescription } from "../../../../core-ui/Forms/TechniqueDescription";
import cognitiveTaskConfig from "../../../../config/cognitiveTaskConfig.json";

export function CognitiveTaskFormV2() {
  const { title, description, questions } = cognitiveTaskConfig;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 3 }}>
      <Box sx={{ display: 'flex', width: '845px', bgcolor: 'white', flexDirection: 'column', pb: 2 }}>
        <InvestigationTitleRequirement
          showConditionality={false}
          onToggleConditionality={() => {}}
          title={title}
        />
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{
              opacity: 0.45,
              fontWeight: 400,
              fontSize: 14,
              lineBreak: 22,
              width: 804,
              height: 44
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Renderizar preguntas dinámicamente */}
        {questions.map((question, index) => (
          <Box key={index}>
            <QuestionHeader
              questionText={question.header}
              showConditionality={false}
              onToggleConditionality={() => {}}
              onDuplicate={() => {}}
              onDelete={() => {}}
            />
            
            <QuestionTitleInput
              questionText={question.questionText}
              questionType={question.questionType}
              required={question.required}
              onQuestionTextChange={() => {}}
              onQuestionTypeChange={() => {}}
              onRequiredToggle={() => {}}
            />

            {question.uploadSection && (
              <Box mt={1} ml={0.5}>
                <UploadSection deviceFrame="No Frame" setDeviceFrame={() => {}} onUploadClick={() => {}} />
              </Box>
            )}

            {question.sortableOptions && (
              <Box mt={2}>
                <SorteableOptions />
              </Box>
            )}

            {question.extraText && (
              <Typography
                sx={{
                  width: 440,
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '22px',
                  color: '#8C8C8C',
                  my: 2,
                  ml: 2
                }}
              >
                {question.extraText}
              </Typography>
            )}

            {question.rangeInput && (
              <RangeInput
                startValue={question.rangeInput.startValue}
                endValue={question.rangeInput.endValue}
                startLabel={question.rangeInput.startLabel}
                endLabel={question.rangeInput.endLabel}
                onStartValueChange={() => {}}
                onEndValueChange={() => {}}
                onStartLabelChange={() => {}}
                onEndLabelChange={() => {}}
              />
            )}

            {question.fileTestSection && (
              <Box mt={1.5}>
                <FileTestSection deviceFrame="No Frame" setDeviceFrame={() => {}} />
              </Box>
            )}

            {question.fileUpload && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <FilesUpload />
                <FileListTable />
              </Box>
            )}

            <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
          </Box>
        ))}
      </Box>

      <TechniqueDescription />
    </Box>
  );
}
