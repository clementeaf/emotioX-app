import { Box, Typography, List, ListItem, Checkbox, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';
import { useResultsStore } from '../../../store/useResultStore';
import { findAndUploadFiles } from '../../../services/findAndUploadFiles';
import { ResearchSidebarProps } from '../../../types/types';
import { normalizeLabel, stageIcons, submitActions } from '../../../utils';

interface FileToUpload {
  id: number;
  file: File | null;
}

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
        throw new Error("Research ID not found in localStorage");
      }

      // 1. Obtener la configuración del stage
      const stageConfig = researchStagesConfig[frameworkType][stageType].find(
        (stage) => normalizeLabel(stage.label) === normalizeLabel(label)
      );

      if (!stageConfig?.getStore) {
        throw new Error(`No store configuration found for "${label}"`);
      }

      // 2. Obtener el store y validar su estructura
      const store = stageConfig.getStore();
      if (!store?.getFilesToUpload || typeof store.getFilesToUpload !== 'function') {
        throw new Error(`Invalid store configuration for "${label}"`);
      }

      // 3. Obtener archivos a subir
      const filesToUpload = store.getFilesToUpload();

      // 4. Subir archivos si existen
      if (filesToUpload.length > 0) {
        await findAndUploadFiles(
          filesToUpload.map((file: FileToUpload) => ({
            ...file,
            isMultiple: false
          })),
          (id, image) => store.updateUploadedImage(id, image),
          () => {}, // No necesitamos esto para ImplicitAssociation
          () => ({})
        );
      }

      // 5. Ejecutar acción de submit
      const submitAction = submitActions[normalizeLabel(label)];
      if (submitAction) {
        await submitAction(researchId);
      }

    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
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
            {stageType === 'Build' && (
              <Checkbox
                onChange={(event) => getStore && handleCheckboxChange(label, frameworkType, stageType, event.target.checked)}
                sx={{ mr: 1 }}
              />
            )}

            {/* Cambiar Typography para que no genere un <p> */}
            <Typography
              component="div" // Cambiar de <p> a <div>
              onClick={() => setSelectedSection(label)}
              sx={{
                color: 'black',
                cursor: 'pointer',
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              {label}

              {stageType === "Recruit" && stageIcons[label] && (
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  {stageIcons[label]}
                </Box>
              )}
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
