import { Box } from '@mui/material';
import { RecruitmentConfiguration } from '../../../../core-ui/Forms/RecruitmentConfiguration';
import RecruitmentLink from '../../../../core-ui/Forms/RecruitmentLink';
import { CircularProgressCard } from '../../../../core-ui/Cards/CircularProgressCard';
import { useRecruitmentLinkStore } from '../../../../store/useRecruitmentLinkStore';

export default function RecruitEyeTrackingView() {
    const {
        demographicQuestionsRequired,
        demographicQuestions,
        linkConfiguration,
        participantLimit,
        setDemographicQuestionsRequired,
        toggleDemographicQuestion,
        setLinkConfiguration,
        setParticipantLimit,
    } = useRecruitmentLinkStore();

    // Convertir demographicQuestions a un array de strings
    const demographicQuestionsArray = (Object.keys(demographicQuestions) as (keyof typeof demographicQuestions)[]).filter(
        (key) => demographicQuestions[key]
    );

    // Convertir linkConfiguration a un array de strings
    const linkConfigurationArray = (Object.keys(linkConfiguration) as (keyof typeof linkConfiguration)[]).filter(
        (key) => linkConfiguration[key]
    );

    return (
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    maxWidth: 1135,
                    height: '813px',
                    gap: 3,
                    alignItems: 'flex-start',
                }}
            >
                <RecruitmentLink
                    demographicQuestionsRequired={demographicQuestionsRequired}
                    demographicQuestions={demographicQuestionsArray}
                    linkConfiguration={linkConfigurationArray}
                    participantLimit={participantLimit}
                    setDemographicQuestionsRequired={setDemographicQuestionsRequired}
                    toggleDemographicQuestion={toggleDemographicQuestion}
                    setLinkConfiguration={(key, value) => setLinkConfiguration(key, value)}
                    setParticipantLimit={setParticipantLimit}
                />
                <RecruitmentConfiguration />
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 2
            }}>
                {[...Array(3)].map((_, index) => (
                <CircularProgressCard key={index} title={''} status={''} totalIDs={0} percentage={0} />
            ))}
            </Box>
        </Box>
    );
}

