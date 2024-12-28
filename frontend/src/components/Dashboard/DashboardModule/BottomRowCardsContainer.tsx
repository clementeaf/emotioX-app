import { Box, Button, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';

const researchTypes = ['All', 'Implicit', 'Biometrics', 'Predictions', 'Emotions', 'Cognitive'];

const profiles = [
    {
        title: 'Universidad del Desarrollo',
        author: 'Alexis Brantes',
        lastUpdate: '2024/03/15',
    },
    {
        title: 'Universidad Anahuac',
        author: 'Alexis Brantes',
        lastUpdate: '2024/03/15',
    },
    {
        title: 'Bebida Energética',
        author: 'Alexis Brantes',
        lastUpdate: '2024/03/15',
    },
    {
        title: 'Universidad Técnica Federico Santa María',
        author: 'Alexis Brantes',
        lastUpdate: '2024/03/15',
    },
]

export default function BottomRowCardsContainer() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '1135px',
            height: '350px',
            bgcolor: 'white',
            borderRadius: '4px',
            border: `1px solid ${grey[200]}`,
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                mb: 3,
            }}>
                <Typography fontWeight={500} fontSize={16} ml={1} lineHeight='24px' color='#262626'>Research’s types</Typography>
                <ResearchTypesButtons />       
            </Stack>

            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '1098px',
                    height: '243px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    {
                        profiles.map(({ title, author, lastUpdate }: { title: string, author: string, lastUpdate: string }, idx) => (
                            <ProfilesResearchCard key={idx} title={title} author={author} lastUpdate={lastUpdate} />
                        ))
                    }
                </Stack>
            </Stack>
        </Box>
    )
}

function ProfilesResearchCard({ title, author, lastUpdate }: { title: string, author: string, lastUpdate: string }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '259.5px',
            height: '243px',
            border: `1px solid ${grey[200]}`,
            borderRadius: '4px',
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                height: '100%',
                gap: 2,
                color: '#262626',
                p: 2,
            }}>
                <Typography fontSize={20} fontWeight={700} lineHeight='28px' sx={{ height: '57px', width: '219.5px' }} >{title}</Typography>
                <Typography fontSize={14} fontWeight={400} lineHeight='28px' color='#8C8C8C'>{author}</Typography>
                <Typography fontSize={16} fontWeight={500} lineHeight='24px' color='#8C8C8C'>Last modified: {lastUpdate}</Typography>
                <Button variant='outlined' sx={{
                    width: '219.5px',
                    height: '40px',
                    border: `1px solid ${grey[200]}`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography textTransform='initial' fontSize={14} fontWeight={400} color='#262626'>Review</Typography>
                </Button>
            </Stack>
        </Box>
    )
}

export function ResearchTypesButtons() {
    const [selectedType, setSelectedType] = useState('All');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mt: 2,
                width: '574px',
                height: '40px',
            }}
        >
            {researchTypes.map((type, idx) => (
                <Button
                    key={idx}
                    variant="text"
                    onClick={() => setSelectedType(type)}
                    sx={{
                        p: 0,
                        px: 2,
                        height: '40px',
                        border: `1px solid ${type === selectedType ? 'blue' : grey[200]}`,
                        borderRadius: '4px',
                        backgroundColor: type === selectedType ? 'blue' : 'transparent',
                        '&:hover': {
                            backgroundColor: type === selectedType ? 'blue' : grey[100],
                        },
                    }}
                >
                    <Typography
                        textTransform="initial"
                        color={type === selectedType ? 'white' : 'gray'}
                    >
                        {type}
                    </Typography>
                </Button>
            ))}
        </Box>
    );
}
