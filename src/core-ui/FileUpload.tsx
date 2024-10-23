import { Box, Typography, List, ListItem, IconButton, Stack } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { grey } from '@mui/material/colors';
import inbox from '../assets/researchForm3/Inbox.png';
import PaperClip from '../assets/researchForm3/PaperClip.png';
import DeleteOutlined from '../assets/researchForm3/DeleteOutlined.png';
import DeleteOutlinedRed from '../assets/researchForm3/DeleteOutlinedRed.png';

interface FileUploadProps {
    title: string;
    accept: { [key: string]: string[] };
    maxSize: number;
    onUpload: (files: File[]) => void;
    uploadedFiles: File[];
    removeFile: (file: File) => void;
}

export default function FileUpload({ title, accept, maxSize, onUpload, uploadedFiles, removeFile }: FileUploadProps) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onUpload,
        accept,
        maxSize,
    });

    return (
        <Box width='395px'>
            <Typography fontWeight={700} fontSize='20px' lineHeight='22px' color='#565656'>
                {title || 'Title'}
            </Typography>
            <Typography fontWeight={400} fontSize='14px' lineHeight='22px' color='#8c8c8c' mt={2}>
                Please, upload the images or video for this prediction.
            </Typography>

            <Box
                {...getRootProps()}
                sx={{
                    border: `1px solid ${grey[300]}`,
                    width: '395px',
                    height: '238px',
                    mt: 2,
                    textAlign: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? grey[100] : 'transparent',
                }}
            >
                <input {...getInputProps()} />
                <img src={inbox} alt="Inbox icon" style={{ marginTop: '15px', marginBottom: '15px' }} />
                <Typography fontWeight={400} fontSize='16px' lineHeight='24px' textAlign='center'>
                    {isDragActive ? 'Drop the files here...' : 'Click or drag file to this area to upload'}
                </Typography>
                <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c' marginTop={1}>
                    Support for a single or bulk upload.
                </Typography>
                <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c' marginTop={1}>
                    JPG, JPEG, PNG, GIF or MP4 (30mb max) are supported.
                </Typography>
                <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c' marginTop={1.5}>
                    Max image dimensions are 16000x16000.
                </Typography>
                <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c'>
                    Max file size is 30MB.
                </Typography>
            </Box>

            {uploadedFiles.length > 0 && (
                <List sx={{ width: '100%', maxWidth: '395px', bgcolor: 'background.paper' }}>
                    {uploadedFiles.map((file) => (
                        <ListItem key={file.name} sx={{
                            width: '100%', maxWidth: '395px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Stack sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                                <img src={PaperClip} alt="PaperClip" />
                                <Typography color={file.size > 5 * 1024 * 1024 ? 'red' : 'black'} sx={{ wordBreak: 'break-all' }}>
                                    {file.name}
                                </Typography>
                            </Stack>
                            <IconButton edge="end" onClick={() => removeFile(file)}>
                                <img src={file.size > 5 * 1024 * 1024 ? DeleteOutlinedRed : DeleteOutlined} alt="Delete Icon" />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
}
