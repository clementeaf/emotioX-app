import { Box, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { AntSwitch } from '../Switch'
import { RecruitmentLinkState } from '../../store/useRecruitmentLinkStore';

type Option = {
    label: string;
    value: string;
};

const demographicOptions: Option[] = [
    { label: "Age", value: "age" },
    { label: "Country", value: "country" },
    { label: "Gender", value: "gender" },
    { label: "Education level", value: "education_level" },
    { label: "Annual household income", value: "annual_household_income" },
    { label: "Employment status", value: "employment_status" },
    { label: "Daily hours online", value: "daily_hours_online" },
    { label: "Technical proficiency", value: "technical_proficiency" },
];

const linkConfigOptions: Option[] = [
    { label: "Allow respondents to take survey via mobile devices", value: "allow_mobile" },
    { label: "Track respondents location", value: "track_location" },
    { label: "Allow multiple responses in one session", value: "multiple_responses" },
];

interface RecruitmentLinkProps {
    demographicQuestionsRequired: boolean;
    demographicQuestions: string[];
    linkConfiguration: string[];
    participantLimit: number;
    setDemographicQuestionsRequired: (value: boolean) => void;
    toggleDemographicQuestion: (key: keyof RecruitmentLinkState["demographicQuestions"]) => void; // Cambiado
    setLinkConfiguration: (key: keyof RecruitmentLinkState["linkConfiguration"], value: boolean) => void; // Cambiado
    setParticipantLimit: (value: number) => void;
}

export default function RecruitmentLink({
    demographicQuestionsRequired,
    demographicQuestions,
    linkConfiguration,
    participantLimit,
    setDemographicQuestionsRequired,
    toggleDemographicQuestion,
    setLinkConfiguration,
    setParticipantLimit
}: RecruitmentLinkProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
                maxWidth: '556.5px',
                bgcolor: 'white',
                borderRadius: '4px',
                border: `1px solid ${grey[300]}`,
                p: 2,
            }}
        >
            {/* Header */}
            <Typography fontWeight={600} fontSize={16} color="#212121">
                Recruitment link
            </Typography>

            {/* Demographic Questions */}
            <SectionWrapper title="Demographic questions">
                <FormControlLabel
                    control={
                        <AntSwitch
                            checked={demographicQuestionsRequired}
                            onChange={() => setDemographicQuestionsRequired(!demographicQuestionsRequired)}
                        />
                    }
                    label={<Typography fontSize={14} color="#8C8C8C">Demographic questions</Typography>}
                    labelPlacement="end"
                />
                {demographicQuestionsRequired && (
                    <DynamicCheckboxGroup
                        options={demographicOptions}
                        selectedOptions={demographicQuestions}
                        onChange={(selectedOptions) => {
                            // Convertir cada clave seleccionada a keyof RecruitmentLinkState["demographicQuestions"]
                            const addedKeys = selectedOptions.filter((key) => !demographicQuestions.includes(key)) as Array<
                                keyof RecruitmentLinkState["demographicQuestions"]
                            >;

                            addedKeys.forEach((key) => toggleDemographicQuestion(key)); // Ahora compatible

                            const removedKeys = demographicQuestions.filter((key) => !selectedOptions.includes(key)) as Array<
                                keyof RecruitmentLinkState["demographicQuestions"]
                            >;

                            removedKeys.forEach((key) => toggleDemographicQuestion(key)); // Ahora compatible
                        }}
                    />

                )}
            </SectionWrapper>

            {/* Link Configuration */}
            <SectionWrapper title="Link configuration">
                <DynamicCheckboxGroup
                    options={linkConfigOptions}
                    selectedOptions={linkConfiguration}
                    onChange={(selectedOptions) => {
                        linkConfigOptions.forEach((option) => {
                            // Convertir option.value a keyof RecruitmentLinkState["linkConfiguration"]
                            const key = option.value as keyof RecruitmentLinkState["linkConfiguration"];
                            const newValue = selectedOptions.includes(option.value);

                            if (newValue !== linkConfiguration.includes(option.value)) {
                                setLinkConfiguration(key, newValue); // Ahora compatible
                            }
                        });
                    }}
                />

            </SectionWrapper>

            {/* Limit Number of Participants */}
            <SectionWrapper title="Limit number of participants">
                <ResponseCounter maxResponses={50} selectedValue={participantLimit} onChange={setParticipantLimit} />
            </SectionWrapper>
        </Box>
    );
}


/** Componente de sección con estilo uniforme */
function SectionWrapper({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                border: `1px solid ${grey[300]}`,
                borderRadius: '4px',
                mt: 2,
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 2,
            }}>
                <Typography fontWeight={400} fontSize={14} color="#8C8C8C" pb={1}>
                    {title}
                </Typography>
                {children}
            </Box>
        </Box>
    );
}

interface DynamicCheckboxGroupProps {
    options: Option[];
    selectedOptions: string[];
    onChange: (selectedOptions: string[]) => void;
}

export const DynamicCheckboxGroup: React.FC<DynamicCheckboxGroupProps> = ({ options, selectedOptions, onChange }) => {
    const handleCheckboxChange = (value: string) => {
        const newSelectedOptions = selectedOptions.includes(value)
            ? selectedOptions.filter((option) => option !== value)
            : [...selectedOptions, value];

        onChange(newSelectedOptions);
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
    maxResponses: number;
    selectedValue: number;
    onChange: (value: number) => void;
}

export const ResponseCounter: React.FC<ResponseCounterProps> = ({ maxResponses, selectedValue, onChange }) => {
    const handleChange = (event: SelectChangeEvent<number>) => {
        onChange(Number(event.target.value));
    };

    const remainingResponses = maxResponses - selectedValue;

    return (
        <Box display="flex" flexDirection='column' alignItems="flex-start" gap={2} p={2} ml={1}>
            <Typography fontSize={14} fontWeight={400} color='#262626' lineHeight='22px'>
                Stop accepting responses after this number of participants.
            </Typography>
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