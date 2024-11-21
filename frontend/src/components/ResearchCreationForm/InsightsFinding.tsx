import { Box, Typography, List, ListItem, IconButton, Stack } from '@mui/material';
import { FileRejection, useDropzone } from 'react-dropzone';
import { grey } from '@mui/material/colors';
import blueInbox from '../../assets/researchForm3/blueIn.png';
import DeleteOutlined from '../../assets/researchForm3/DeleteOutlined.png';
import { useResearchStore } from '../../store/useResearchStore';
import { useCallback } from 'react';

export default function InsightsFinding({ title }: { title: string }) {
  const { addUploadedFiles, uploadedFiles, removeUploadedFile } = useResearchStore();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      console.error('Rejected files:', rejectedFiles.map((file) => file.file.name));
      alert('Some files were rejected. Please check their format and size.');
    }

    addUploadedFiles(acceptedFiles); // Agregar archivos válidos al estado global
  }, [addUploadedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/mp4': ['.mp4'],
      'text/plain': ['.txt'],
      'application/vnd.ms-excel': ['.csv'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxSize: 5 * 1024 * 1024, // 5 MB
  });

  console.log('Uploaded Files:', uploadedFiles); // Depuración

  return (
    <Box width="395px">
      <Typography fontWeight={700} fontSize="20px" lineHeight="22px" color="#565656" alignSelf="flex-start">
        {title || 'Title'}
      </Typography>
      <Typography fontWeight={400} fontSize="14px" lineHeight="22px" color="#8c8c8c" mt={2} alignSelf="flex-start">
        Please, upload the text for this sentiment analysis.
      </Typography>

      <Box
        {...getRootProps()}
        sx={{
          border: `1px solid ${grey[300]}`,
          maxWidth: '395px',
          width: '100%',
          height: '238px',
          mt: 2,
          textAlign: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? grey[100] : 'transparent',
        }}
      >
        <input {...getInputProps()} />
        <img src={blueInbox} alt="Inbox icon" style={{ marginTop: '15px', marginBottom: '15px' }} />
        <Typography fontWeight={400} fontSize="16px" lineHeight="24px" textAlign="center">
          {isDragActive ? 'Drop the files here...' : 'Click or drag file to this area to upload'}
        </Typography>
        <Typography fontWeight={400} fontSize="14px" lineHeight="22px" textAlign="center" color="#8c8c8c" marginTop={1}>
          WORD, TXT or CSV supported.
        </Typography>
        <Typography fontWeight={400} fontSize="14px" lineHeight="22px" textAlign="center" color="#8c8c8c">
          Max file size is 5MB.
        </Typography>
      </Box>

      {uploadedFiles.length > 0 && (
        <List sx={{ width: '100%', maxWidth: '395px', bgcolor: 'background.paper' }}>
          {uploadedFiles.map((file) => (
            <ListItem
              key={file.name}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography>{file.name} ({file.type})</Typography>
              </Stack>
              <IconButton edge="end" onClick={() => removeUploadedFile(file.name)}>
                <img src={DeleteOutlined} alt="Delete Icon" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
