import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import FilterListIcon from '@mui/icons-material/FilterList';

// Datos de ejemplo
const data = [
    { option: 'Option 2', values: [1, 4, 2, 3, 1, 2], mean: 2.4, secs: 76 },
    { option: 'Option 5', values: [1, 2, 4, 5, 2, 1], mean: 2.8, secs: 76 },
    { option: 'Option 3', values: [2, 3, 5, 4, 1, 2], mean: 3.1, secs: 76 },
    { option: 'Option 4', values: [2, 4, 3, 5, 2, 1], mean: 3.4, secs: 76 },
    { option: 'Option 6', values: [1, 3, 4, 5, 2, 3], mean: 3.7, secs: 76 },
    { option: 'Option 1', values: [3, 4, 2, 3, 1, 2], mean: 3.8, secs: 76 },
];

// Componente del histograma de barras
const HistogramBar = ({ values }: { values: number[] }) => (
    <ResponsiveContainer width="100%" height={40}>
        <BarChart data={values.map((value, index) => ({ index: index + 1, value }))} margin={{ left: -20 }}>
            <XAxis dataKey="index" hide />
            <Bar dataKey="value" fill="#9DA9D7" barSize={55} />
        </BarChart>
    </ResponsiveContainer>
);

// Componente de la tabla principal
export const OptionsTable = () => {
    return (
        <Box sx={{
            width: 844,
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            border: `1px solid ${'#e0e0e0'}`,
            height: 'auto',
            py: 2,
            gap: 2,
        }}>
            <Box sx={{
                width: 800,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}>
                <Typography width={350} fontWeight={500} fontSize={16} lineHeight="24px" color="#262626" mr={2} sx={{ display: 'flex', alignItems: 'center', gap: 6.3 }}>
                    {Array(6).fill(0).map((_, idx) => <span key={idx}>{idx + 1}</span>)}
                </Typography>
                <Typography fontWeight={500} fontSize={16} lineHeight="24px" color="#262626" mr={2}>
                    Mean
                </Typography>
                <Typography fontWeight={500} fontSize={16} lineHeight="24px" color="#262626" mr={10}>
                    Secs
                </Typography>
            </Box>
            {data.map((row, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 800, height: 84, boxShadow: 'none', border: '1px solid #e0e0e0', bgcolor: 'white', borderRadius: 2, }}>
                    <Typography width={250} fontWeight={500} fontSize={12} lineHeight="20px" color="#262626">
                        {row.option}
                    </Typography>


                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 350,
                        mt: 2,
                    }}>
                        <HistogramBar values={row.values} />
                        {/* Números debajo de las barras */}
                        <Box width={350} mt={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 5 }}>
                            {row.values.map((_, i) => (
                                <Typography key={i} fontWeight={500} fontSize={10} color="#262626" ml={1.8}>
                                    {i + 1}
                                </Typography>
                            ))}
                        </Box>
                    </Box>


                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 2,
                        width: 150,
                        height: 34,
                    }}>
                        <Typography fontWeight={500} fontSize={12} color="#262626">
                            {row.mean.toFixed(1)}
                        </Typography>
                        <Typography fontWeight={500} fontSize={12} color="#9DA9D7" sx={{ mr: 1 }}>
                            {row.secs}s
                        </Typography>
                        <FilterListIcon fontSize="small" />
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default OptionsTable;
