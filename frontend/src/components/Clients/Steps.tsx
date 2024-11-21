import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';
import firstSetpPublicImage from '../../assets/firstStepPublicImage.png';
import CitySelector from '../../core-ui/Selectors/CitySelector';
import GenderSelector from '../../core-ui/Selectors/GenderSelector';
import { useState } from 'react';
import PublicStepSorteable from '../../core-ui/Sorteables/PublicStepSorteable';
import { StepProps } from '../../types/types';
import testApp from '../../assets/testApp.png';

export function WelcomeStep({ handleNextStep }: StepProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            gap: 2,
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                height: '218px',
                ml: 30
            }}>
                <Typography width='400px' height='92' textAlign='left' fontWeight={700} fontSize={20} lineHeight='26px' color='#262626' mb={2}>Hello! You have been invited</Typography>
                <Typography width='400px' height='92' textAlign='left' fontWeight={400} fontSize={18} lineHeight='23.4px' color='#8C8C8C'>You have been invited to participate in a survey to improve the future experience of our customers, so we need your help to make this the best experience possible.</Typography>
                <SocialStepButton handleNextStep={handleNextStep} label='Start' />
            </Stack>

            <img src={firstSetpPublicImage} alt="firstSetpPublicImage" style={{ width: '721px', height: '100%' }} />
        </Box>
    )
}

export function SelectCityStep({ handleNextStep }: StepProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: 2,
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                height: '218px',
                ml: 30
            }}>
                <Typography width='400px' height='92' textAlign='left' fontWeight={700} fontSize={20} lineHeight='26px' color='#262626' mb={2}>¿En qué ciudad vives?</Typography>
                <CitySelector />
                <SocialStepButton handleNextStep={handleNextStep} />
            </Stack>
        </Box>
    )
}

export function InstructionsStep({ handleNextStep }: StepProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: 2,
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                height: '218px',
            }}>
                <Typography width='400px' height='92' textAlign='left' fontWeight={700} fontSize={20} lineHeight='26px' color='#262626' mb={2}>Instructions</Typography>
                <Typography width='400px' height='92' textAlign='left' fontWeight={400} fontSize={18} lineHeight='23.4px' color='#8C8C8C'>You have been invited to participate in a survey to improve the future experience of our customers, so we need your help to make this the best experience possible.</Typography>
                <SocialStepButton handleNextStep={handleNextStep} label='Start' />
            </Stack>
        </Box>
    )
}

export function GenderStep({ handleNextStep }: StepProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: 2,
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                height: '218px',
                ml: 30
            }}>
                <Typography width='400px' height='92' textAlign='left' fontWeight={700} fontSize={20} lineHeight='26px' color='#262626' mb={2}>¿Con qué género te identificas?</Typography>
                <GenderSelector />
                <SocialStepButton handleNextStep={handleNextStep} />
            </Stack>
        </Box>
    )
}

export function SocialMediaStep({ handleNextStep }: StepProps) {
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.name;
        setSelectedPlatforms(prev =>
            prev.includes(value) ? prev.filter(platform => platform !== value) : [...prev, value]
        );
    };

    return (
        <FormControl component="fieldset" sx={{ width: '300px' }}>
            <Typography fontWeight={600} fontSize={18} mb={2}>¿Dónde tienes cuentas?</Typography>
            <FormGroup>
                {['Facebook', 'LinkedIn', 'X', 'Instagram', 'TikTok'].map((platform) => (
                    <FormControlLabel
                        key={platform}
                        control={
                            <Checkbox
                                checked={selectedPlatforms.includes(platform)}
                                onChange={handleChange}
                                name={platform}
                                sx={{
                                    color: selectedPlatforms.includes(platform) ? '#252BE6' : 'lightgray',
                                    '&.Mui-checked': { color: '#252BE6' },
                                }}
                            />
                        }
                        label={platform}
                    />
                ))}
            </FormGroup>
            <SocialStepButton handleNextStep={handleNextStep} />
        </FormControl>
    );
}

export function ProblemSolveStep({ handleNextStep }: StepProps) {
    const [link, setLink] = useState<string>('');

    const handleAnotherCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    };
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: 2,
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                height: '218px',
            }}>
                <Typography width='400px' height='92' textAlign='left' fontWeight={700} fontSize={20} lineHeight='26px' color='#8C8C8C' mb={2}>¿Cómo resolverías el problema?</Typography>
                <Typography width='400px' height='92' textAlign='left' fontWeight={400} fontSize={18} lineHeight='23.4px' color='#8C8C8C'> No problem. Just let us know your email address and we'll email you a password reset link that will allow you to choose a new one. You a password reset link.</Typography>
                <TextField
                    variant="outlined"
                    placeholder="mail@simmmple.com"
                    inputMode='email'
                    value={link}
                    onChange={handleAnotherCityChange}
                    sx={{
                        mt: 1,
                        width: '100%',
                    }}
                />
                <SocialStepButton handleNextStep={handleNextStep} />
            </Stack>
        </Box>
    )
}

export default function RatingStep({ handleNextStep }: StepProps) {
    const [selectedRating, setSelectedRating] = useState<number>();

    const handleChange = (value: number) => {
        setSelectedRating(value);
    };

    return (
        <Box sx={{ textAlign: 'start', mt: 4 }}>
            <Typography fontWeight={300} mb={2}>
                ¿El mensaje <b>fue amable</b>?
            </Typography>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                gap: 4,
            }}>
                {[1, 2, 3, 4, 5].map((value, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '100%',
                            border: '1px solid #D3DAEE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            bgcolor: selectedRating === value ? '#252BE6' : 'transparent',
                            '&:hover': {
                                bgcolor: selectedRating === value ? '#252BE6' : '#f0f0f0',
                            },
                        }}
                    >
                        <Button
                            onClick={() => handleChange(value)}
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '100%',
                                color: 'inherit',
                                bgcolor: 'transparent',
                                minWidth: 0,
                            }}
                        >
                            <Typography color={selectedRating === value ? 'white' : '#A3AED0'} fontWeight={400} fontSize={12}>
                                {value}
                            </Typography>
                        </Button>
                    </Box>
                ))}
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px', mx: 'auto', mt: 2 }}>
                <Typography variant="caption" color="#A3AED0" fontWeight={400} fontSize={12}>Muy en desacuerdo</Typography>
                <Typography variant="caption" color="#A3AED0" fontWeight={400} fontSize={12}>Muy de acuerdo</Typography>
            </Box>

            <SocialStepButton handleNextStep={handleNextStep} />
        </Box>
    );
}

export function OptionsStep({ handleNextStep }: StepProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '400px',
            height: '400px',
            gap: 2,
        }}>
            <Typography width='400px' height='92' textAlign='left' fontWeight={700} fontSize={20} lineHeight='26px' color='#8C8C8C' mb={2}>¿Cómo priorizarías las siguientes opciones?</Typography>
            <PublicStepSorteable />
            <SocialStepButton handleNextStep={handleNextStep} />
        </Box>
    );
}

export function TestAppNavigationStep({ handleNextStep }: StepProps) {
    const [step, setStep] = useState<number>(0);
  
    const handleImageClick = () => {
      if (step === 1) {
        setStep(2);
      }
    };
  
    const handleButtonClick = () => {
      if (step === 0) {
        setStep(1);
      } else if (step === 2) {
        handleNextStep();
      }
    };
  
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        gap: 2,
      }}>
        <Stack sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '800px',
          height: '185px',
          mt: 5,
        }}>
          <Typography 
            width='800px' 
            height='92' 
            textAlign='center' 
            fontWeight={700} 
            fontSize={20} 
            lineHeight='26px' 
            color='#262626' 
            mb={2}>
            A continuación, verás las pantallas de la nueva APP, por favor, navega por las imágenes y completa el proceso de darte de alta. Tus datos son simulados.
          </Typography>
          <Typography 
            width='centerpx' 
            height='92' 
            textAlign='center' 
            fontWeight={400} 
            fontSize={18} 
            lineHeight='23.4px' 
            color='#8C8C8C'>
            Da clic en la imagen para realizar las instrucciones o completar la prueba
          </Typography>
  
          {step !== 1 && (
            <Button 
              sx={{
                width: '137px',
                height: '40px',
                borderRadius: '4px',
                bgcolor: '#252BE6',
                color: 'white',
                mt: 3,
                placeSelf: 'flex-start',
              }} 
              onClick={handleButtonClick}>
              <Typography textTransform='initial'>Continuar</Typography>
            </Button>
          )}
        </Stack>
        <Box 
          sx={{
            width: '970px',
            height: '545.56px',
            backgroundColor: '#B5BDD9',
            mb: 10,
            cursor: step === 1 ? 'pointer' : 'default',
          }} 
          onClick={handleImageClick}>
          {step === 1 && (
            <img 
              src={testApp} 
              alt="testApp" 
              style={{ 
                width: '100%', 
                height: '100%' 
              }} 
            />
          )}
        </Box>
      </Box>
    );
  }
  

export function TestAppNavigationStepV2({ handleNextStep }: StepProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            gap: 2,
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '800px',
                height: '185px',
                mt: 5,
            }}>
                <Typography width='800px' height='92' textAlign='center' fontWeight={700} fontSize={20} lineHeight='26px' color='#262626' mb={2}>A continuación, verás las pantallas de la nueva APP, por favor, navega por las imágenes y completa el proceso de darte de alta. Tus datos son simulados.</Typography>
                <Typography width='centerpx' height='92' textAlign='center' fontWeight={400} fontSize={18} lineHeight='23.4px' color='#8C8C8C'>Da clic en la imagen para realizar las instrucciones o completar la prueba</Typography>
                <Stack sx={{
                    placeSelf: 'flex-start',
                }}>
                    <SocialStepButton handleNextStep={handleNextStep} />
                </Stack>
            </Stack>
            <Box sx={{
                width: '970px',
                height: '545.56px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                mb: 10,
            }}>
                {Array(3).fill(0).map((_, idx) => (
                    <Box key={idx} sx={{
                        width: '315px',
                        height: '100%',
                        bgcolor: '#B5BDD9',
                    }}></Box>
                ))}
            </Box>

        </Box>
    )
}

export function FinishStep() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            gap: 2,
        }}>
            <Stack sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '700px',
                height: '100%',
                ml: 30
            }}>
                <Stack sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: '50%'
                }}>
                    <Typography width='400px' height='92' textAlign='left' fontWeight={700} fontSize={20} lineHeight='26px' color='#262626' mb={2}>Thank you so much!</Typography>
                    <Typography width='400px' height='92' textAlign='left' fontWeight={400} fontSize={18} lineHeight='23.4px' color='#8C8C8C'>You have been invited to participate in a survey to improve the future experience of our customers, so we need your help to make this the best experience possible.</Typography>
                </Stack>
                <Typography width='600px' height='92' textAlign='left' fontWeight={400} fontSize={18} lineHeight='23.4px' color='#8C8C8C' sx={{ mt: '250px' }}>This site is protected by RE-CAPTCHA and the Google Privacy Policy</Typography>
            </Stack>

            <img src={firstSetpPublicImage} alt="firstSetpPublicImage" style={{ width: '721px', height: '100%' }} />
        </Box>
    )
}

function SocialStepButton({ handleNextStep, label }: StepProps) {
    return (
        <Button sx={{
            width: '137px',
            height: '40px',
            borderRadius: '4px',
            bgcolor: '#252BE6',
            color: 'white',
            mt: 3,
        }} onClick={handleNextStep}>
            <Typography textTransform='initial'>{label || 'Continuar'}</Typography>
        </Button>
    )
};
