import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';

// Datos para el gráfico de barras con colores específicos para cada emoción
const data = [
  { name: 'Feliz', value: 6, color: '#66bb6a' },
  { name: 'Satisfecho', value: 9, color: '#66bb6a' },
  { name: 'Confiado', value: 9, color: '#66bb6a' },
  { name: 'Valorado', value: 4, color: '#81c784' },
  { name: 'Cuidado', value: 4, color: '#81c784' },
  { name: 'Seguro', value: 9, color: '#4caf50' },
  { name: 'Enfocado', value: 9, color: '#4caf50' },
  { name: 'Indulgente', value: 3, color: '#388e3c' },
  { name: 'Estimulado', value: 7, color: '#388e3c' },
  { name: 'Exploratorio', value: 7, color: '#2e7d32' },
  { name: 'Interesado', value: 7, color: '#2e7d32' },
  { name: 'Enérgico', value: 8, color: '#1b5e20' },
  { name: 'Descontento', value: 8, color: '#f44336' },
  { name: 'Frustrado', value: 10, color: '#e53935' },
  { name: 'Irritado', value: 10, color: '#d32f2f' },
  { name: 'Decepción', value: 3, color: '#c62828' },
  { name: 'Estresado', value: 3, color: '#b71c1c' },
  { name: 'Infeliz', value: 2, color: '#b71c1c' },
  { name: 'Desatendido', value: 2, color: '#b71c1c' },
  { name: 'Apresurado', value: 7, color: '#b71c1c' },
];

// Componente de etiqueta personalizada para XAxis
const CustomXAxisTick = ({ x, y, payload }: { x: number; y: number; payload: { value: string } }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={1} 
        textAnchor="end" 
        fontSize={12}
        transform="rotate(-90)" 
      >
        {payload.value}
      </text>
    </g>
  );
};

export const EmotionalStatesChart = () => {
  return (
    <Box 
      sx={{ 
        p: 2, 
        width: '600px',
        height: '388px',
        border: '1px solid #e0e0e0', borderRadius: 2, 
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
      <Typography sx={{ color: '#8C8C8C', mb: 1, fontWeight: 400, fontSize: 14 }}>
        Emotional states
      </Typography>

      <Typography sx={{ color: '#262626', mb: 1, fontWeight: 700, fontSize: 20 }}>
        70.85% Positive
      </Typography>
      </Box>

      <ResponsiveContainer width={660} height={400}>
        <BarChart 
          data={data} 
          margin={{ top: 30, right: 90, left: -40, bottom: 120 }} 
        >
          {/* Solo una línea horizontal en el medio */}
          <CartesianGrid 
            horizontal={true} 
            vertical={false} 
            stroke="lightgray" 
            strokeWidth={1} 
            horizontalPoints={[150]} // Ajustar el punto para la línea en el medio
          />
          <XAxis 
            dataKey="name" 
            tick={(props) => <CustomXAxisTick {...props} />} 
            interval={0} 
            tickLine={false}
            stroke='lightgray'
          />
          <YAxis 
            domain={[0, 10]} 
            tickLine={false} 
            axisLine={false} // Ocultar el eje vertical
            ticks={[5]} // Solo un tick en la mitad
            tick={{ fill: 'lightgray' }} // Hacer transparente el texto del tick
          />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar 
            dataKey="value" 
            barSize={15} 
            radius={[8, 8, 8, 8]} 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList dataKey="value" position="top" formatter={(value: unknown) => `${value}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
