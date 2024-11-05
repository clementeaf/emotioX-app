import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer, ReferenceLine } from 'recharts';

// Datos de ejemplo
const data = [
  { objeto: 'Object 1', Attribute1: -21, Attribute2: -73 },
  { objeto: 'Object 2', Attribute1: 96, Attribute2: 14 },
  { objeto: 'Object 3', Attribute1: 43, Attribute2: 28 },
  { objeto: 'Object 4', Attribute1: 79, Attribute2: 58 },
  { objeto: 'Object 5', Attribute1: 98, Attribute2: 56 },
];

// Componente principal
export const HorizontalBarChartComponent = () => {
  return (
    <Box sx={{ p: 3, maxWidth: '845px' }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        IAT - Comparing objects
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Priming display time set in 400 ms
      </Typography>

      {/* Gráfico de barras horizontales */}
      <ResponsiveContainer width={810} height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: -10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            domain={[-100, 100]} 
            orientation="top" // Posicionar el eje X en la parte superior
          />
          <YAxis dataKey="objeto" type="category" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend verticalAlign="top" align="center" wrapperStyle={{ top: -10 }} />

          {/* Líneas de referencia */}
          <ReferenceLine x={-80} stroke="green" strokeDasharray="3 3" />
          <ReferenceLine x={-20} stroke="red" strokeDasharray="3 3" />
          <ReferenceLine x={50} stroke="red" strokeDasharray="3 3" />
          <ReferenceLine x={80} stroke="green" strokeDasharray="3 3" />

          {/* Barras */}
          <Bar dataKey="Attribute1" fill="#1E1EFF" barSize={20}>
            <LabelList dataKey="Attribute1" position="insideRight" formatter={(value: number) => `${value}%`} />
          </Bar>
          <Bar dataKey="Attribute2" fill="#4ABFFF" barSize={20}>
            <LabelList dataKey="Attribute2" position="insideRight" formatter={(value: number) => `${value}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default HorizontalBarChartComponent;
