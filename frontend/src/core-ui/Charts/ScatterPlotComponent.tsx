import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Box, Typography } from '@mui/material';

// Datos de ejemplo
const data = [
  { x: 55.2, y: 60.13, z: 100, name: 'LOA Opc 1 JUN Góndola', color: '#FF0000' },
  { x: 56.75, y: 43.25, z: 80, name: 'LOA Góndola', color: '#3A86FF' },
  { x: 62.84, y: 37.52, z: 90, name: 'Kola Real Góndola', color: '#FFA500' },
  { x: 66.12, y: 33.88, z: 75, name: 'COOL Góndola', color: '#00CFFF' },
];

export const ScatterPlotComponent = () => {
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const chartWidth = 400; // Ajusta el ancho del gráfico
  const chartHeight = 400; // Ajusta la altura del gráfico

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 1,
        position: 'relative',
        height: 400,
        width: 400,
        backgroundColor: '#fff',
      }}
    >
      {/* Título */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Affordances & Signifiers' Benchmark
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={margin}>
          {/* Fondo con gradiente contenido dentro del área de gráficos */}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255, 0, 0, 0.3)" />
              <stop offset="33%" stopColor="rgba(255, 165, 0, 0.3)" />
              <stop offset="66%" stopColor="rgba(0, 255, 0, 0.3)" />
              <stop offset="100%" stopColor="rgba(0, 0, 255, 0.3)" />
            </linearGradient>

            {/* Definir un recorte para limitar el área de color */}
            <clipPath id="chartAreaClip">
              <rect
                x={margin.left}
                y={margin.top}
                width={chartWidth - margin.left - margin.right}
                height={chartHeight - margin.top - margin.bottom}
              />
            </clipPath>
          </defs>

          {/* Capa de color alineada con los ejes */}
          <rect
            x={margin.left}
            y={margin.top}
            width={chartWidth - margin.left - margin.right}
            height={chartHeight - margin.top - margin.bottom}
            fill="url(#colorGradient)"
            clipPath="url(#chartAreaClip)"
          />

          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            label={{ value: 'Percepción de beneficio (Solitario)', position: 'bottom', offset: -10 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            label={{ value: 'Costo de identificación (Góndola)', angle: -90, position: 'left' }}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend verticalAlign="top" align="right" height={36} />
          <ReferenceLine x={60} stroke="black" strokeDasharray="3 3" />
          <ReferenceLine y={40} stroke="black" strokeDasharray="3 3" />

          {/* Puntos de dispersión */}
          <Scatter
            name="Puntos de benchmark"
            data={data}
            fill="#8884d8"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};
