import { Box, Checkbox, FormControl, FormControlLabel, MenuItem, ToggleButton, Select, ToggleButtonGroup, Typography } from '@mui/material'
import FileUpload from '../../../../core-ui/FileUpload'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import { TechniqueDescription } from '../../../../core-ui/Forms/TechniqueDescription'

export default function EyeTrackingView() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      height: 'auto',
      gap: 3,
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          width: '390px',
          bgcolor: 'white',
          border: `1px solid ${grey[300]}`,
          borderRadius: 1,
        }}>
          <Box p={2}>
            <Typography fontSize={14} fontWeight={700} color='#262626'>Eye Tracking Stimulation</Typography>
            <Typography fontSize={14} fontWeight={400} color='#8C8C8C'>Please, upload the image or video to be tested with eye tracking. The duration</Typography>
            <FileUpload title={''} accept={{}} maxSize={0} onUpload={function (): void {
              throw new Error('Function not implemented.')
            }} uploadedFiles={[]} removeFile={function (): void {
              throw new Error('Function not implemented.')
            }} />
          </Box>
        </Box>
        <TaskConfiguration />
      </Box>
      <TechniqueDescription />
    </Box>
  )
}

const TaskConfiguration: React.FC = () => {
  const [shelfCount, setShelfCount] = useState(2);
  const [itemsPerShelf, setItemsPerShelf] = useState(5);
  const [displayTime, setDisplayTime] = useState<string>('10 secs');

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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, m: 0, p: 0 }}>
          <FormControlLabel control={<Checkbox defaultChecked sx={{ height: 16 }} />} label={<Typography fontSize={14}>This is a Shelf Task</Typography>} />
          <FormControlLabel control={<Checkbox defaultChecked sx={{ height: 16 }} />} label={<Typography fontSize={14}>Resize image to fit screen</Typography>} />
          <FormControlLabel control={<Checkbox sx={{ height: 16 }} />} label={<Typography fontSize={14}>Eye tracking Device (Soon)</Typography>} />
          <FormControlLabel control={<Checkbox defaultChecked sx={{ height: 16 }} />} label={<Typography fontSize={14}>Eye tracking (Webcam based)</Typography>} />
          <FormControlLabel control={<Checkbox defaultChecked sx={{ height: 16 }} />} label={<Typography fontSize={14}>Click measurement</Typography>} />
          <FormControlLabel control={<Checkbox sx={{ height: 16 }} />} label={<Typography fontSize={14}>Finish by pressing any key or mouse click</Typography>} />
          <FormControlLabel control={<Checkbox sx={{ height: 16 }} />} label={<Typography fontSize={14}>Hold device in vertical position while testing</Typography>} />
          <FormControlLabel control={<Checkbox sx={{ height: 16 }} />} label={<Typography fontSize={14}>Hold device in horizontal position while testing</Typography>} />
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
      <Box sx={{ p: 2, bgcolor: '#e9f0fc' }}>
        <Typography fontWeight={700} sx={{ mb: 1, color: '#262626' }}>
          Shelf configuration
        </Typography>
        <Box sx={{ width: '100%', height: 150, bgcolor: '#E0E0E0', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
          <Box sx={{ width: 60, height: 60, bgcolor: '#B0BEC5', borderRadius: 1 }} />
        </Box>

        {/* Select controls */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', mt: 2, gap: 1}}>
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
    </Box>
  );
};

