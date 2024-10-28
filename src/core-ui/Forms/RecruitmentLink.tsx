import { Box, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { AntSwitch } from '../Switch'
import { useState } from 'react';

type Option = {
    label: string;
    value: string;
};

const options = [
    { label: "Age", value: "age" },
    { label: "Country", value: "country" },
    { label: "Gender", value: "gender" },
    { label: "Education level", value: "education_level" },
    { label: "Annual household income", value: "annual_household_income" },
    { label: "Employment status", value: "employment_status" },
    { label: "Daily hours online", value: "daily_hours_online" },
    { label: "Technical proficiency", value: "technical_proficiency" },
];

const linkConfigOptions = [
    { label: "Allow respondents to take survey via mobile devices", value: "question1" },
    { label: "Track respondents location", value: "question2" },
    { label: "It can be taken multiple times within a single session", value: "question3" },
];

export default function RecruitmentLink() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '556.5px',
            height: '813px',
            bgcolor: 'white',
            borderRadius: '4px',
            border: `1px solid ${grey[300]}`,
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: '54px',
                borderBottom: `1px solid ${grey[300]}`,
            }}>
                <Typography fontWeight={500} fontSize={16} lineHeight='28px' color='#262626' p={2}>
                    Recruitment link
                </Typography>
            </Box>

            {/** Demographic questions */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '516.5px',
                height: 'auto',
                border: `1px solid ${grey[300]}`,
                borderRadius: '4px',
                mt: 2,
                ml: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '516.5px',
                    borderBottom: `1px solid ${grey[300]}`,
                }}>
                    <Box width='100%' display='flex' alignItems='center' justifyContent='space-between' p={2}>
                        <FormControlLabel control={<AntSwitch />} label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Demographic questions</Typography>} labelPlacement="end" />
                        <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#8C8C8C'>Please select</Typography>
                    </Box>
                </Box>
                <DynamicCheckboxGroup options={options} />
            </Box>
            
            {/** Link configuration */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '516.5px',
                height: 'auto',
                border: `1px solid ${grey[300]}`,
                borderRadius: '4px',
                mt: 2,
                ml: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '516.5px',
                    borderBottom: `1px solid ${grey[300]}`,
                }}>
                    <Box width='100%' display='flex' alignItems='center' justifyContent='space-between' p={2}>
                        <FormControlLabel control={<AntSwitch />} label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Link configuration</Typography>} labelPlacement="end" />
                        <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#8C8C8C'>Please select</Typography>
                    </Box>
                </Box>
                <DynamicCheckboxGroup options={linkConfigOptions} />
            </Box>
            
            {/** Limit number of participants */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '516.5px',
                height: 'auto',
                border: `1px solid ${grey[300]}`,
                borderRadius: '4px',
                mt: 2,
                ml: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '516.5px',
                    borderBottom: `1px solid ${grey[300]}`,
                }}>
                    <Box width='100%' display='flex' alignItems='center' justifyContent='space-between' p={2}>
                        <FormControlLabel control={<AntSwitch />} label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Limit number of participants</Typography>} labelPlacement="end" />
                        <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#8C8C8C'>Please select</Typography>
                    </Box>
                </Box>
                <ResponseCounter maxResponses={50} />
            </Box>
        </Box>
    )
}

interface DynamicCheckboxGroupProps {
    options: Option[];
    onChange?: (selectedOptions: string[]) => void;
}

const DynamicCheckboxGroup: React.FC<DynamicCheckboxGroupProps> = ({ options, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    // Maneja el cambio de los checkboxes
    const handleCheckboxChange = (value: string) => {
        const newSelectedOptions = selectedOptions.includes(value)
            ? selectedOptions.filter((option) => option !== value)
            : [...selectedOptions, value];

        setSelectedOptions(newSelectedOptions);
        if (onChange) {
            onChange(newSelectedOptions); // Llama al callback si está definido
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "center" }}>
            <FormGroup sx={{
                height: 'auto',
                width: '86%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                my: 2
            }}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        sx={{
                            width: '100%',
                            fontSize: "14px",
                            fontWeight: 400,
                            height: 'auto',
                            my: 0.4
                        }}
                        control={
                            <Checkbox
                                checked={selectedOptions.includes(option.value)}
                                onChange={() => handleCheckboxChange(option.value)}
                                sx={{
                                    p: 0,
                                    m: 0,
                                    mr: 1,
                                    fontSize: "14px",
                                    fontWeight: "400px",
                                    color: '#262626',
                                    lineHeight: '22px',
                                    "&.Mui-checked": {
                                        color: "blue",
                                    },
                                }}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </FormGroup>
        </Box>
    );
};

interface ResponseCounterProps {
    maxResponses: number; // Número máximo de respuestas
  }

const ResponseCounter: React.FC<ResponseCounterProps> = ({ maxResponses }) => {
    const [selectedValue, setSelectedValue] = useState<number>(50); // Valor inicial
  
    // Maneja el cambio en el select
    const handleChange = (event: SelectChangeEvent<number>) => {
      const value = event.target.value as number;
      setSelectedValue(value);
    };
  
    // Calcula las respuestas restantes
    const remainingResponses = maxResponses - selectedValue;
  
    return (
      <Box display="flex" flexDirection='column' alignItems="flex-start" gap={2} p={2} ml={1}>
        <Typography fontSize={14} fontWeight={400} color='#262626' lineHeight='22px'>Stop accepting responses after this number of participants.</Typography>
        <Box display='flex' alignItems='center' gap={2}>
            <Select
            value={selectedValue}
            onChange={handleChange}
            size="small"
            sx={{
                minWidth: 52,
                height: 32,
            }}
            >
            {[10, 20, 30, 40, 50].map((num) => (
                <MenuItem key={num} value={num}>
                {num}
                </MenuItem>
            ))}
            </Select>
            <Typography variant="body1">
            You will receive {remainingResponses} more responses.
            </Typography>
        </Box>
      </Box>
    );
  };
  