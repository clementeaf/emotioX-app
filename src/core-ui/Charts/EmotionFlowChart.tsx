import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Box, Typography } from '@mui/material';

// Datos de ejemplo
const data = [
  { ms: 0, Deleite: 1.2, Sorpresa: 0.5, Escepticismo: 2.0, Tristeza: 0.8, Temor: 0.5, Disgusto: 1.0 },
  { ms: 500, Deleite: 2.4, Sorpresa: 1.5, Escepticismo: 4.6, Tristeza: 4.1, Temor: 1.3, Disgusto: 3.7 },
  { ms: 1000, Deleite: 3.0, Sorpresa: 2.2, Escepticismo: 3.5, Tristeza: 2.9, Temor: 2.1, Disgusto: 2.8 },
  { ms: 2000, Deleite: 4.0, Sorpresa: 2.5, Escepticismo: 4.0, Tristeza: 3.1, Temor: 3.5, Disgusto: 3.3 },
  { ms: 3000, Deleite: 2.8, Sorpresa: 1.8, Escepticismo: 3.1, Tristeza: 2.4, Temor: 2.5, Disgusto: 2.6 },
  { ms: 4000, Deleite: 2.4, Sorpresa: 1.5, Escepticismo: 4.6, Tristeza: 4.1, Temor: 1.3, Disgusto: 3.7 },
  { ms: 5000, Deleite: 1.2, Sorpresa: 0.8, Escepticismo: 2.0, Tristeza: 1.0, Temor: 1.1, Disgusto: 1.8 },
];

// Colores de las emociones
const COLORS = {
  Deleite: '#85D262',
  Sorpresa: '#FFE156',
  Escepticismo: '#80CFFF',
  Tristeza: '#B79DDD',
  Temor: '#D88DB5',
  Disgusto: '#E08B7F',
};

const EmotionFlowChart = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
      {/* Título del gráfico */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Flujo de emociones
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          {/* Cuadrícula */}
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* Ejes */}
          <XAxis
            dataKey="ms"
            label={{ value: 'Tiempo (ms)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            label={{ value: '%', angle: -90, position: 'insideLeft' }}
          />

          {/* Línea de referencia */}
          <ReferenceLine y={3} stroke="red" strokeDasharray="3 3" />

          {/* Tooltip personalizado */}
          <Tooltip
            contentStyle={{ backgroundColor: '#000', color: '#fff' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value, name) => [`${value}%`, name]}
            labelFormatter={(label) => `Tiempo: ${label} ms`}
          />

          {/* Leyenda */}
          <Legend verticalAlign="top" align="center" wrapperStyle={{ top: -20 }} />

          {/* Áreas de las emociones */}
          {Object.keys(COLORS).map((key) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={COLORS[key as keyof typeof COLORS]}
              fill={COLORS[key as keyof typeof COLORS]}
              fillOpacity={0.3}
              activeDot={{ r: 5 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default EmotionFlowChart;
