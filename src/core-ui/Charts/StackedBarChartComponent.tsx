import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { atributo: 'Attribute 1', Target1: 35, Target2: 83 },
  { atributo: 'Attribute 2', Target1: 90, Target2: 85 },
  { atributo: 'Attribute 3', Target1: 63, Target2: 75 },
  { atributo: 'Attribute 4', Target1: 47, Target2: 99 },
  { atributo: 'Attribute 5', Target1: 56, Target2: 83 },
];

export const StackedBarChartComponent = () => {
  return (
    <Box sx={{ p: 3, maxWidth: '845px' }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        IAT - Comparing Attribute
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Priming display time set in 400 ms
      </Typography>

      {/* Gráfico de barras apiladas */}
      <ResponsiveContainer width={804} height={498}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="atributo" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 120]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend verticalAlign="top" align="center" wrapperStyle={{ top: -10 }} />

          {/* Líneas de referencia */}
          <ReferenceLine y={20} stroke="red" strokeWidth={2} />
          <ReferenceLine y={60} stroke="green" strokeWidth={2} />
          {/* <ReferenceLine y={100} stroke="blue" strokeWidth={2} /> */}

          {/* Barras */}
          <Bar dataKey="Target1" fill="#1E1EFF" barSize={60}>
            <LabelList dataKey="Target1" position="top" formatter={(value: number) => `${value}%`} />
          </Bar>
          <Bar dataKey="Target2" fill="#4ABFFF" barSize={60}>
            <LabelList dataKey="Target2" position="top" formatter={(value: number) => `${value}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

