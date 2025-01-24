import { useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import InvestigationTitleRequirement from '../../../../core-ui/Forms/InvestigationTitleRequirement';
import {
  FormSorteableWithMultipleImg,
  FormSorteableWithSwitch,
  FormSorteableWithSwitchNoImg,
  LinearScaleForm,
} from '../../../../core-ui/Forms/FormSorteable';
import { SingleForm } from '../../../../core-ui/Forms/SingleForm';
import { useCognitiveTaskStore } from '../../../../store/useCognitiveTaskStore';

// Estilos memoizados
const typographyStyles = {
  opacity: 0.45,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  width: '100%',
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  gap: 3,
};

const formContainerStyles = {
  display: 'flex',
  width: '845px',
  bgcolor: 'white',
  flexDirection: 'column',
  pb: 2,
};

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
          questionProps.isVisible ? (
            <SingleForm questionId={questionProps.id} key={questionProps.id} />
          ) : null
        )}
        </Box>


        {/* Componentes adicionales */}
        <FormSorteableWithSwitch question="6.3.- Question _italic_ **bold** - bullet list 1. ordered list" />
        <FormSorteableWithSwitch question="6.4.- Question _italic_ **bold** - bullet list 1. ordered list" />
        <LinearScaleForm
          question="6.5.- Question _italic_ **bold** - bullet list 1. ordered list"
          isRequired
          fileUploadLabel="Click to Upload"
          deviceFrameOptions={['No Frame', 'Device Frame']}
        />
        <FormSorteableWithSwitchNoImg question="6.6.- Question _italic_ **bold** - bullet list 1. ordered list" />
        <FormSorteableWithMultipleImg question="6.7.- Question _italic_ **bold** - bullet list 1. ordered list" />
        <FormSorteableWithMultipleImg question="6.8.- Question _italic_ **bold** - bullet list 1. ordered list" />

        {/* Botón para imprimir el estado */}
        <Button variant="contained" color="primary" onClick={handlePrintState} sx={{ mt: 3 }}>
          Print Store State
        </Button>
      </Box>
    </Box>
  );
}
