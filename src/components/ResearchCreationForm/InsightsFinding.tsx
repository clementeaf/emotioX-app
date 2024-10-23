import { Box, Typography } from '@mui/material';
import { useResearchStore } from '../../store/useResearchStore';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { grey } from '@mui/material/colors';
import blueInbox from '../../assets/researchForm3/blueIn.png';

export default function InsightsFinding({ title }: { title: string }) {
    const { addUploadedFiles } = useResearchStore();
    const onDrop = useCallback((acceptedFiles: File[]) => {
        addUploadedFiles(acceptedFiles);
    }, [addUploadedFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
            'video/mp4': ['.mp4'],
        },
        maxSize: 30 * 1024 * 1024, // 30 MB
    });
    return (
        <Box width='395px'>
         <Typography fontWeight={700} fontSize='20px' lineHeight='22px' color='#565656' alignSelf='flex-start'>
                {title || 'Title'}
            </Typography>
            <Typography fontWeight={400} fontSize='14px' lineHeight='22px' color='#8c8c8c' mt={2} alignSelf='flex-start'>
                Please, upload the text for this sentiment analysis.
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
                <img src={blueInbox} alt="Inbox icon" style={{ marginTop: '15px', marginBottom: '15px' }} />
                <Typography fontWeight={400} fontSize='16px' lineHeight='24px' textAlign='center'>
                    {isDragActive ? 'Drop the files here...' : 'Click or drag file to this area to upload'}
                </Typography>
                <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c' marginTop={1}>
                    Support for a single or bulk upload.
                </Typography>
                <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c' marginTop={1}>
                    WORD, TXT or SCV supported.
                </Typography>
                <Typography fontWeight={400} fontSize='14px' lineHeight='22px' textAlign='center' color='#8c8c8c'>
                    Max file size is 5MB.
                </Typography>
            </Box>
        </Box>
    )
}
