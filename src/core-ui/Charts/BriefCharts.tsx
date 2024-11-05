import { Box, Grid, Typography, Chip } from '@mui/material';
import { BarChart, Bar, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Datos de ejemplo para los gráficos
const dataBars = [
  { value: 40 }, { value: 50 }, { value: 30 }, { value: 60 }, { value: 70 },
  { value: 50 }, { value: 60 }, { value: 70 }, { value: 50 }, { value: 60 },
  { value: 30 }, { value: 40 }, { value: 50 }, { value: 70 }, { value: 50 },
];
const dataLine = [
  { value: 50 }, { value: 45 }, { value: 42 }, { value: 38 }, { value: 35 },
  { value: 33 }, { value: 34 }, { value: 37 }, { value: 39 }, { value: 38 },
  { value: 36 }, { value: 34 }, { value: 32 }, { value: 30 }, { value: 28 },
];
const dataYellowBars = [
  { value: 50 }, { value: 60 }, { value: 55 }, { value: 65 }, { value: 70 },
  { value: 60 }, { value: 55 }, { value: 45 }, { value: 55 }, { value: 60 },
  { value: 65 }, { value: 70 }, { value: 50 }, { value: 60 }, { value: 55 },
];
const dataBlueLine = [
  { value: 30 }, { value: 35 }, { value: 32 }, { value: 37 }, { value: 40 },
  { value: 42 }, { value: 41 }, { value: 43 }, { value: 40 }, { value: 39 },
  { value: 38 }, { value: 36 }, { value: 35 }, { value: 33 }, { value: 30 },
];

// Estilo para el cambio de métrica
const metricStyle = {
  positive: { color: '#4CAF50', backgroundColor: '#E8F5E9' },
  negative: { color: '#F44336', backgroundColor: '#FDECEA' },
  average: { color: '#FF9800', backgroundColor: '#FFF3E0' },
  project: { color: '#3A86FF', backgroundColor: '#E3F2FD' },
};

// Componente de tarjeta
const MetricCard = ({ title, value, change, changeLabel, chartType, data, color }: {
  title: string;
  value: number | string;
  change: keyof typeof metricStyle;
  changeLabel: string;
  chartType: 'line' | 'bar';
  data: Array<{ value: number }>;
  color: string;
}) => (
  <Box
    sx={{
      p: 2,
      borderRadius: 2,
      border: '1px solid #e0e0e0',
      bgcolor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 200,
    }}
  >
    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
      {title}
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 20, mr: 1, color: '#262626' }}>
        {value}
      </Typography>
      <Chip
        label={changeLabel}
        size="small"
        sx={{
          ...metricStyle[change],
          height: 24,
          fontSize: 12,
          fontWeight: 'bold',
        }}
      />
    </Box>

    {/* Gráfico con degradado si es de línea */}
    <Box sx={{ flexGrow: 1 }}>
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'bar' ? (
          <BarChart data={data}>
            <Bar dataKey="value" fill={color} />
          </BarChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`colorGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#colorGradient-${color})`}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </Box>
  </Box>
);

// Componente principal
const DashboardMetrics = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Visual Attractiveness"
          value={45.4}
          change="positive"
          changeLabel="▲ 4,12%"
          chartType="bar"
          data={dataBars}
          color="#3A86FF"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Benefit Association"
          value={38.2}
          change="negative"
          changeLabel="▼ 2.15%"
          chartType="line"
          data={dataLine}
          color="#FF4D4F"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Winner option’s rank position"
          value="8/17"
          change="average"
          changeLabel="— Average"
          chartType="bar"
          data={dataYellowBars}
          color="#FFC107"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Client’s benchmark"
          value="Update now"
          change="project"
          changeLabel="▲ Project 2024"
          chartType="line"
          data={dataBlueLine}
          color="#3A86FF"
        />
      </Grid>
    </Grid>
  );
};

export default DashboardMetrics;
