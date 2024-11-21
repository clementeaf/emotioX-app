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
                    width: '395px',
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
