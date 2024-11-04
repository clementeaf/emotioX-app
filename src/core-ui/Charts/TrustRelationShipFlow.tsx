import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Label
} from 'recharts';

// Datos de ejemplo para NPS y NEV
const data = [
  { time: '00', NPS: 5000, NEV: 8000 },
  { time: '03', NPS: 6000, NEV: 8500 },
  { time: '06', NPS: 7500, NEV: 7000 },
  { time: '09', NPS: 9000, NEV: 6500 },
  { time: '12', NPS: 11000, NEV: 6000 },
  { time: '15', NPS: 10500, NEV: 7000 },
  { time: '18', NPS: 8000, NEV: 9000 },
  { time: '21', NPS: 6500, NEV: 10000 },
  { time: '23', NPS: 4000, NEV: 11500 },
];

// Tooltip personalizado
interface Payload {
  value: number;
}

const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: Payload[]; label: string }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: '#fff',
          color: '#333',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: 3,
          fontWeight: 'bold',
        }}
      >
        <Typography variant="body2" sx={{ color: '#888' }}>{`${label}:00`}</Typography>
        <Typography variant="body2" sx={{ color: '#1e90ff' }}>NPS: {payload[0].value.toFixed(2)}</Typography>
        <Typography variant="body2" sx={{ color: '#8a2be2' }}>NEV: {payload[1].value.toFixed(2)}</Typography>
      </Box>
    );
  }
  return null;
};

// Función para formatear las etiquetas del eje Y
const formatYAxis = (tick: number) => {
  if (tick >= 1000) {
    return `${tick / 1000}k`;
  }
  return tick;
};

export default function TrustRelationshipFlow() {
  return (
    <Box
      sx={{
        minWidth: '650px',
        width: '745px',
        height: '367px',
        borderRadius: '4px',
        padding: '16px',
        backgroundColor: '#fff',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Título del gráfico */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            Trust Relationship Flow
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
            <Typography variant="body2" sx={{ color: '#888' }}>
                Customer's perception about service in time
            </Typography>
            {/* Selector de tiempo */}
                <FormControl size="small">
                <Select defaultValue="Last 24 hours" sx={{ minWidth: 120 }}>
                    <MenuItem value="Last 24 hours">Last 24 hours</MenuItem>
                    <MenuItem value="Last week">Last week</MenuItem>
                    <MenuItem value="Last month">Last month</MenuItem>
                </Select>
                </FormControl>
          </Box>
      </Box>

      {/* Gráfico de líneas */}
      <Box sx={{ mt: 2, width: '660px', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" />
            <YAxis tickFormatter={(tick: number) => formatYAxis(tick).toString()}>
                <Label
                value="Numbers of responses"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle', fill: '#888', fontSize: '14px' }}
                />
            </YAxis>
            <Tooltip content={<CustomTooltip active={false} payload={[]} label="" />} cursor={false} /> {/* Elimina la línea vertical */}
            <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: 20 }}
            />
            <Line
                type="monotone"
                dataKey="NPS"
                stroke="#1e90ff"
                strokeWidth={2}
                dot={{ fill: '#fff', stroke: '#1e90ff', strokeWidth: 2, r: 4 }}
                activeDot={{ fill: '#fff', stroke: '#1e90ff', strokeWidth: 2, r: 6 }}
            />
            <Line
                type="monotone"
                dataKey="NEV"
                stroke="#8a2be2"
                strokeWidth={2}
                dot={{ fill: '#fff', stroke: '#8a2be2', strokeWidth: 2, r: 4 }}
                activeDot={{ fill: '#fff', stroke: '#8a2be2', strokeWidth: 2, r: 6 }}
            />
            </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
