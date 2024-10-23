import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

interface UploadSectionProps {
    deviceFrame: string;
    setDeviceFrame: (value: string) => void;
    onUploadClick?: () => void; // Agregar esta línea
  }
  

export function UploadSection({ deviceFrame, setDeviceFrame }: UploadSectionProps) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Manejo de carga de archivos
  const handleUploadClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadedImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };
    fileInput.click();
  };

  // Eliminación de la imagen cargada
  const handleDeleteImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        width: '804px',
        borderRadius: 2,
        backgroundColor: '#F3F6FC',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2,
        ml: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        {/* Sección de carga */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="span" color="error" sx={{ mr: 0.5 }}>
              *
            </Typography>
            Upload{' '}
            <Typography component="span" color="textSecondary" sx={{ ml: 0.5 }}>
              (optional)
            </Typography>
            :
          </Typography>

        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        }}>
        {imagePreview ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
              <Box
                component="img"
                src={imagePreview}
                alt="Uploaded Preview"
                sx={{ width: 80, height: 80, borderRadius: 1, objectFit: 'cover', bgcolor: 'white' }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#252BE6',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={handleUploadClick}
              >
                {uploadedImage?.name}
              </Typography>
              <IconButton onClick={handleDeleteImage} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : (
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon sx={{ color: '#252BE6' }} />}
              onClick={handleUploadClick}
              sx={{
                textTransform: 'none',
                borderColor: '#D0D5DD',
                bgcolor: 'white'
              }}
            >
              <Typography color="black">Click to Upload</Typography>
            </Button>
          )}

          <Typography variant="caption" color="textSecondary">
            Recommended resolution is 1000*1000px with file size
          </Typography>
        </Box>
      </Box>

      {/* Selector de "Device Frame" */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Device Frame
        </Typography>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={deviceFrame}
            onChange={(e: SelectChangeEvent) => setDeviceFrame(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D0D5DD',
              },
            }}
          >
            <MenuItem value="No Frame">No Frame</MenuItem>
            <MenuItem value="iPhone 12">iPhone 12</MenuItem>
            <MenuItem value="Samsung S21">Samsung S21</MenuItem>
            <MenuItem value="Desktop">Desktop</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}
