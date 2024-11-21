import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";

export function PredictionModel({title, description}: {title: string, description: string}) {
    const [blurValue, setBlurValue] = useState('Simple');
  
    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setBlurValue(event.target.value as string);
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
            onChange={(event) => handleSelectChange(event as React.ChangeEvent<{ value: unknown }>)}
            sx={{
              width: 'auto',
              p: 1,
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
            {['Simple'].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
    );
  }