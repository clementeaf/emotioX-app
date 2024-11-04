// SmartVocForm.tsx
import { Box, Stack, Typography } from "@mui/material";
import InvestigationTitleRequirement from "../../../../core-ui/Forms/InvestigationTitleRequirement";
import { QuestionHeader } from "../../../../core-ui/Forms/QuestionHeader";
import { CustomerSatisfactionScoreQuestion } from "../../../../core-ui/Forms/CustomerSatisfactionScoreQuestion";
import { CustomerEffortScoreQuestion } from "../../../../core-ui/Forms/CustomerEffortScoreQuestion";
import { CognitiveValueQuestion } from "../../../../core-ui/Forms/CognitiveValueQuestion";
import { RangeInput } from "../../../../core-ui/Forms/RangeInput";
import { NewEmotionalValueQuestion } from "../../../../core-ui/Forms/NewEmotionalValueQuestion";
import { TechniqueDescription } from "../../../../core-ui/Forms/TechniqueDescription";
import smartVocConfig from "../../../../config/smartVocConfig.json";

const questionComponentsMap: Record<string, React.ComponentType<{ title: string }>> = {
  CustomerSatisfactionScoreQuestion,
  CustomerEffortScoreQuestion,
  CognitiveValueQuestion,
  NewEmotionalValueQuestion
};

export function SmartVocFormV2() {
  const { title, description, questions } = smartVocConfig;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
      <Box sx={{ display: 'flex', width: '845px', bgcolor: 'white', flexDirection: 'column' }}>
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
        {questions.map((question, index) => {
          const QuestionComponent = questionComponentsMap[question.type];
          if (!QuestionComponent) return null; // Ignora si el tipo no está en el mapa

          return (
            <Box key={index}>
              <QuestionHeader
                questionText={question.header}
                showConditionality={false}
                onToggleConditionality={() => {}}
                onDuplicate={() => {}}
                onDelete={() => {}}
              />
              <QuestionComponent title={question.title} />

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

              <Stack sx={{ width: 800, height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
            </Box>
          );
        })}
      </Box>

      <TechniqueDescription />
    </Box>
  );
}
