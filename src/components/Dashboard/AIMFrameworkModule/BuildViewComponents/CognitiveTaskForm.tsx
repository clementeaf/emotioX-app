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

export function CognitiveTaskForm() {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '845px',
        gap: 3,
      }}>
        <Box sx={{
          display: 'flex',
          width: '845px',
          bgcolor: 'white',
          flexDirection: 'column',
          pb: 2,
        }}>
          <InvestigationTitleRequirement showConditionality={false} onToggleConditionality={() => { }} title='3.0.- Cognitive task' />
          <Box sx={{
            p: 2,
          }}>
            <Typography sx={{ opacity: 0.45, fontWeight: 400, fontSize: 14, lineBreak: 22, width: 804, height: 44 }}>In this section you can go deeper in the understanding of the participants by using declarative questions oriented to the working memory and comprhension of the previous elements exposed</Typography>
          </Box>
  
          {/** 3.1.- Question _italic_ **bold** - bullet list 1. ordered list */}
          <QuestionHeader questionText="3.1.- Question _italic_ **bold** - bullet list 1. ordered list" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
          <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
          <Box mt={1} ml={0.5}>
            <UploadSection deviceFrame="No Frame" setDeviceFrame={() => { }} onUploadClick={() => { }} />
          </Box>
  
          <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
  
          {/** 3.2.- Question _italic_ **bold** - bullet list 1. ordered list */}
          <QuestionHeader questionText="3.2.- Question _italic_ **bold** - bullet list 1. ordered list" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
          <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
          <Box mt={1}  ml={0.5}>
            <UploadSection deviceFrame="No Frame" setDeviceFrame={() => { }} onUploadClick={() => { }} />
          </Box>
  
          <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
  
          {/** 3.3.- Question _italic_ **bold** - bullet list 1. ordered list */}
          <QuestionHeader questionText="3.3.- Question _italic_ **bold** - bullet list 1. ordered list" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
          <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
          <Box mt={2}>
            <SorteableOptions />
          </Box>
          <Box mt={1} ml={0.5}>
            <UploadSection deviceFrame="No Frame" setDeviceFrame={() => { }} onUploadClick={() => { }} />
          </Box>
  
          <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
  
          {/** 3.4.- Question _italic_ **bold** - bullet list 1. ordered list */}
          <QuestionHeader questionText="3.4.- Question _italic_ **bold** - bullet list 1. ordered list" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
          <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
          <Box mt={2}>
            <SorteableOptions />
          </Box>
          <Box mt={1} ml={0.5}>
            <UploadSection deviceFrame="No Frame" setDeviceFrame={() => { }} onUploadClick={() => { }} />
          </Box>
           
  
          <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
  
          {/** 3.5.- Question _italic_ **bold** - bullet list 1. ordered list */}
          <QuestionHeader questionText="3.5.- Question _italic_ **bold** - bullet list 1. ordered list" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
          <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
          <Typography sx={{ width: 440, fontWeight: 400, fontSize: 14, lineHeight: '22px', color: '#8C8C8C', my: 2, ml: 2 }}>Choices (Press ENTER for new line or paste a list)</Typography>
          <RangeInput startValue={1} endValue={5} startLabel="" endLabel="" onStartValueChange={() => { }} onEndValueChange={() => { }} onStartLabelChange={() => { }} onEndLabelChange={() => { }} />
          <Box mt={1} ml={0.5}>
            <UploadSection deviceFrame="No Frame" setDeviceFrame={() => { }} onUploadClick={() => { }} />
          </Box>
  
          <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
  
          {/** 3.6.- Question _italic_ **bold** - bullet list 1. ordered list */}
          <QuestionHeader questionText="3.6.- Question _italic_ **bold** - bullet list 1. ordered list" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
          <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
          <Box mt={2}>
            <SorteableOptions />
          </Box>
  
          <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
  
          {/** 3.7.- Question _italic_ **bold** - bullet list 1. ordered list */}
          <QuestionHeader questionText="3.7.- Question _italic_ **bold** - bullet list 1. ordered list" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
          <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
          <Box mt={1.5}>
            <FileTestSection deviceFrame="No Frame" setDeviceFrame={() => { }} />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
          }}>
            <FilesUpload />
            <FileListTable />
          </Box>
  
          <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
  
          {/** 3.8.- Question _italic_ **bold** - bullet list 1. ordered list */}
          <QuestionHeader questionText="3.8.- Question _italic_ **bold** - bullet list 1. ordered list" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
          <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
          <Box mt={1.5}>
            <FileTestSection deviceFrame="No Frame" setDeviceFrame={() => { }} />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
          }}>
            <FilesUpload />
            <FileListTable />
          </Box>
  
        </Box>
        <TechniqueDescription />
      </Box>
    )
  }