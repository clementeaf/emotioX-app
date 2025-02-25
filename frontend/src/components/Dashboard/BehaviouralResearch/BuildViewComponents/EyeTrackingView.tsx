import { Box, Checkbox, FormControl, FormControlLabel, MenuItem, ToggleButton, Select, ToggleButtonGroup, Typography, TextField } from '@mui/material'
import FileUpload from '../../../../core-ui/FileUpload'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import { TechniqueDescription } from '../../../../core-ui/Forms/TechniqueDescription'
import InvestigationTitleRequirement from '../../../../core-ui/Forms/InvestigationTitleRequirement'
import { useEyeTrackingStore } from '../../../../store/useEyeTrackingStore'
import { TaskConfigurationProps } from '../../../../types/types'

export default function EyeTrackingView() {
  const {
    required,
    setRequired,
    taskInstruction,
    setTaskInstruction,
    uploadedImages,
    addTempImage,
    removeImage,
    randomize,
    setRandomize,
    isShelfTask,
    setIsShelfTask,
    resizeImage,
    setResizeImage,
    useEyeTrackingDevice,
    setUseEyeTrackingDevice,
    useWebcamBasedTracking,
    setUseWebcamBasedTracking,
    enableClickMeasurement,
    setEnableClickMeasurement,
    finishOnAnyKey,
    setFinishOnAnyKey,
    holdDeviceVertical,
    setHoldDeviceVertical,
    holdDeviceHorizontal,
    setHoldDeviceHorizontal,
    displayTime, 
    setDisplayTime,
  } = useEyeTrackingStore();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRandomize(event.target.checked);
  };

  // Convertir uploadedImages al formato que espera FileUpload
  const formattedUploadedFiles = uploadedImages.map(img => ({
    fileName: img.fileName,
    fileSize: img.fileSize,
    file: img.tempFile || null
  }));

  const handleUpload = (files: File[]) => {
    files.forEach(file => {
      addTempImage(file);
    });
  };

  const handleRemoveFile = (fileName: string) => {
    removeImage(fileName);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      height: 'auto',
      gap: 3,
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'white', borderRadius: 2, pb: 2 }}>
        <InvestigationTitleRequirement
          title='6.0.- Cognitive task'
          required={required}
          onToggleRequired={() => setRequired(!required)}
        />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          pl: 3
        }}>
          <Typography fontSize={14} fontWeight={400}>Eye Tracking is a biometric method to map humans interactions and map the movement of eyes.</Typography>
          <Typography color='gray' fontSize={14} fontWeight={400}>A response will be qualified as "skipped by logic" if the respondent can't answer/proceed.</Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '800px',
            marginTop: 3
          }}>
            <Typography mb={1}>Instruction for the task <span>_italic_ **bold** - bullet list 1. ordered list</span></Typography>
            <TextField
              placeholder="Where would you click to..."
              value={taskInstruction}
              onChange={(e) => setTaskInstruction(e.target.value)}
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "8px",
                  borderColor: grey[300],
                  fontSize: 14,
                  color: grey[600],
                },
              }}
              sx={{
                maxWidth: "100%",
                bgcolor: "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: grey[300],
                  },
                  "&:hover fieldset": {
                    borderColor: grey[400],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6200EE",
                  },
                },
              }}
            />

          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
            width: '390px',
            bgcolor: 'white',
            border: `1px solid ${grey[300]}`,
          }}>
            <Box p={2}>
              <Typography fontSize={14} fontWeight={700} color='#262626'>Eye Tracking Stimulation</Typography>
              <Typography fontSize={14} fontWeight={400} color='#8C8C8C'>Please, upload the image or video to be tested with eye tracking. The duration</Typography>
              <FileUpload
                accept={{ "image/*": [".jpg", ".jpeg", ".png", ".gif"], "video/*": [".mp4"] }}
                maxSize={30 * 1024 * 1024}
                onUpload={handleUpload}
                uploadedFiles={formattedUploadedFiles}
                removeFile={handleRemoveFile}
              />
            </Box>
            <Box sx={{
              ml: 2,
            }}>
              <Typography>For Shelf only:</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={randomize}
                    onChange={handleCheckboxChange}
                    sx={{
                      color: '#252BE6',
                      '&.Mui-checked': {
                        color: '#252BE6',
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      color: '#262626',
                    }}
                  >
                    Randomize options (images)
                  </Typography>
                }
              />
            </Box>
          </Box>
          <TaskConfiguration
            showShelfConfiguration={randomize}
            isShelfTask={isShelfTask}
            setIsShelfTask={setIsShelfTask}
            resizeImage={resizeImage}
            setResizeImage={setResizeImage}
            useEyeTrackingDevice={useEyeTrackingDevice}
            setUseEyeTrackingDevice={setUseEyeTrackingDevice}
            useWebcamBasedTracking={useWebcamBasedTracking}
            setUseWebcamBasedTracking={setUseWebcamBasedTracking}
            enableClickMeasurement={enableClickMeasurement}
            setEnableClickMeasurement={setEnableClickMeasurement}
            finishOnAnyKey={finishOnAnyKey}
            setFinishOnAnyKey={setFinishOnAnyKey}
            holdDeviceVertical={holdDeviceVertical}
            setHoldDeviceVertical={setHoldDeviceVertical}
            holdDeviceHorizontal={holdDeviceHorizontal}
            setHoldDeviceHorizontal={setHoldDeviceHorizontal}
            displayTime={displayTime}
            setDisplayTime={setDisplayTime}
          />
        </Box>
      </Box>
      <TechniqueDescription />
    </Box>
  )
}

export const TaskConfiguration: React.FC<TaskConfigurationProps> = ({
  showShelfConfiguration,
  isShelfTask,
  setIsShelfTask,
  resizeImage,
  setResizeImage,
  useEyeTrackingDevice,
  setUseEyeTrackingDevice,
  useWebcamBasedTracking,
  setUseWebcamBasedTracking,
  enableClickMeasurement,
  setEnableClickMeasurement,
  finishOnAnyKey,
  setFinishOnAnyKey,
  holdDeviceVertical,
  setHoldDeviceVertical,
  holdDeviceHorizontal,
  setHoldDeviceHorizontal,
  displayTime,
  setDisplayTime
}) => {
  const [shelfCount, setShelfCount] = useState(2);
  const [itemsPerShelf, setItemsPerShelf] = useState(5);

  const handleDisplayTimeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newDisplayTime: string | null
  ) => {
    if (newDisplayTime !== null) {
      setDisplayTime(newDisplayTime);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, border: '1px solid #E0E0E0', borderRadius: 1, bgcolor: 'white', justifyContent: 'space-between' }}>
      <Box m={3}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          Task configuration
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Please select
        </Typography>

        {/* Checkbox options */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, m: 0, p: 0 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isShelfTask}
                onChange={(e) => setIsShelfTask(e.target.checked)}
                sx={{ height: 16 }}
              />
            }
            label={<Typography fontSize={14}>This is a Shelf Task</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={resizeImage}
                onChange={(e) => setResizeImage(e.target.checked)}
                sx={{ height: 16 }}
              />
            }
            label={<Typography fontSize={14}>Resize image to fit screen</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={useEyeTrackingDevice}
                onChange={(e) => setUseEyeTrackingDevice(e.target.checked)}
                sx={{ height: 16 }}
              />
            }
            label={<Typography fontSize={14}>Eye tracking Device (Soon)</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={useWebcamBasedTracking}
                onChange={(e) => setUseWebcamBasedTracking(e.target.checked)}
                sx={{ height: 16 }}
              />
            }
            label={<Typography fontSize={14}>Eye tracking (Webcam based)</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={enableClickMeasurement}
                onChange={(e) => setEnableClickMeasurement(e.target.checked)}
                sx={{ height: 16 }}
              />
            }
            label={<Typography fontSize={14}>Click measurement</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={finishOnAnyKey}
                onChange={(e) => setFinishOnAnyKey(e.target.checked)}
                sx={{ height: 16 }}
              />
            }
            label={<Typography fontSize={14}>Finish by pressing any key or mouse click</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={holdDeviceVertical}
                onChange={(e) => setHoldDeviceVertical(e.target.checked)}
                sx={{ height: 16 }}
              />
            }
            label={<Typography fontSize={14}>Hold device in vertical position while testing</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={holdDeviceHorizontal}
                onChange={(e) => setHoldDeviceHorizontal(e.target.checked)}
                sx={{ height: 16 }}
              />
            }
            label={<Typography fontSize={14}>Hold device in horizontal position while testing</Typography>}
          />
        </Box>


        {/* Priming display time options */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mt: 2,
        }}>
          <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
            Priming display time:
          </Typography>
          <ToggleButtonGroup
            value={displayTime}
            exclusive
            onChange={handleDisplayTimeChange}
            sx={{ height: 30, borderRadius: 1 }}
          >
            <ToggleButton value="5 secs"><Typography sx={{ fontSize: 12, width: 37, fontWeight: 400, textTransform: 'lowercase' }}>5 secs</Typography></ToggleButton>
            <ToggleButton value="10 secs"><Typography sx={{ fontSize: 12, width: 45, fontWeight: 400, textTransform: 'lowercase' }}>10 secs</Typography></ToggleButton>
            <ToggleButton value="15 secs"><Typography sx={{ fontSize: 12, width: 45, fontWeight: 400, textTransform: 'lowercase' }}>15 secs</Typography></ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Shelf configuration section */}
      {showShelfConfiguration && (
        <Box sx={{ p: 2, bgcolor: '#e9f0fc' }}>
          <Typography fontWeight={700} sx={{ mb: 1, color: '#262626' }}>
            Shelf configuration
          </Typography>
          <Box sx={{ width: '100%', height: 150, bgcolor: '#E0E0E0', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
            <Box sx={{ width: 60, height: 60, bgcolor: '#B0BEC5', borderRadius: 1 }} />
          </Box>

          {/* Select controls */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', mt: 2, gap: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 1, width: '100%' }}>
              <Typography color='#262626' fontWeight={400} fontSize={14} width='100%' lineHeight='22px'>Number of Shelfs</Typography>
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <Select value={shelfCount} onChange={(e) => setShelfCount(e.target.value as number)}>
                  {[1, 2, 3, 4].map((count) => (
                    <MenuItem key={count} value={count}>{count}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 1, width: '100%' }}>
              <Typography color='#262626' fontWeight={400} fontSize={14} lineHeight='22px'>Items per Shelf</Typography>
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <Select value={itemsPerShelf} onChange={(e) => setItemsPerShelf(e.target.value as number)}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                    <MenuItem key={count} value={count}>{count}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

