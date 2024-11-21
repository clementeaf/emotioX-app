import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useResearchStore } from '../../store/useResearchStore';

interface ResearchOption {
  id: string;
  title: string;
  description: string;
}

const researchTypes: ResearchOption[] = [
  {
    id: 'behavioural-research',
    title: 'Biometric, Cognitive and Predictive',
    description: 'Evaluating one or more sections with biometrics, implicit association, and cognitive tasks. You can also have image and video predictions.',
  },
  {
    id: 'aim-framework',
    title: 'AIM Framework Stage 3',
    description: 'Start with VOC Smart or build an upgrade by your own.',
  },
];

export default function BehaviouralResearch({ title }: { title: string }) {
  const { selectedResearchModule, setResearchModule } = useResearchStore();

  const handleSelection = (moduleId: string) => {
    setResearchModule(moduleId);
  };

  return (
    <Box width="395px">
      {/* Título principal */}
      <Typography fontWeight={700} fontSize="20px" lineHeight="22px" color="#565656">
        {title || 'Techniques for Research'}
      </Typography>
      <Typography fontWeight={400} fontSize="14px" lineHeight="22px" color="#8c8c8c" mt={2}>
        Please, select the configuration for this research.
      </Typography>

      {/* Opciones de configuración */}
      {researchTypes.map(({ id, title, description }) => (
        <ResearchCard
          key={id}
          id={id}
          title={title}
          description={description}
          isSelected={selectedResearchModule === id}
          onSelect={handleSelection}
        />
      ))}
    </Box>
  );
}

/** Componente reutilizable para las tarjetas de selección */
interface ResearchCardProps {
  id: string;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ id, title, description, isSelected, onSelect }) => {
  return (
    <Card
      role="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(id)}
      sx={{
        cursor: 'pointer',
        bgcolor: isSelected ? '#7199E6' : '#F0F0F0',
        color: isSelected ? 'white' : 'black',
        borderRadius: '4px',
        display: 'flex',
        width: '100%',
        maxWidth: '395px',
        mt: 3,
        py: 2,
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
          bgcolor: '#7199E6',
          color: 'white',
        },
      }}
    >
      <Stack spacing={1} flex={1} maxWidth="100%" ml={2}>
        <Typography fontSize="16px" fontWeight={700} >
          {title}
        </Typography>
        <Typography
          fontSize="14px"
          fontWeight={400}
          color={isSelected ? 'white' : '#565656'}
          textAlign="justify"
          sx={{
            maxWidth: '267px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
      </Stack>
      <Button disableRipple onClick={() => onSelect(id)}>
        <Typography
          textTransform="initial"
          fontWeight={300}
          sx={{ mx: 1 }}
          color={isSelected ? 'white' : 'black'}
        >
          Choose
        </Typography>
      </Button>
    </Card>
  );
};
