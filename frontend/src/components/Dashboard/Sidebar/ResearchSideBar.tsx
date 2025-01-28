import { Box, Typography, List, ListItem, Checkbox, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';
import { useResultsStore } from '../../../store/useResultStore';
import { submitEyeTrackingData, submitImplicitAssociationData, submitScreenerData, submitThankYouScreenData, submitWelcomeScreenData } from '../../../services/screenerModulesApi';

type StageType = 'Build' | 'Recruit' | 'Result';

type ResearchSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
  stageType: StageType;
};

const normalizeLabel = (label: string): string => label.trim().toLowerCase();

const submitActions: Record<string, (researchId: string) => Promise<void>> = {
  [normalizeLabel("Screener")]: submitScreenerData,
  [normalizeLabel("Welcome Screen")]: submitWelcomeScreenData,
  [normalizeLabel("Thank You Screen")]: submitThankYouScreenData,
  [normalizeLabel("Eye Tracking")]: submitEyeTrackingData,
  [normalizeLabel("Implicit Association")]: submitImplicitAssociationData,
};

export function ResearchSidebar({ frameworkType, stageType }: ResearchSidebarProps) {
  const { setStageIndex } = useSelectedResearchStore();
  const { setSelectedSection } = useResultsStore();
  const stages = researchStagesConfig[frameworkType][stageType];

  const handleCheckboxChange = async (
    label: string,
    getStore?: () => any,
    checked?: boolean
  ) => {

    if (!checked) {
      console.log("Checkbox is unchecked, skipping submission.");
      return;
    }

    try {
      const researchId = localStorage.getItem("currentResearchId");
      if (!researchId) {
        console.error("Research ID not found in localStorage");
        return;
      }

      if (!getStore) {
        console.warn(`getStore not defined for label: ${label}`);
        return;
      }

      const normalizedLabel = normalizeLabel(label);
      const submitAction = submitActions[normalizedLabel];

      if (submitAction) {
        await submitAction(researchId);
      } else {
        console.warn(`No associated action for label: ${label}`);
      }
    } catch (error) {
      console.error(`Error submitting data for label: ${label}`, error);
    }
  };

  return (
    <Box sx={{ width: '250px' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 2, mt: 3, ml: 2 }}>
        Research Stages
      </Typography>

      <List sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', ml: 1 }}>
        {stages.map(({ label, getStore }, index) => (
          <ListItem
            key={label}
            onClick={() => setStageIndex(index)}
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
              onChange={(event) => handleCheckboxChange(label, getStore, event.target.checked)}
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
        <Box p={2}>
          <Button variant="contained" color="primary" fullWidth>Save Modules</Button>
        </Box>
      </List>
    </Box>
  );
}
