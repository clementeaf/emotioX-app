import { Box, Typography, List, ListItem, Checkbox, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import add from '../../../assets/add.png';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';
import { useResultsStore } from '../../../store/useResultStore';

type StageType = 'Build' | 'Recruit' | 'Result';

type ResearchSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
  stageType: StageType;
};

export function ResearchSidebar({ frameworkType, stageType }: ResearchSidebarProps) {
  const { setStageIndex } = useSelectedResearchStore();
  const { selectedSection, setSelectedSection } = useResultsStore();

  // Obtener las etapas de configuración
  const stages = researchStagesConfig[frameworkType][stageType];

  // Verifica si estamos en `AIMFramework > Result` para mostrar el `Checkbox`
  const isAIMFrameworkResult = frameworkType === 'AIMFramework' && stageType === 'Result';

  return (
    <Box sx={{ width: '250px' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 2, mt: 3, ml: 2 }}>
        Research Stages
      </Typography>

      <List sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', ml: 1 }}>
        {stages.map(({ label }, index) => (
          <ListItem
            key={label}
            onClick={() => {
              if (isAIMFrameworkResult) {
                setSelectedSection(label);
              } else {
                setStageIndex(index);
              }
            }}
            disablePadding
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              p: 0,
              width: '100%',
              py: 1,
              borderBottom: `1px solid ${grey[200]}`,
              ml: 1,
              cursor: 'pointer',
            }}
          >
                <Checkbox
                  onChange={() => {}}
                  sx={{ mr: 1 }}
                />
                <Typography
                  onClick={() => setSelectedSection(label)}
                  sx={{ color: 'black', cursor: 'pointer' }}
                >
                  {label}
                </Typography>
          </ListItem>
        ))}
      </List>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
      }}>
        <Button sx={{
          width: '100%',
          maxWidth: 156,
          bgcolor: '#25A5E6',
          color: 'white',
          textTransform: 'none',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
        }}>
          <img src={add} alt='add' style={{ width: 14, height: 14}} /><Typography textTransform='initial' fontWeight={300} sx={{ mx: 1, fontSize: 14, fontWeight: 400 }}>Add New Stage</Typography>
        </Button>

        <Typography sx={{
          color: '#1890FF',
          fontSize: 16,
          fontWeight: 700,
          lineHeight: '24px',
          mt: 6,
        }}>Estimated time: <span style={{ fontWeight: 300}}>8 to 11 mins</span></Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mt: 3,
        }}>
          <div style={{ 
            width: 60,
            height: 1,
            backgroundColor: '#F0F0F0',
          }} />
          <Typography fontSize={16} fontWeight={400} lineHeight='24px' color='#262626'>Save and</Typography>
          <div style={{ 
            width: 60,
            height: 1,
            backgroundColor: '#F0F0F0',
          }} />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100%',
          mt: 3,
        }}>
          <Button sx={{
            width: '100%',
            maxWidth: 104,
            height: 36,
            borderRadius: 1,
            border: '1px solid #D9D9D9',
          }}>
            <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#262626' textTransform={'initial'}>Preview</Typography>
          </Button>
          <Button sx={{
            width: '100%',
            maxWidth: 104,
            height: 36,
            borderRadius: 1,
            bgcolor: '#252BE6',
          }}>
            <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='white' textTransform={'initial'}>Preview</Typography>
          </Button>
        </Box>
      </Box>

      {/* Opción de descarga solo visible en `Result` */}
      {stageType === 'Result' && (
        <Box sx={{ mt: 2 }}>
          <Typography
            component="a"
            href="#"
            sx={{
              display: 'inline-block',
              color: grey[600],
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '22px',
              textDecoration: 'none',
              cursor: 'pointer',
              borderBottom: `1px solid ${grey[100]}`,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Download Raw Data in .csv
          </Typography>
        </Box>
      )}
    </Box>
  );
}
