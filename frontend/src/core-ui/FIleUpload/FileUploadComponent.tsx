import { useState } from 'react';
import { Box, Typography, TextField, Paper, Link } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@mui/icons-material/CloudUploadOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export const FileUploadComponent = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0].name);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5 MB
  });

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        padding: 2,
        width: 350,
        bgcolor: 'white',
      }}
    >
      {/* Título */}
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
        Target 1
      </Typography>

      {/* Subtítulo */}
      <Typography variant="body2" sx={{ mb: 2, color: '#6c757d' }}>
        You can use an image or a name for this.
      </Typography>

      {/* Campo de texto para el nombre del objeto */}
      <Typography variant="body2" sx={{ mb: 1 }}>
        Name of the object
      </Typography>
      <TextField
        placeholder="Text the name here"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />

      {/* Zona de arrastrar y soltar */}
      <Paper
        {...getRootProps()}
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 150,
          borderRadius: 2,
          border: isDragActive ? '2px dashed #4A3AFF' : '1px solid #e0e0e0',
          backgroundColor: isDragActive ? '#f4f4ff' : '#fafafa',
          cursor: 'pointer',
          mb: 2,
          padding: 2,
          textAlign: 'center',
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 40, color: '#4A3AFF', mb: 1 }} />
        <Typography variant="body2" sx={{ color: '#6c757d', fontWeight: 500 }}>
          Click or drag file to this area to upload
        </Typography>
        <Typography variant="body2" sx={{ color: '#6c757d', fontSize: 12 }}>
          Support for a single or bulk upload.<br />
          JPG, JPEG, PNG or GIF supported<br />
          Max image dimensions are 16000x16000.<br />
          Max file size is 5MB
        </Typography>
      </Paper>

      {/* Archivo cargado */}
      {uploadedFile && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AttachFileIcon fontSize="small" sx={{ color: '#6c757d', mr: 0.5 }} />
          <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
            {uploadedFile}
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadComponent;
