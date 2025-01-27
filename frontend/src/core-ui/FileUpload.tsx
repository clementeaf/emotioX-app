import { Box, Typography, List, ListItem, IconButton, Stack } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { grey } from '@mui/material/colors';
import inbox from '../assets/researchForm3/Inbox.png';
import PaperClip from '../assets/researchForm3/PaperClip.png';
import DeleteOutlined from '../assets/researchForm3/DeleteOutlined.png';
import { UploadedFile } from '../store/useEyeTrackingStore';

interface FileUploadProps {
    accept: { [key: string]: string[] };
    maxSize: number;
    onUpload: (files: File[]) => void;
    uploadedFiles: UploadedFile[];
    removeFile: (fileName: string) => void;
}

export default function FileUpload({ accept, maxSize, onUpload, uploadedFiles, removeFile }: FileUploadProps) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onUpload,
        accept,
        maxSize,
    });

    return (
        <Box width='100%'>
            <Box
                {...getRootProps()}
                sx={{
                    border: `1px solid ${grey[300]}`,
                    maxWidth: '395px',
                    width: '100%',
                    height: '100%',
                    mt: 2,
                    pb: 2,
                    textAlign: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: grey[100],
                }}
            >
                <input {...getInputProps()} />
                <img src={inbox} alt="Inbox icon" style={{ marginTop: '15px', marginBottom: '15px' }} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '380px',
                }}>
                    <Typography fontWeight={400} fontSize='16px' lineHeight='24px' textAlign='center'>
                        {isDragActive ? 'Drop the files here...' : 'Click or drag file to this area to upload'}
                    </Typography>
                    <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c' marginTop={1}>
                        Support for a single or bulk upload.
                    </Typography>
                    <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c' marginTop={1} maxWidth={300}>
                        JPG, JPEG, PNG, GIF or MP4 (30mb max) are supported.
                    </Typography>
                    <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c' marginTop={1.5}>
                        Max image dimensions are 16000x16000.
                    </Typography>
                    <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c'>
                        Max file size is 30MB.
                    </Typography>
                </Box>
            </Box>

            {uploadedFiles.length > 0 && (
                <List sx={{ width: "100%", maxWidth: "395px", bgcolor: "background.paper" }}>
                    {uploadedFiles.map((file) => (
                        <ListItem
                            key={file.fileName}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Stack direction="row" alignItems="center" gap={1}>
                                <img src={PaperClip} alt="PaperClip" />
                                <Typography color={file.fileSize > 5 * 1024 * 1024 ? "red" : "black"}>{file.fileName}</Typography>
                            </Stack>
                            <IconButton edge="end" onClick={() => removeFile(file.fileName)}>
                                <img src={DeleteOutlined} alt="Delete Icon" />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
}
