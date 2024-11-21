import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Datos de ejemplo para Satisfacción del Cliente
const data = [
  { name: 'Jan', Dissatisfied: 30, Satisfied: 40 },
  { name: 'Feb', Dissatisfied: 40, Satisfied: 50 },
  { name: 'Mar', Dissatisfied: 45, Satisfied: 55 },
  { name: 'Apr', Dissatisfied: 50, Satisfied: 60 },
  { name: 'May', Dissatisfied: 35, Satisfied: 65 },
  { name: 'Jun', Dissatisfied: 25, Satisfied: 70 }, // Último dato
];

// Leyenda personalizada
const CustomLegend = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2, gap: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{ width: 10, height: 10, backgroundColor: '#FF4D4F', borderRadius: '50%' }} />
      <Typography variant="body2" color="textSecondary">Dissatisfied</Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{ width: 10, height: 10, backgroundColor: '#52C41A', borderRadius: '50%' }} />
      <Typography variant="body2" color="textSecondary">Satisfied</Typography>
    </Box>
  </Box>
);

// Componente principal
export function CardNoAxisChart() {
  // Último índice del conjunto de datos
  const lastIndex = data.length - 1;

  // Función para renderizar el punto de la línea
  const renderDot = (dotProps: { index: number; cx: string | number | undefined; cy: string | number | undefined; }, color: string | undefined) => {
    if (dotProps.index === lastIndex) {
      return (
        <circle
          cx={dotProps.cx}
          cy={dotProps.cy}
          r={6}
          fill={color}
          stroke="#fff"
          strokeWidth={2}
        />
      );
    }
    return <></>; // Componente vacío si no es el último punto
  };

  return (
    <Box
      sx={{
        width: '363.42px',
        height: '455.66px',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fff',
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Encabezado */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#8C8C8C', lineHeight: '22px', mt: 0.5 }}>
            Customer Satisfaction
          </Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 20, color: '#262626', lineHeight: '28px' }}>
            CSAT 59,63
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 12, color: '#8C8C8C', lineHeight: '20px', width: '132px', textAlign: 'left' }}>
            How are feeling your customers when they interact with you?
          </Typography>
        </Box>
        {/* Menú de opciones */}
        <Tooltip title="More options">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Gráfico de Satisfacción del Cliente */}
      <ResponsiveContainer width="100%" height="60%">
        <LineChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Line
            type="monotone"
            dataKey="Dissatisfied"
            stroke="#FF4D4F"
            strokeWidth={2}
            dot={(dotProps) => renderDot(dotProps, '#FF4D4F')}
            strokeOpacity={0.8}
            style={{ filter: 'drop-shadow(0px 2px 5px rgba(255, 77, 79, 0.4))' }} // Sombra para línea roja
          />
          <Line
            type="monotone"
            dataKey="Satisfied"
            stroke="#52C41A"
            strokeWidth={2}
            dot={(dotProps) => renderDot(dotProps, '#52C41A')}
            strokeOpacity={0.8}
            style={{ filter: 'drop-shadow(0px 2px 5px rgba(82, 196, 26, 0.4))' }} // Sombra para línea verde
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Leyenda personalizada */}
      <CustomLegend />
    </Box>
  );
}
