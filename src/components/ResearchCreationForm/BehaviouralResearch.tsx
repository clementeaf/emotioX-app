import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useResearchStore } from '../../store/useResearchStore';

export default function BehaviouralResearch({ title }: { title: string }) {
    const { selectedResearchType, setResearchModule, selectedResearchModule } = useResearchStore();
    console.log('selectedResearchModule: ', selectedResearchModule);

    const researchTypes = [
        {
            id: 'behavioural-research',
            title: 'Biometric, Cognitive and Predictive',
            description: 'Evaluating one or more sections with biometrics, implicit association and cognitive tasks. Also, you can have image and video predictions.',
        },
        {
            id: 'aim-framework',
            title: 'AIM Framework Stage 3',
            description: 'Start with VOC Smart or build an upgrade by your own.',
        },
    ];

    const handleSelection = (researchTitle: string) => {
        setResearchModule(researchTitle);
    };


    return (
        <Box width='395px'>
            <Typography fontWeight={700} fontSize='20px' lineHeight='22px' color='#565656'>
                {title || 'Techniques for Research'}
            </Typography>
            <Typography fontWeight={400} fontSize='14px' lineHeight='22px' color='#8c8c8c' mt={2}>
                Please, select the configuration for this research.
            </Typography>

            {researchTypes.map(({ id, title, description }, index) => (
                <Card
                    onClick={() => handleSelection(title)}
                    key={index}
                    sx={{
                        cursor: 'pointer',
                        bgcolor: selectedResearchModule === id ? '#7199E6' : '#F0F0F0',
                        color: selectedResearchModule === id ? 'white' : 'black',
                        borderRadius: '4px',
                        display: 'flex',
                        width: '100%',
                        maxWidth: '395px',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 3,
                        py: 2,
                        transition: 'background-color 0.3s, color 0.3s',
                        '&:hover': {
                            bgcolor: '#7199E6',
                            color: 'white',
                        },
                    }}
                >
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 1,
                            width: 'auto',
                            maxWidth: '100%',
                            px: 2,
                        }}
                    >
                        <Typography fontSize='16px' fontWeight={700}>
                            {title}
                        </Typography>
                        <Typography
                            fontWeight={400}
                            fontSize='16px'
                            textAlign='justify'
                            sx={{
                                maxWidth: '267px',
                                maxHeight: '96px',
                            }}
                        >
                            {description}
                        </Typography>
                    </Stack>
                    <Button onClick={() => handleSelection(title)}>
                        <Typography
                            textTransform='initial'
                            fontWeight={300}
                            sx={{ mx: 1 }}
                            color={selectedResearchType === title ? 'white' : 'black'}
                        >
                            Choose
                        </Typography>
                    </Button>
                </Card>
            ))}
        </Box>
    );
}
