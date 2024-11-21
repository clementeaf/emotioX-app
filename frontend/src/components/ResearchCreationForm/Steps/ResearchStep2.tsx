import { Stack, Typography, Card, Button } from '@mui/material';
import { useResearchStore } from '../../../store/useResearchStore';
import { grey } from '@mui/material/colors';
import behavioural from '../../../assets/researchForm2/behavioural.png';
import attention from '../../../assets/researchForm2/attention.png';
import insights from '../../../assets/researchForm2/insights.png';
import clients from '../../../assets/researchForm2/clients.png';

const researchTypes = [
  { label: 'Behavioural Research', value: 'Behavioural Research', image: behavioural },
  { label: "Attention's Prediction", value: "Attention's Prediction", image: attention },
  { label: 'Insights Finding', value: 'Insights Finding', image: insights },
  { label: "Client's Benchmark", value: "Client's Benchmark", image: clients },
];

export default function ResearchStep2() {
  const { selectedResearchType, setSelectedResearchType, setResearchModule } = useResearchStore();

  const handleSelection = (researchTitle: string) => {
    setSelectedResearchType(researchTitle);
    setResearchModule(researchTitle);
  };

  return (
    <>
      {/* Título principal */}
      <Typography variant="h6" fontWeight={500} color={grey[600]} alignSelf="flex-start">
        Kind of Research
      </Typography>
      <Typography variant="body2" color="gray" mt={1.5} mb={3} alignSelf="flex-start">
        Select the type of research you wish to carry out. In the next step, you will be able to select between different configurations.
      </Typography>

      {/* Lista de tipos de investigación */}
      <Stack spacing={3} width="100%" maxWidth="395px">
        {researchTypes.map(({ label, image, value }) => (
          <ResearchTypeCard
            key={value}
            label={label}
            image={image}
            isSelected={selectedResearchType === value}
            onSelect={() => handleSelection(value)}
          />
        ))}
      </Stack>
    </>
  );
}

/** Componente reutilizable para las tarjetas de selección */
interface ResearchTypeCardProps {
  label: string;
  image: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ResearchTypeCard: React.FC<ResearchTypeCardProps> = ({ label, image, isSelected, onSelect }) => {
  return (
    <Card
      onClick={onSelect}
      sx={{
        cursor: 'pointer',
        bgcolor: isSelected ? 'primary.main' : grey[50],
        color: isSelected ? 'white' : 'black',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.5,
      }}
    >
      {/* Contenido de la tarjeta */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <img
          src={image}
          alt={label}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '6px',
          }}
        />
        <Stack>
          <Typography fontSize="12px" fontWeight={500} color={isSelected ? 'white' : grey[600]}>
            Enterprise
          </Typography>
          <Typography fontWeight={600} color={isSelected ? 'white' : 'black'}>
            {label}
          </Typography>
        </Stack>
      </Stack>
      {/* Botón "Choose" */}
      <Button disableRipple sx={{ textTransform: 'initial' }}>
        <Typography fontWeight={300} color={isSelected ? 'white' : grey[600]} marginRight={2.5}>
          Choose
        </Typography>
      </Button>
    </Card>
  );
};
