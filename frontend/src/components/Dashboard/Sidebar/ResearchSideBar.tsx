import { Box, Typography, List, ListItem, Checkbox, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';
import { useResultsStore } from '../../../store/useResultStore';
import { findAndUploadFiles } from '../../../services/findAndUploadFiles';
import { ResearchSidebarProps } from '../../../types/types';
import { normalizeLabel, stageIcons, submitActions } from '../../../utils';

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

      // ✅ Obtener archivos a subir
      const filesToUpload = store.getFilesToUpload();
      console.log(`📂 Archivos a subir para "${label}":`, filesToUpload);

      // ✅ Si hay archivos, subirlos a S3 y actualizar el store
      if (filesToUpload.length > 0) {
        await findAndUploadFiles(
          filesToUpload,
          (id, image) => {
            if ("updateUploadedImage" in store) {
              store.updateUploadedImage(id, image);
            } else {
              console.warn(`⚠️ updateUploadedImage no está definido en el store para "${label}".`);
            }
          },
          (id, image) => {
            if ("updateMultipleImageReference" in store) {
              store.updateMultipleImageReference(id, image);
            } else if ("addUploadedFiles" in store) {
              // ✅ Caso especial para `EyeTrackingStore`
              store.addUploadedFiles([{ fileName: image.fileName, fileSize: image.size }]);
            } else {
              console.warn(`⚠️ No se encontró un método para actualizar imágenes en "${label}".`);
            }
          },
          store.getState // ✅ Obtener el estado dinámicamente sin hardcodear stores
        );
      } else {
        console.log(`✅ No hay archivos para subir en "${label}".`);
      }

      // ✅ Enviar datos al backend si hay una acción definida
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
