import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CustomModuleGrid({ children }: {
    children: React.ReactNode, moduleTitle: string
}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            alignItems: 'flex-start',
            gap: 2,
            bgcolor: 'white',
            border: `1px solid ${grey[300]}`,
        }}>
            {children}
            <CustomModuleGridItem />
        </Box>
    )
}

function CustomModuleGridItem() {
    const [fold, setFold] = useState(false);

    return (
        <Stack sx={{
            width: '100%',
            height: '100%',
            minHeight: '80px',
            bgcolor: 'rgba(37, 105, 230, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '80px',
            }}>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    px: 2,
                }}>
                    <FormControlLabel
                        control={<Checkbox {...label} />}
                        label={<Typography fontSize='14px' fontWeight={400} color='#262626'>Randomize the order of questions</Typography>}
                        labelPlacement="end"
                    />
                    <Button sx={{
                        bgcolor: '#252BE6',
                        px: 2,
                        py: 1,
                        }}
                        onClick={() => setFold(!fold)} 
                    >
                        <Typography textTransform='initial' fontSize={14} fontWeight={400} color='white'>
                            Add another question
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
            {fold && <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'space-between',
                    pl: 4,
                    pb: 4
                }}>
                    <Typography fontWeight={700} fontSize={14} color='#262626'>Add a question</Typography>
                    <Typography fontWeight={400} fontSize={14} color='#8C8C8C'>Please, select a kind of question to add to this section</Typography>
                </Stack>

                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        width: '100%',
                        justifyContent: 'flex-start',
                        pl: 4,
                        pb: 3,
                    }}
                >
                    {[...Array(4)].map((_, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                width: '250px',
                                marginBottom: '16px',
                                bgcolor: 'white',
                                border: `1px solid ${grey[200]}`,
                                borderRadius: '4px',
                                height: '95px',
                                mx: idx > 0 ? 5 : 0,
                            }}
                        >
                            <Box pl={3}>
                                <Typography fontWeight={700} fontSize={14} color="#262626">
                                    Short Test
                                </Typography>
                                <Typography fontWeight={400} fontSize={14} color="#8C8C8C">
                                    Open field
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>

            </Stack>}
        </Stack>
    )
}
