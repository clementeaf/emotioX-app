import { Box, Stack, Typography } from "@mui/material";
import InvestigationTitleRequirement from "../../../../core-ui/Forms/InvestigationTitleRequirement";
import { QuestionHeader } from "../../../../core-ui/Forms/QuestionHeader";
import { CustomerSatisfactionScoreQuestion } from "../../../../core-ui/Forms/CustomerSatisfactionScoreQuestion";
import { CustomerEffortScoreQuestion } from "../../../../core-ui/Forms/CustomerEffortScoreQuestion";
import { CognitiveValueQuestion } from "../../../../core-ui/Forms/CognitiveValueQuestion";
import { RangeInput } from "../../../../core-ui/Forms/RangeInput";
import { NewEmotionalValueQuestion } from "../../../../core-ui/Forms/NewEmotionalValueQuestion";
import { TechniqueDescription } from "../../../../core-ui/Forms/TechniqueDescription";

export function SmartVocForm() {
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