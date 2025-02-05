import { Box, Typography, List, ListItem, Checkbox, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';
import { useResultsStore } from '../../../store/useResultStore';
import { findAndUploadFiles } from '../../../services/findAndUploadFiles';
import { ResearchSidebarProps } from '../../../types/types';
import { normalizeLabel, submitActions } from '../../../utils';

export function ResearchSidebar({ frameworkType, stageType }: ResearchSidebarProps) {
  const { setStageIndex } = useSelectedResearchStore();
  const { setSelectedSection } = useResultsStore();
  const stages = researchStagesConfig[frameworkType][stageType];

  const handleCheckboxChange = async (
    label: string,
    frameworkType: "AIMFramework" | "BehaviouralResearch",
    stageType: "Build" | "Recruit" | "Result",
    checked?: boolean
  ) => {
    if (!checked) return;
  
    try {
      const researchId = localStorage.getItem("currentResearchId");
      if (!researchId) {
        console.error("❌ Research ID not found in localStorage");
        return;
      }
  
      const stageConfig = researchStagesConfig[frameworkType][stageType].find(
        (stage) => normalizeLabel(stage.label) === normalizeLabel(label)
      );
  
      if (!stageConfig || !stageConfig.getStore) {
        console.warn(`⚠️ No store found for label: "${label}"`);
        return;
      }
  
      const store = stageConfig.getStore();
  
      if (!store || typeof store !== "object" || typeof store.getFilesToUpload !== "function") {
        console.error(`❌ Error: store no es válido o no tiene getFilesToUpload() para "${label}".`, store);
        return;
      }
  
      const filesToUpload = store.getFilesToUpload();
      console.log(`📂 Files to upload for label "${label}":`, filesToUpload);
  
      if (filesToUpload.length > 0) {
        await findAndUploadFiles(
          filesToUpload,
          (id, image) => store.updateUploadedImage(id, image), // ✅ Para `singleImage`
          (id, image) => store.updateMultipleImageReference(id, image) // ✅ Para `multipleImages`
        );        
      }
  
      console.log(`🚀 Data to be sent for label "${label}":`, store);
  
      const submitAction = submitActions[normalizeLabel(label)];
      if (submitAction) {
        await submitAction(researchId);
      } else {
        console.warn(`⚠️ No associated action for label: "${label}"`);
      }
    } catch (error) {
      console.error(`❌ Error submitting data for label: "${label}"`, error);
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
              onChange={(event) => getStore && handleCheckboxChange(label, frameworkType, stageType, event.target.checked)}
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
