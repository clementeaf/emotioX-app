import { Box, Typography } from '@mui/material';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Datos de ejemplo
const data = [
  { atributo: 'Atributo 1', A: 60, B: 30, C: 90 },
  { atributo: 'Atributo 2', A: 40, B: 60, C: 30 },
  { atributo: 'Atributo 3', A: 60, B: 50, C: 70 },
  { atributo: 'Atributo 4', A: 20, B: 80, C: 40 },
  { atributo: 'Atributo 5', A: 50, B: 30, C: 60 },
  { atributo: 'Atributo 6', A: 70, B: 40, C: 80 },
  { atributo: 'Atributo 7', A: 50, B: 90, C: 30 },
  { atributo: 'Atributo 8', A: 40, B: 70, C: 60 },
  { atributo: 'Atributo 9', A: 80, B: 20, C: 50 },
  { atributo: 'Atributo 10', A: 60, B: 50, C: 70 },
  { atributo: 'Atributo 11', A: 30, B: 40, C: 80 },
  { atributo: 'Atributo 12', A: 40, B: 60, C: 20 },
  { atributo: 'Atributo 13', A: 90, B: 30, C: 50 },
  { atributo: 'Atributo 14', A: 20, B: 70, C: 60 },
  { atributo: 'Atributo 15', A: 60, B: 50, C: 80 },
];

export const RadarChartComponent = () => {
  return (
    <Box sx={{ p: 3, width: 844, height: 889 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        IAT - Reaction Time Test
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Priming display time set in 400 ms
      </Typography>

      {/* Gráfico de Radar */}
      <ResponsiveContainer width={745} height={745}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="atributo" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />

          {/* Radar para el primer conjunto de datos */}
          <Radar
            name="Grupo A"
            dataKey="A"
            stroke="#1E90FF"
            fill="#1E90FF"
            fillOpacity={0.6}
            dot
          />
          {/* Radar para el segundo conjunto de datos */}
          <Radar
            name="Grupo B"
            dataKey="B"
            stroke="#20B2AA"
            fill="#20B2AA"
            fillOpacity={0.6}
            dot
          />
          {/* Radar para el tercer conjunto de datos */}
          <Radar
            name="Grupo C"
            dataKey="C"
            stroke="#8A2BE2"
            fill="#8A2BE2"
            fillOpacity={0.6}
            dot
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RadarChartComponent;
