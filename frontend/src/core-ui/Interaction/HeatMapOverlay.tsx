import { useRef, useState, useEffect } from 'react';
import heatExample from '../../assets/heatExample.png';
import { HeatMapLayer, HeatZone } from './HeatMapLayer';
import { RectangleLayer, RectZone } from './RectangleLayer';
import { Box, List, ListItem, Typography } from '@mui/material';

export const HeatMapOverlay = () => {
  const heatZonesRef = useRef<HeatZone[]>([]);
  const containerWidth = 800;
  const containerHeight = 704;
  const [rectangles, setRectangles] = useState<RectZone[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Inicializar zonas de calor
  if (heatZonesRef.current.length === 0) {
    const numZones = 10;
    const zones = Array.from({ length: numZones }, () => ({
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      radius: 50 + Math.random() * 50,
    }));

    heatZonesRef.current = zones;
  }

  // Agregar una línea de registro
  const addLogEntry = (log: string) => {
    setLogs((prev) => [...prev, log]);
  };

  // Desplazar la vista hacia el último registro agregado
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        overflow: 'hidden',
      }}
    >
      <img
        src={heatExample}
        alt="Fondo con zonas de calor"
        style={{
          position: 'absolute',
          top: -115,
          left: 0,
          width: containerWidth,
          height: containerHeight,
          objectFit: 'contain',
          zIndex: 0,
        }}
      />
      <HeatMapLayer heatZones={heatZonesRef.current} />
      <RectangleLayer
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        rectangles={rectangles}
        setRectangles={setRectangles}
        heatZones={heatZonesRef.current}
        addLogEntry={addLogEntry}
      />

      {/* Mostrar registros de intersección */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          maxHeight: 100,
          overflowY: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 1,
          padding: 1,
        }}
      >
        <List>
          {logs.map((log, index) => (
            <ListItem key={index} sx={{ padding: 0.5 }}>
              <Typography variant="body2">{log}</Typography>
            </ListItem>
          ))}
          <div ref={bottomRef} /> {/* Punto de referencia para el desplazamiento */}
        </List>
      </Box>
    </Box>
  );
};
