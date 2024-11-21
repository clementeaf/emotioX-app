import { Box, Typography } from '@mui/material';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, TooltipProps, CartesianGrid } from 'recharts';

// Datos de ejemplo
export const dummyData = [
  { time: '00', benefit: 14.6, attractiveness: 12.4 },
  { time: '03', benefit: 20.0, attractiveness: 18.5 },
  { time: '06', benefit: 36.0, attractiveness: 30.5 },
  { time: '09', benefit: 46.78, attractiveness: 44.35 },
  { time: '12', benefit: 32.9, attractiveness: 28.4 },
  { time: '15', benefit: 24.5, attractiveness: 22.9 },
  { time: '18', benefit: 28.6, attractiveness: 26.8 },
  { time: '21', benefit: 30.0, attractiveness: 28.3 },
  { time: '23', benefit: 25.7, attractiveness: 23.9 },
];

// Tooltip personalizado para mostrar información de los puntos
const CustomDotTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        p: 1,
        boxShadow: 3,
      }}>
        <Typography sx={{ fontSize: '12px', color: 'gray' }}>
          {`Time: ${payload[0].payload.time}:00`}
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#007aff' }}>
          Benefit: {payload[0].value}
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#ff0000' }}>
          Attractiveness: {payload[1].value}
        </Typography>
      </Box>
    );
  }
  return null;
};

// Componente principal del gráfico
export default function DotChart({ data }: { data?: unknown[] | undefined }) {
  return (
    <Box sx={{ width: '100%', maxWidth: '720px', height: '400px', padding: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data || dummyData}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          {/* Líneas horizontales */}
          <CartesianGrid stroke="#e0e0e0" vertical={false} /> 

          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fontWeight: 500, fill: '#7e7e7e' }}
          />
          <YAxis
            domain={[0, 50]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fontWeight: 500, fill: '#7e7e7e' }}
            label={{
              value: 'Product Perceived Value',
              angle: -90,
              position: 'insideLeft',
              dy: 60,
              dx: 10,
              style: { fontSize: 14, fontWeight: 500, fill: '#7e7e7e' },
            }}
          />
          <RechartsTooltip content={<CustomDotTooltip />} cursor={false} />
          <Line
            type="monotone"
            dataKey="benefit"
            stroke="#007aff"
            strokeWidth={2}
            dot={{ r: 4, stroke: '#007aff', strokeWidth: 2 }}
            activeDot={{ r: 6, stroke: '#007aff', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="attractiveness"
            stroke="#ff0000"
            strokeWidth={2}
            dot={{ r: 4, stroke: '#ff0000', strokeWidth: 2 }}
            activeDot={{ r: 6, stroke: '#ff0000', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
