import { Box, Button, Chip, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import close from '../../assets/close.png';
import qrExample from '../../assets/qrExample.png';

export function RecruitmentConfiguration() {
    const [displayModal, setDisplayModal] = useState(false);

    const handleModalOpen = () => {
        setDisplayModal(true);
    };

    const handleModalClose = () => {
        setDisplayModal(false);
    };
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '556.5px',
            height: '813px',
            bgcolor: 'white',
            borderRadius: '4px',
            border: `1px solid ${grey[300]}`,
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: '54px',
                borderBottom: `1px solid ${grey[300]}`,
            }}>
                <Typography fontWeight={500} fontSize={16} lineHeight='28px' color='#262626' p={2}>
                    Research configuration
                </Typography>
            </Box>

            {/** Demographic questions */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '516.5px',
                height: 'auto',
                border: `1px solid ${grey[300]}`,
                borderRadius: '4px',
                mt: 2,
                ml: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    p: 2,
                }}>
                    <Typography fontWeight={500} fontSize={16} lineHeight='28px' color='#262626'>
                        A. Backlinks
                    </Typography>
                    <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#8C8C8C' mb={2}>
                        Please use @id parameters to transmit respondents ID’s into your system
                    </Typography>
                    <LinkInput label="Link for disqualified interviews" defaultValue="www.useremotion.com/" />
                    <LinkInput label="Link for overquota interviews" defaultValue="www.useremotion.com/" />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    p: 2,
                }}>
                    <Typography fontWeight={500} fontSize={16} lineHeight='28px' color='#262626'>
                        B. Research’s link to share
                    </Typography>
                    <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#8C8C8C' mb={2}>
                        Third-party invitation system should substitude (your respondent id here) parameter with individual respondent ID.
                    </Typography>
                    <LinkInputQR label="Research URL" defaultValue="www.useremotion.com/" handleModalOpen={handleModalOpen} />
                    {displayModal && <QRModalGeneration handleClose={handleModalClose} />}
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    pl: 2,
                    pb: 2,
                }}>
                    <Typography fontWeight={500} fontSize={16} lineHeight='28px' color='#262626'>
                        C. Research’s parameters to save
                    </Typography>
                    <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#8C8C8C' mb={2}>
                        Please specify parameters that you want to save (comma separated keys)
                    </Typography>
                    <ChipInput />
                </Box>
            </Box>
        </Box>
    )
}


interface LinkInputProps {
    label: string;
    defaultValue: string;
}

const LinkInput: React.FC<LinkInputProps> = ({ label, defaultValue }) => {
    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "gray", mb: 1 }}
            >
                {label}
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                value={defaultValue}
                // onChange={handleUrlChange}
                placeholder="www.example.com"
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            position="start"
                            sx={{
                                bgcolor: "#f5f5f5", // Fondo gris claro
                                padding: "8px 12px",
                                borderRight: "1px solid #ccc",
                            }}
                        >
                            <Typography variant="body2" sx={{ color: "#000" }}>
                                https://
                            </Typography>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        padding: 0,
                        "& fieldset": {
                            borderColor: "#ccc", // Borde gris claro
                        },
                    },
                    "& .MuiInputBase-input": {
                        padding: "8px 12px",
                    },
                }}
            />
        </Box>
    );
};

interface LinkInputProps {
    label: string;
    defaultValue: string;
    handleModalOpen?: () => void;
}

const LinkInputQR: React.FC<LinkInputProps> = ({ label, defaultValue, handleModalOpen }) => {
    const [url, setUrl] = useState(defaultValue);

    // Función para copiar la URL al portapapeles
    const handleCopy = () => {
        navigator.clipboard.writeText(`https://${url}`);
        alert("URL copiada al portapapeles!");
    };

    // Función para manejar cambios en la URL
    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    return (
        <Box sx={{ width: '100%', mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "gray", mb: 1 }}>
                {label}
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                value={url}
                onChange={handleUrlChange}
                placeholder="www.example.com"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    padding: "8px 12px",
                                    borderRight: "1px solid #ccc",
                                }}
                            >
                                <Typography variant="body2" sx={{ color: "#000" }}>
                                    https://
                                </Typography>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleCopy}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        padding: 0,
                        "& fieldset": {
                            borderColor: "#ccc", // Borde gris claro
                        },
                    },
                    "& .MuiInputBase-input": {
                        padding: "8px 12px",
                        color: "blue", // Texto en azul
                    },
                }}
            />

            {/* Botones de acción adicionales */}
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ bgcolor: "#1e3a8a", '&:hover': { bgcolor: "#1a2f6b" } }}
                    endIcon={<OpenInNewIcon />}
                    onClick={() => window.open(`https://${url}`, "_blank")}
                >
                    <Typography textTransform='initial'>Link Preview</Typography>
                </Button>
                <Button
                    variant="contained"
                    endIcon={<QrCodeIcon />}
                    onClick={handleModalOpen}
                >
                    <Typography textTransform='initial'>Generate QR</Typography>
                </Button>
            </Box>
        </Box>
    );

};


const ChipInput: React.FC = () => {
    const [chips, setChips] = useState<string[]>(["Parameters", "Separated", "With", "Comma", "Keys"]);

    // Función para manejar la eliminación de un chip
    const handleDelete = (chipToDelete: string) => {
        setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
    };

    return (
        <Box sx={{ width: "468px", display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }}>
            {chips.map((chip, index) => (
                <Chip
                    key={index}
                    label={chip}
                    onDelete={() => handleDelete(chip)}
                    sx={{ bgcolor: "#e0f7fa", borderRadius: "6px", fontSize: "12px", fontWeight: 400, color: '#262626' }}
                />
            ))}
        </Box>
    );
};

interface QRModalGenerationProps {
    handleClose: () => void;
}

const QRModalGeneration: React.FC<QRModalGenerationProps> = ({ handleClose }) => {
    return (
        <Stack sx={{
            position: 'absolute',
            zIndex: 10,
            top: '0px',
            bottom: '0px',
            right: '0px',
            left: '0px',
            bgcolor: 'rgba(128, 128, 128, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box sx={{
                width: '402px',
                height: '563x',
                border: `1px solid ${grey[300]}`,
                borderRadius: '4px',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'white',
            }}>
                {/** Title */}
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    borderBottom: `1px solid ${grey[300]}`,
                }}>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        p: 1.5,
                        justifyContent: 'space-between',
                    }}>
                        <Typography fontSize={16} fontWeight={500} lineHeight='24px' color='#262626'>Research link QR Code</Typography>
                        <Button onClick={handleClose} variant='text' sx={{ p: 0, m: 0, width: 'auto' }}>
                            <img src={close} alt="close" style={{ width: '14px' }} />
                        </Button>
                    </Box>
                </Box>
                
                {/** QR Image */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '507px',
                }}>
                    <img src={qrExample} alt="qrExample" style={{ width: '273px', height: '275px' }} />
                </Box>
                
                {/** Image Footer */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    height: '72px',
                    bgcolor: '#e9f0fc',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        pl: 3,
                    }}>
                    <Typography fontSize={14} fontWeight={500} lineHeight='24px' color='#262626'>This is your Public QR Code</Typography>
                    <Typography fontSize={12} fontWeight={400} lineHeight='24px' color='#8C8C8C'>Please, download and print in your documents to get responses</Typography>
                    </Box>
                </Box>
                
                {/** Download Button */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60px',
                }}>
                    <Button variant='contained' sx={{ width: '382px', bgcolor: '#252BE6' }}>
                        <Typography fontSize={14} fontWeight={500} lineHeight='24px' color='white' textTransform='initial'>Download QR Code</Typography>
                    </Button>
                </Box>
            </Box>
        </Stack>
    )
}