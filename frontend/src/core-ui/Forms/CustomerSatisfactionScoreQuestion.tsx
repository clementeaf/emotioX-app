import { Box, FormControl, FormControlLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { AntSwitch } from "../Switch";
import { useState } from "react";

export function CustomerSatisfactionScoreQuestion({ title }: { title: string }) {
    const [metric, setMetric] = useState('CSAT');
    const [ratingType, setRatingType] = useState('Stars');
  
    const handleMetricChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setMetric(event.target.value as string);
    };
  
    const handleRatingTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setRatingType(event.target.value as string);
    };
  
    return (
      <Box display="flex" flexDirection='row' alignItems="center" gap={2} width={800} ml={2}>
        <Typography sx={{ opacity: 0.45, fontWeight: 400, fontSize: 12, lineHeight: '22px', width: 225, height: 44 }}>
          {title}
        </Typography>
  
        <TextField
          placeholder="Company or service's name"
          variant="outlined"
          size="small"
          sx={{ width: '200px' }}
        />
  
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
  
        <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
          <Select
            value={ratingType}
            onChange={handleRatingTypeChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
          >
            <MenuItem value="Stars">Stars</MenuItem>
            <MenuItem value="Emoji">Emoji</MenuItem>
            <MenuItem value="Numeric">Numeric</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<AntSwitch defaultChecked={false} onClick={() => { }} />}
          label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Required</Typography>}
          labelPlacement="start"
        />
      </Box>
    );
  };