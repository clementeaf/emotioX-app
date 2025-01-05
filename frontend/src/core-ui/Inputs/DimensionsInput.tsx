import { Box, TextField, Typography } from "@mui/material";
import { DimensionsInputProps } from "../../types/types";

export function DimensionsInput({
    sectionTitle,
    inputsAttributes,
    onInputChange,
  }: DimensionsInputProps) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 2 }}>
            {sectionTitle}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            width: '100%',
            height: '100%',
          }}
        >
          {inputsAttributes.map(({ id, title, inputData }) => (
            <Box key={id} sx={{ flex: 1 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {title}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter value"
                value={inputData}
                onChange={(e) => onInputChange(id, e.target.value)}
                InputProps={{ style: { fontSize: 14 } }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }