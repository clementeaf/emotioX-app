import { Box, Typography, Divider, Stack } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import EventIcon from '@mui/icons-material/Event';

// Datos del gráfico de barras apiladas
const data = [
  { name: 'Day 1', route1: 10, route2: 20, route3: 5 },
  { name: 'Day 2', route1: 15, route2: 25, route3: 8 },
  { name: 'Day 3', route1: 12, route2: 22, route3: 6 },
  { name: 'Day 4', route1: 10, route2: 20, route3: 5 },
  { name: 'Day 5', route1: 14, route2: 24, route3: 7 },
  { name: 'Day 6', route1: 8, route2: 18, route3: 4 },
  { name: 'Day 7', route1: 11, route2: 21, route3: 5 },
  { name: 'Day 8', route1: 9, route2: 19, route3: 6 },
  { name: 'Day 9', route1: 13, route2: 23, route3: 7 },
  { name: 'Day 10', route1: 7, route2: 17, route3: 4 },
  { name: 'Day 11', route1: 10, route2: 20, route3: 5 },
  { name: 'Day 12', route1: 14, route2: 24, route3: 7 },
  { name: 'Day 13', route1: 9, route2: 19, route3: 6 },
  { name: 'Day 14', route1: 12, route2: 22, route3: 8 },
  { name: 'Day 15', route1: 8, route2: 18, route3: 4 },
];

// Componente principal
export const UserDistributionCard = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        bgcolor: '#fff',
        width: 360,
        height: 457,
      }}
    >
      {/* Encabezado */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            Distribution of users
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Routing by ID
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 700, color: '#40A9FF', fontSize: 20, mt: 1 }}>
          1297
        </Typography>
      </Box>

      {/* Gráfico de barras apiladas */}
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="route1" stackId="a" fill="#D0E1FD" />
          <Bar dataKey="route2" stackId="a" fill="#3A86FF" />
          <Bar dataKey="route3" stackId="a" fill="#000" />
        </BarChart>
      </ResponsiveContainer>

      {/* Leyenda */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', gap: 2.5, mt: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 12, height: 12, bgcolor: '#D0E1FD', borderRadius: 1 }} />
          <Typography variant="body2">Route 1</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 12, height: 12, bgcolor: '#3A86FF', borderRadius: 1 }} />
          <Typography variant="body2">Route 2</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 12, height: 12, bgcolor: '#000', borderRadius: 1 }} />
          <Typography variant="body2">Route 3</Typography>
        </Stack>
      </Box>

      {/* Información de Best Assignment Day y Slowest Day */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2.5 }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 40,
            borderRadius: '100%',
            bgcolor: '#F0F0F0',
        }}>
            <EventIcon sx={{ color: '#6c757d' }} />
        </Box>
        <Box ml={2}>
          <Typography variant="body2" fontWeight={600}>
            Best assignment day
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Wednesday, 2:00 AM
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', textAlign: 'right' }}>
          <Typography variant="body1" fontWeight={600}>
            158
          </Typography>
          <Typography variant="body2" color="textSecondary">
            12%
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 40,
            borderRadius: '100%',
            bgcolor: '#F0F0F0',
        }}>
            <EventIcon sx={{ color: '#6c757d' }} />
        </Box>

        <Box ml={2}>
          <Typography variant="body2" fontWeight={600}>
            Slowest day
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Friday, 6:00 AM
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', textAlign: 'right' }}>
          <Typography variant="body1" fontWeight={600}>
            16
          </Typography>
          <Typography variant="body2" color="textSecondary">
            1.4%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDistributionCard;
