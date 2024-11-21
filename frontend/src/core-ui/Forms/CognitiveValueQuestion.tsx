import { Box, FormControl, FormControlLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { AntSwitch } from "../Switch";

export function CognitiveValueQuestion({ title }: { title: string }) {
    const [metric, setMetric] = useState('CSAT');
  
    const handleMetricChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setMetric(event.target.value as string);
    };
  
    return (
      <Box display="flex" flexDirection='row' justifyContent='space-between' alignItems="center" gap={2} width={800} ml={2}>
        <TextField
          placeholder={title}
          variant="outlined"
          size="small"
          sx={{ width: '200px' }}
        />
  
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
            <Select
              value={metric}
              onChange={handleMetricChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
            >
              <MenuItem value="CSAT">CSAT</MenuItem>
              <MenuItem value="NPS">NPS</MenuItem>
              <MenuItem value="CES">CES</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<AntSwitch defaultChecked={false} onClick={() => { }} />}
            label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Required</Typography>}
            labelPlacement="start"
          />
        </Box>
      </Box>
    );
  };