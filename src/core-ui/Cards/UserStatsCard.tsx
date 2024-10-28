import { Box, Typography, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Datos para el gráfico de líneas
const lineData = [
  { day: 'Mon', value: 10 },
  { day: 'Tue', value: 15 },
  { day: 'Wed', value: 8 },
  { day: 'Thu', value: 12 },
  { day: 'Fri', value: 18 },
  { day: 'Sat', value: 10 },
];

// Componente para cada métrica
const MetricBox = ({ label, value }: { label: string; value: number }) => (
  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="body2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="h5" fontWeight="bold">
      {value}
    </Typography>
  </Box>
);

// Componente principal
export const UserStatsCard = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        bgcolor: '#fff',
        width: 380,
        height: 461,
      }}
    >
      {/* Métricas */}
      <MetricBox label="Overquota interviews" value={43} />
      <Divider />
      <MetricBox label="Disqualified interviews" value={365} />
      <Divider />
      <MetricBox label="Complete interviews" value={1297} />
      <Divider sx={{ my: 2 }} />

      {/* Gráfico de líneas */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={lineData}>
          {/* Asegurar que todos los días se muestren y haya espacio en los extremos */}
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            interval={0}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{ borderRadius: 8, borderColor: '#e0e0e0' }}
            formatter={(value: number) => [`Users' ID`, value]}
            labelStyle={{ color: '#6c757d' }}
          />
          <Line type="monotone" dataKey="value" stroke="#3A86FF" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default UserStatsCard;
