import { Box, MenuItem, Select, SelectChangeEvent, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ValueLabelComponent } from "../../../core-ui/ValueLabelComponent";

export function Setter({title, description}: {title: string, description: string}) {
    const [blurValue, setBlurValue] = useState(10);
  
    // Manejador para cambiar el valor del slider
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
      setBlurValue(newValue as number);
    };
  
    // Manejador para cambiar el valor a través del input
    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setBlurValue(event.target.value as number);
    };
  
    return (
      <Stack spacing={1} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <Stack sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}>
            <Typography fontWeight={600} fontSize="16px">
              {title}
            </Typography>
            <Typography color="textSecondary" fontSize="14px">
              {description}
            </Typography>
          </Stack>
          <Select
            value={blurValue}
            onChange={(event: SelectChangeEvent<number>) => handleSelectChange(event as React.ChangeEvent<{ value: unknown }>)}
            sx={{
              width: 70,
              height: 44,
              border: '1px solid #D3D3D3',
              textAlign: 'center',
              '.MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0px 8px',
              },
            }}
          >
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Box display="flex" alignItems="center" width='365px'>
        <Slider
            value={blurValue}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={10}
            max={100}
            step={10}
            slots={{ valueLabel: ValueLabelComponent }}
            valueLabelDisplay="auto"
            sx={{
              flexGrow: 1,
              marginRight: 2,
              '& .MuiSlider-thumb': {
                width: '18px',
                height: '18px',
                backgroundColor: 'white',
                border: '2px solid #1976d2',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#1976d2',
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#D3D3D3',
              },
            }}
          />
        </Box>
      </Stack>
    );
  }