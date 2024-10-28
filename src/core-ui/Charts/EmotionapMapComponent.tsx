import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

// Colores para las emociones
const COLORS = ['#58D68D', '#F4D03F', '#BB8FCE', '#F1948A'];

// Datos de ejemplo (se pueden modificar para otros casos)
const chartsData = [
  {
    title: '25%',
    data: [
      { name: 'Delighted', value: 5, color: COLORS[0] },
      { name: 'Surprised', value: 5, color: COLORS[1] },
      { name: 'Anxious', value: 5, color: COLORS[2] },
      { name: 'Disgusted', value: 5, color: COLORS[3] },
    ],
  },
  {
    title: '50%',
    data: [
      { name: 'Happy', value: 5, color: COLORS[0] },
      { name: 'Excited', value: 5, color: COLORS[1] },
      { name: 'Stressed', value: 5, color: COLORS[2] },
      { name: 'Bored', value: 5, color: COLORS[3] },
    ],
  },
  {
    title: '75%',
    data: [
      { name: 'Pleased', value: 5, color: COLORS[0] },
      { name: 'Interested', value: 5, color: COLORS[1] },
      { name: 'Annoyed', value: 5, color: COLORS[2] },
      { name: 'Tired', value: 5, color: COLORS[3] },
    ],
  },
  {
    title: '100%',
    data: [
      { name: 'Satisfied', value: 5, color: COLORS[0] },
      { name: 'Amused', value: 5, color: COLORS[1] },
      { name: 'Frustrated', value: 5, color: COLORS[2] },
      { name: 'Disinterested', value: 5, color: COLORS[3] },
    ],
  },
];

// Componente de mapa de emociones
interface EmotionData {
  name: string;
  value: number;
  color: string;
}

const EmotionMap = ({ title, data }: { title: string; data: EmotionData[] }) => {
  return (
    <Box sx={{ width: 200, textAlign: 'center', mx: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={30}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry: { color: string | undefined; }, index: unknown) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="top"
            layout="vertical"
            align="right"
            formatter={(value) => <span style={{ fontSize: 12 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

// Componente global
export const EmotionMapsComponent = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Mapas de emociones
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {chartsData.map((chart, index) => (
          <EmotionMap key={index} title={chart.title} data={chart.data} />
        ))}
      </Box>
    </Box>
  );
};

