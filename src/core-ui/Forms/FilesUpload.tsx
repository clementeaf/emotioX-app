import React, { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';

type FileUploadProps = unknown

export const FilesUpload: React.FC<FileUploadProps> = () => {
    const [files, setFiles] = useState<File[]>([]);

    // Manejo de carga de archivos
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = e.target.files;
        if (newFiles) {
            setFiles([...files, ...Array.from(newFiles)]);
        }
    };

    // Manejo de arrastre de archivos
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles) {
            setFiles([...files, ...Array.from(droppedFiles)]);
        }
    };

    // Eliminación de archivo
    const handleDeleteFile = (fileToDelete: File) => {
        setFiles(files.filter(file => file !== fileToDelete));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
            {/* Área de arrastre y carga de archivos */}
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    width: 300,
                    height: 250,
                    border: '1px dashed #D0D5DD',
                    cursor: 'pointer',
                    gap: 1,
                    backgroundColor: '#F9FAFB',
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*,video/*';
                    fileInput.multiple = true;
                    fileInput.addEventListener('change', (e: Event) => {
                        const target = e.target as HTMLInputElement;
                        handleFileUpload({
                            target,
                            nativeEvent: e,
                            currentTarget: target,
                            bubbles: false,
                            cancelable: false,
                            defaultPrevented: false,
                            eventPhase: 0,
                            isTrusted: false,
                            preventDefault: function (): void {
                                throw new Error('Function not implemented.');
                            },
                            isDefaultPrevented: function (): boolean {
                                throw new Error('Function not implemented.');
                            },
                            stopPropagation: function (): void {
                                throw new Error('Function not implemented.');
                            },
                            isPropagationStopped: function (): boolean {
                                throw new Error('Function not implemented.');
                            },
                            persist: function (): void {
                                throw new Error('Function not implemented.');
                            },
                            timeStamp: 0,
                            type: ''
                        });
                    });
                    fileInput.click();
                }}
            >
                <CloudUploadIcon sx={{ color: '#252BE6', fontSize: 40 }} />
                <Typography variant="body1" fontWeight="bold" textAlign="center">
                    Click or drag file to this area to upload
                </Typography>
                <Typography variant="body2" color="textSecondary" textAlign="center">
                    Support for a single or bulk upload. JPG, JPEG, PNG or GIF supported.
                    Max image dimensions are 16000x16000. Max file size is 5MB.
                </Typography>
            </Paper>

            {/* Lista de archivos cargados */}
            <Box sx={{ width: '350px' }}>
                {files.map((file, index) => (
                    <Box
                        key={index}
                        sx={{ py: 0, my: 0, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}
                    >
                        <InsertDriveFileIcon color={file.name.endsWith('.png') ? 'error' : 'inherit'} />
                        <Typography>{file.name}</Typography>
                        <Button onClick={() => handleDeleteFile(file)}>
                            <DeleteIcon color="error" />
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
