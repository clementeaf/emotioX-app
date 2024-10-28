import React, { useState } from 'react';
import { Box, Typography, Tab, Tabs } from '@mui/material';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', value: 50 },
  { name: 'Feb', value: 60 },
  { name: 'Mar', value: 70 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 83.62 },
  { name: 'Jun', value: 75 },
  { name: 'Jul', value: 65 },
  { name: 'Aug', value: 71.89 },
];

// Tooltip personalizado sin línea vertical
const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: { value?: number }[] }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: '#fff',
          color: '#1e3a8a',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: 3,
          fontWeight: 'bold',
        }}
      >
        <Typography variant="body2">{`${payload[0].value}`}</Typography>
      </Box>
    );
  }
  return null;
};

export default function CardWithChart() {
  const [activeTab, setActiveTab] = useState(0);

  // Manejar el cambio de pestañas
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        width: '368.42px',
        height: '367px',
        background: 'linear-gradient(135deg, #252BE6 0%, #25A5E6 100%)',
        borderRadius: '4px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        overflow: 'hidden',
      }}
    >
      {/* Pestañas */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, ml: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: '#24E2E6', height: '3px' } }}
          sx={{
            '& .MuiTab-root': { minWidth: 'auto', color: '#B3E5FC', },
            '& .Mui-selected': { color: '#24E2E6' },
          }}
        >
          <Tab label={<Typography fontSize={14} fontWeight={500} lineHeight='22px' textTransform='initial'>Today</Typography>} />
          <Tab label={<Typography fontSize={14} fontWeight={500} lineHeight='22px' textTransform='initial'>Week</Typography>} />
          <Tab label={<Typography fontSize={14} fontWeight={500} lineHeight='22px' textTransform='initial'>Month</Typography>} />
        </Tabs>
      </Box>

      {/* Información principal */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '0 16px' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1 }}>
          71,89
          <span style={{ fontSize: '16px', marginLeft: '8px' }}>📈</span>
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', opacity: 0.8 }}>
          CPV Estimation
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Customer Perceived Value
        </Typography>
      </Box>

      {/* Gráfico */}
      <Box sx={{ flexGrow: 1, mt: 1, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            {/* Gradiente debajo de la línea */}
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#24E2E6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#252BE6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip
              content={<CustomTooltip active={undefined} payload={undefined} />}
              cursor={false} // Elimina la línea vertical
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#fff"
              fill="url(#colorGradient)"
              strokeWidth={2}
              dot={false} // Sin puntos en la línea
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
