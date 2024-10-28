import { Box, Typography, Stack, Avatar } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Componente para mostrar una barra de progreso personalizada
const CustomLinearProgress = ({ value, color }: { value: number, color: string }) => (
    <Box sx={{ width: '100%', mt: 0.5 }}>
        <Box
            sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: '#f5f5f5',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: `${value}%`,
                    height: '100%',
                    bgcolor: color,
                    borderRadius: 5,
                }}
            />
        </Box>
    </Box>
);

export const CSATQuestion = () => {
    return (
        <Box
            sx={{
                borderRadius: '2px',
                width: '100%',
                height: '252px',
                maxWidth: '600px',
            }}
        >
            {/* Sección de las barras de progreso */}
            <Stack spacing={2} gap={1} borderTop="1px solid #e0e0e0" borderRight="1px solid #e0e0e0" borderLeft="1px solid #e0e0e0" p={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                    <Typography sx={{ fontWeight: 'lightgray' }}>
                        Promoters
                    </Typography>
                    <Box width={400} display='flex' alignItems='center' gap={1}>
                        <CustomLinearProgress value={70} color="green" />
                        <Typography sx={{ fontWeight: 'lightgray' }}>
                            70%
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                    <Typography sx={{ fontWeight: 'lightgray' }}>
                        Neutrals
                    </Typography>
                    <Box width={400} display='flex' alignItems='center' gap={1}>
                        <CustomLinearProgress value={10} color="gray" />
                        <Typography sx={{ fontWeight: 'lightgray' }}>
                            10%
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                    <Typography sx={{ fontWeight: 'lightgray' }}>
                        Detractors
                    </Typography>
                    <Box width={400} display='flex' alignItems='center' gap={1}>
                        <CustomLinearProgress value={20} color="red" />
                        <Typography sx={{ fontWeight: 'lightgray' }}>
                            20%
                        </Typography>
                    </Box>
                </Stack>
            </Stack>

            {/* Sección de la pregunta */}
            <Stack direction="row" spacing={1} alignItems="center" border="1px solid #e0e0e0" p={2} gap={1}>
                <Avatar sx={{ bgcolor: 'blue', width: 40, height: 40 }}>
                    <CheckCircleOutlineIcon sx={{ color: 'lime' }} />
                </Avatar>
                <Box>
                    <Typography sx={{ fontWeight: '700', color: '#262626', fontSize: '16px', lineHeight: '24px' }}>
                        CSAT’s question
                    </Typography>
                    <Typography sx={{ fontWeight: '400', color: '#8C8C8C', fontSize: '14px', lineHeight: '22px' }}>
                        How would you rate your overall satisfaction level with [company]?
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};
