import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";

export function ClientSelector() {
    const [client, setClient] = useState('');
  
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
      setClient(event.target.value);
    };
  
    return (
      <FormControl sx={{ height: '32px' }}>
        <Select
          value={client}
          onChange={handleChange}
          displayEmpty
          sx={{
            width: '150px',
            height: '32px',
            fontWeight: 400,
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '22px',
            color: '#262626',
            border: '1px solid #E0E0E0',
            borderRadius: '4px',
            padding: '0 8px',
          }}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#262626'>Change client</Typography>;
            }
            return selected;
          }}
        >
          <MenuItem value="">
            <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#262626'>Change client</Typography>
          </MenuItem>
          <MenuItem value="Client 1">Client 1</MenuItem>
          <MenuItem value="Client 2">Client 2</MenuItem>
          <MenuItem value="Client 3">Client 3</MenuItem>
        </Select>
      </FormControl>
    );
  };