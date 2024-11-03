import { Box, Stack, Typography } from '@mui/material'
import WelcomeScreen, { ThankYouScreen } from '../../../core-ui/Forms/WelcomeScreen'
import { TechniqueDescription } from '../../../core-ui/Forms/TechniqueDescription'
import InvestigationTitleRequirement from '../../../core-ui/Forms/InvestigationTitleRequirement'
import { QuestionHeader } from '../../../core-ui/Forms/QuestionHeader'
import { RangeInput } from '../../../core-ui/Forms/RangeInput'
import { CustomerSatisfactionScoreQuestion } from '../../../core-ui/Forms/CustomerSatisfactionScoreQuestion'
import { CustomerEffortScoreQuestion } from '../../../core-ui/Forms/CustomerEffortScoreQuestion'
import { CognitiveValueQuestion } from '../../../core-ui/Forms/CognitiveValueQuestion'
import { NewEmotionalValueQuestion } from '../../../core-ui/Forms/NewEmotionalValueQuestion'
import { useStepStore } from '../../../store/useStepStore'
import { QuestionTitleInput } from '../../../core-ui/Forms/QuestionTitleInput'
import { UploadSection } from '../../../core-ui/Forms/UploadSection'
import { SorteableOptions } from '../../../core-ui/SorteableOptions'
import { FileTestSection } from '../../../core-ui/Forms/FileTestSection'
import { FilesUpload } from '../../../core-ui/Forms/FilesUpload'
import { FileListTable } from '../../../core-ui/Tables/FileListTable'
import { AddQuestionSection } from '../../../core-ui/AddQuestionSection'

export default function Index() {
  const { step } = useStepStore();

  const renderContent = () => {
    switch (step) {
      case 0:
        return <WelcomeScreenContainer />;
      case 1:
        return <SmartVocForm />;
      case 2:
        return <CognitiveTaskForm />;
      case 3:
        return <ThankYouScreenContainer />;
      default:
        return <Typography>Seleccione una etapa</Typography>;
    }
  };
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
    }}>
      <Typography mb={3} mt={1} color='#262626' fontWeight={700} fontSize={20} lineHeight='28px'>AIM Framework Stage 3’s name</Typography>
      {renderContent()}
      <Box sx={{
        mt: 2,
      }}>
        {step !== 0 && step !== 3 && <AddQuestionSection />}
      </Box>
    </Box>
  )
}

function WelcomeScreenContainer() {
  return (
    <Box sx={{
      display: 'flex',
      gap: 3,
    }}>
      <WelcomeScreen />
      <TechniqueDescription />
    </Box>
  )
}

function SmartVocForm() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: 3,
    }}>
      <Box sx={{
        display: 'flex',
        width: '845px',
        bgcolor: 'white',
        flexDirection: 'column',
      }}>
        <InvestigationTitleRequirement showConditionality={false} onToggleConditionality={() => { }} title='2.0.- Smart VOC' />
        <Box sx={{
          p: 2,
        }}>
          <Typography sx={{ opacity: 0.45, fontWeight: 400, fontSize: 14, lineBreak: 22, width: 804, height: 44 }}>In this section you can go deeper in the understanding of the participants by using declarative questions oriented to the working memory and comprhension of the previous elements exposed</Typography>
        </Box>

        <QuestionHeader questionText="2.1.- Question: Customer Satisfaction Score (CSAT)" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
        <CustomerSatisfactionScoreQuestion title='How would you rate your overall satisfaction level with [company]?' />

        <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />

        <QuestionHeader questionText="2.2.- Question: Customer Effort Score (CES)" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
        <CustomerEffortScoreQuestion title='It was easy for me to handle my issue today' />

        <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />

        <QuestionHeader questionText="2.3.- Question: Cognitive Value (CV)" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
        <CognitiveValueQuestion title='Example: This was the best app my eyes had see' />
        <Typography sx={{ width: 440, fontWeight: 400, fontSize: 14, lineHeight: '22px', color: '#8C8C8C', my: 2, ml: 2 }}>Choices (Press ENTER for new line or paste a list)</Typography>
        <RangeInput startValue={1} endValue={5} startLabel="" endLabel="" onStartValueChange={() => { }} onEndValueChange={() => { }} onStartLabelChange={() => { }} onEndLabelChange={() => { }} />

        <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />

        <QuestionHeader questionText="2.4.- Question: Net Emotional Value (NEV)" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
        <NewEmotionalValueQuestion title='How do you feel about the experience offered by the [company]?' />

        <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />

        <QuestionHeader questionText="2.5.- Question: Net Promoter Score (NPS)" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
        <NewEmotionalValueQuestion title='On a scale from 0-10, how likely are you to recommend [company] to a friend or colleague?' />

        <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />

        <QuestionHeader questionText="2.6.- Question: Voice of Customer (VOC)" showConditionality={false} onToggleConditionality={() => { }} onDuplicate={() => { }} onDelete={() => { }} />
        <CognitiveValueQuestion title='How can we improve the service?' />
      </Box>

      <TechniqueDescription />
    </Box>
  )
}

function CognitiveTaskForm() {
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

function ThankYouScreenContainer() {
  return (
    <Box sx={{
      display: 'flex',
      gap: 3,
    }}>
      <ThankYouScreen />
      <TechniqueDescription />
    </Box>
  )
}

