import { Box, Button, Stack, TextField, Typography, Stepper, Step, StepLabel, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import back from '../../assets/back.png';

const steps = ['Name the Research', 'Kind of research', 'Techniques for Research'];

export default function ResearchForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    researchName: '',
    enterpriseName: '',
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Stack>
      <Typography sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 1.7,
        fontWeight: 600,
      }}>
        <img src={back} alt="back" />
        Form Home
      </Typography>
      <Stack sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Stack sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          bgcolor: 'white',
          width: '1175px',
          mt: 2,
          border: `1px solid ${grey[200]}`,
        }}>
          <Stack sx={{
            bgcolor: 'blue',
            width: '100%',
            height: '100%',
          }}>
            <Typography color='white' p={2}>Step 1 of 3</Typography>
          </Stack>
          <Stepper activeStep={activeStep} sx={{
            bgcolor: grey[100],
            width: '100%',
          }}>
            {steps.map((label, index) => (
              <Step key={index} sx={{ p: 3 }}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <Box sx={{ mt: 3, width: '325px' }}>
              <Typography variant="h6" fontWeight={500} color={grey[600]}>
                Name the Research
              </Typography>
              <Typography variant="body2" color="gray" mt={1.5} mb={2}>
                Please, name the research project and assign it to an existing client or create a new one.
              </Typography>

              <Stack spacing={2}>
                <Stack sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}>
                  <Typography fontWeight={400} fontSize={13} lineHeight='22px' color={grey[600]}>
                    Research's name
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="researchName"
                    value={formData.researchName}
                    onChange={handleChange}
                    placeholder="Project 001"
                  />
                </Stack>

                <Stack sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}>
                  <Typography fontWeight={400} fontSize={13} lineHeight='22px' color={grey[600]}>
                    It's made for
                  </Typography>
                  <TextField
                    select
                    variant="outlined"
                    fullWidth
                    name="enterpriseName"
                    value={formData.enterpriseName}
                    onChange={handleChange}
                    placeholder="Enterprise's name"
                  >
                    <MenuItem value="Enterprise 1">Enterprise 1</MenuItem>
                    <MenuItem value="Enterprise 2">Enterprise 2</MenuItem>
                  </TextField>
                </Stack>
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 8 }}>
                {/* <Button onClick={handleBack} disabled={activeStep === 0}>
                  Back
                </Button> */}
                <Button variant="contained" color="primary" onClick={handleNext} sx={{ width: '100%', p: 1 }}>
                  <Typography textTransform='initial' fontWeight={300}>
                    Next
                  </Typography>
                </Button>
              </Box>
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
