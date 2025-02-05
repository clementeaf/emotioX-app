import { Box, FormControlLabel, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AntSwitch } from "../../../../core-ui/Switch";
import { DynamicCheckboxGroup, ResponseCounter } from "../../../../core-ui/Forms/RecruitmentLink";

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

export function RecruitmentLink() {
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