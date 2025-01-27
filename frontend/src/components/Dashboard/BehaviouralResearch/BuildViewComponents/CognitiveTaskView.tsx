import { useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import InvestigationTitleRequirement from '../../../../core-ui/Forms/InvestigationTitleRequirement';
import { SingleForm } from '../../../../core-ui/Forms/SingleForm';
import { useCognitiveTaskStore } from '../../../../store/useCognitiveTaskStore';
import { containerStyles, formContainerStyles, typographyStyles } from '../../../../utils';



export default function CognitiveTaskView() {
  const required = useCognitiveTaskStore((state) => state.required);
  const setRequired = useCognitiveTaskStore((state) => state.setRequired);
  const questions = useCognitiveTaskStore((state) => state.questions);

  const handlePrintState = useCallback(() => {
    console.log('Current store state:', { required, questions });
  }, [required, questions]);

  return (
    <Box sx={containerStyles}>
      <Box sx={formContainerStyles}>
        <InvestigationTitleRequirement
          title="6.0.- Cognitive task"
          required={required}
          onToggleRequired={setRequired}
        />
        <Box sx={{ p: 2 }}>
          <Typography sx={typographyStyles}>
            In this section you can go deeper in the understanding of the participants by using declarative questions
            oriented to the working memory and comprehension of the previous elements exposed.
          </Typography>
        </Box>

        {/* Renderizar preguntas dinámicamente */}
        <Box sx={{ p: 2 }}>
        {questions.map((questionProps) =>
            <SingleForm questionId={questionProps.id} key={questionProps.id} />
        )}
        </Box>
        {/* Botón para imprimir el estado */}
        <Button variant="contained" color="primary" onClick={handlePrintState} sx={{ mt: 3 }}>
          Print Store State
        </Button>
      </Box>
    </Box>
  );
}
