import { Box, Typography, MenuItem, Select } from '@mui/material';
import { Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { useState } from 'react';

// Datos para el gráfico
const data = [
  { name: 'Jan', promoters: 40, neutrals: 30, detractors: 30, npsRatio: 10 },
  { name: 'Feb', promoters: 50, neutrals: 20, detractors: 30, npsRatio: 20 },
  { name: 'Mar', promoters: 55, neutrals: 25, detractors: 20, npsRatio: 35 },
  { name: 'Apr', promoters: 60, neutrals: 20, detractors: 20, npsRatio: 40 },
  { name: 'May', promoters: 65, neutrals: 15, detractors: 20, npsRatio: 45 },
  { name: 'Jun', promoters: 50, neutrals: 25, detractors: 25, npsRatio: 30 },
  { name: 'Jul', promoters: 45, neutrals: 35, detractors: 20, npsRatio: 25 },
  { name: 'Ago', promoters: 50, neutrals: 30, detractors: 20, npsRatio: 30 },
  { name: 'Sep', promoters: 55, neutrals: 25, detractors: 20, npsRatio: 35 },
  { name: 'Oct', promoters: 60, neutrals: 20, detractors: 20, npsRatio: 40 },
  { name: 'Nov', promoters: 65, neutrals: 15, detractors: 20, npsRatio: 45 },
  { name: 'Dec', promoters: 70, neutrals: 10, detractors: 20, npsRatio: 50 },
];

// Leyenda personalizada
const renderLegend = () => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
      <Box sx={{ width: 12, height: 12, bgcolor: 'blue', mr: 1 }} />
      <Typography variant="body2">NPS Ratio</Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
      <Box sx={{ width: 12, height: 12, bgcolor: '#a3c5a4', mr: 1 }} />
      <Typography variant="body2">Promoters</Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
      <Box sx={{ width: 12, height: 12, bgcolor: '#e7e7e7', mr: 1 }} />
      <Typography variant="body2">Neutrals</Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
      <Box sx={{ width: 12, height: 12, bgcolor: '#ff2121', mr: 1 }} />
      <Typography variant="body2">Detractors</Typography>
    </Box>
  </Box>
);

export const NPSChart = () => {
  const [year, setYear] = useState('Year');

  return (
    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'white', width: '800px', height: '509.11px' }}>
      {/* Encabezado con leyenda y selector */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        {renderLegend()}
        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: 100, height: 32 }}
        >
          <MenuItem value="Year">Year</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
        </Select>
      </Box>

      <ResponsiveContainer width={800} height={300}>
        <ComposedChart data={data} barGap={-5} margin={{ left: -60 }}>
          {/* Gráfico de barras apiladas con colores y bordes ajustados */}
          <Bar dataKey="detractors" stackId="a" fill="#ff2121" barSize={20} radius={[10, 10, 10, 10]} />
          <Bar dataKey="neutrals" stackId="a" fill="#e7e7e7" barSize={20} radius={[0, 0, 0, 0]} />
          <Bar dataKey="promoters" stackId="a" fill="#a3c5a4" barSize={20} radius={[10, 10, 10, 10]} />

          {/* Gráfico de área para la línea suavizada con degradado */}
          <defs>
            <linearGradient id="colorNPS" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="blue" stopOpacity={0.4} />
              <stop offset="95%" stopColor="blue" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="npsRatio"
            stroke="blue"
            strokeWidth={2}
            fill="url(#colorNPS)"
            animationDuration={1500}
          />

          {/* Mostrar nombres de los meses en el eje X */}
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={false} axisLine={false} tickLine={false} />

          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Pie de página con evolución de lealtad */}
      <Box sx={{ mt: 2, display: 'flex', textAlign: 'flex-start', gap: 10, borderTop: '1px solid #e0e0e0', pt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="body2">Loyalty’s Evolution</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" color="green" sx={{ fontWeight: 'bold', mr: 1 }}>
              +16%
            </Typography>
            <Typography variant="body2">Since last month</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 17 }}>
          <Typography sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            35% <span style={{ color: '#a3c5a4' }}>Promoters</span>
          </Typography>
          <Typography sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            26% <span style={{ color: '#ff2121' }}>Detractors</span>
          </Typography>
          <Typography sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            39% <span style={{ color: '#e7e7e7' }}>Neutrals</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
