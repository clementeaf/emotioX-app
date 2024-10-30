import { useRef } from 'react';
import heatExample from '../../assets/heatExample.png';
import { HeatMapLayer, HeatZone } from './HeatMapLayer';
import { RectangleLayer } from './RectangleLayer';
import { Box } from '@mui/material';

export const HeatMapOverlay = () => {
  const heatZonesRef = useRef<HeatZone[]>([]);
  const containerWidth = 800;
  const containerHeight = 704;

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
      <RectangleLayer containerWidth={containerWidth} containerHeight={containerHeight} />
    </Box>
  );
};
