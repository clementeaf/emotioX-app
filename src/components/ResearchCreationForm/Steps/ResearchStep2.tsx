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
      <Typography variant="h6" fontWeight={500} color={grey[600]} alignSelf='flex-start'>
        Kind of Research
      </Typography>
      <Typography variant="body2" color="gray" mt={1.5} mb={2} alignSelf='flex-start'>
        Select the type of research you wish to carry out. In the next step, you will be able to select between different configurations.
      </Typography>
      
      {researchTypes.map(({ label, value, image }) => (
        <Card
          key={label}
          onClick={() => handleSelection(value)}
          sx={{
            cursor: 'pointer',
            bgcolor: selectedResearchType === value ? 'primary.main' : grey[50],
            color: selectedResearchType === value ? 'white' : 'black',
            borderRadius: '4px',
            display: 'flex',
            width: '100%',
            maxWidth: '395px',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 3,
          }}
        >
          <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 0.5,
          }}>
            <img src={image} alt="Img" style={{
              width: '80px',
              height: '80px',
              borderRadius: '6px',
            }}/>
            <Stack sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1,
              ml: 2,
            }}>
              <Typography 
                fontSize='12px' 
                fontWeight={500} 
                color={selectedResearchType === value ? 'white' : grey[600]}
              >
                Enterprise
              </Typography>
              <Typography 
                fontWeight={600} 
                color={selectedResearchType === value ? 'white' : 'black'}
              >
                {label}
              </Typography>
            </Stack>
          </Stack>
          <Button>
            <Typography 
              textTransform='initial' 
              fontWeight={300} 
              color={selectedResearchType === value ? 'white' : grey[600]}
              marginRight={2.5}
            >
              Choose
            </Typography>
          </Button>
        </Card>
      ))}
    </>
  );
}
