import { useEffect, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import heatExample from '../../assets/heatExample.png';

const HeatMapLayer = ({
  containerWidth,
  containerHeight,
  heatZones,
}: {
  containerWidth: number;
  containerHeight: number;
  heatZones: { x: number; y: number; radius: number }[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Establecer el tamaño del canvas
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        ctx.clearRect(0, 0, containerWidth, containerHeight);

        // Capa azul de fondo
        ctx.fillStyle = 'rgba(0, 0, 255, 0.35)';
        ctx.fillRect(0, 0, containerWidth, containerHeight);

        // Dibujar las zonas de calor
        ctx.globalCompositeOperation = 'lighter';
        heatZones.forEach((zone) => {
          const gradient = ctx.createRadialGradient(
            zone.x,
            zone.y,
            zone.radius * 0.1,
            zone.x,
            zone.y,
            zone.radius
          );

          gradient.addColorStop(0, 'rgba(255, 0, 0, 0.9)');
          gradient.addColorStop(0.2, 'rgba(255, 165, 0, 0.8)');
          gradient.addColorStop(0.4, 'rgba(255, 255, 0, 0.7)');
          gradient.addColorStop(0.6, 'rgba(0, 255, 0, 0.6)');
          gradient.addColorStop(0.8, 'rgba(0, 0, 255, 0.5)');
          gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');

          ctx.beginPath();
          ctx.arc(zone.x, zone.y, zone.radius, 0, 2 * Math.PI);
          ctx.fillStyle = gradient;
          ctx.fill();
        });

        ctx.globalCompositeOperation = 'source-over';
      }
    }
  }, [containerWidth, containerHeight, heatZones]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 115,
        width: 800,
        height: 475,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

const RectangleLayer = ({
  heatZones,
}: {
  heatZones: { x: number; y: number; radius: number; intensity: number }[];
  containerWidth: number;
  containerHeight: number;
}) => {
  const rectSize = 80;

  return (
    <Stage width={800} height={475} style={{ position: 'absolute', zIndex: 3, top: 115 }}>
      <Layer>
        {heatZones.map((zone, index) => (
          <Rect
            key={index}
            x={zone.x - rectSize / 2}
            y={zone.y - rectSize / 2}
            width={rectSize}
            height={rectSize}
            fill="rgba(255, 255, 255, 0.3)"
            stroke="red"
            strokeWidth={1}
            opacity={0.5}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export const HeatMapOverlay = () => {
  const heatZonesRef = useRef<{ x: number; y: number; radius: number; intensity: number }[]>([]);
  const containerWidth = 800;
  const containerHeight = 704;

  // Generar zonas de calor solo la primera vez
  if (heatZonesRef.current.length === 0) {
    const numZones = 10;
    const zones = Array.from({ length: numZones }, () => ({
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      radius: 50 + Math.random() * 50,
      intensity: Math.random(),
    }));

    heatZonesRef.current = zones;
  }

  return (
    <div style={{ maxWidth: '800px', maxHeight: '780px', margin: '0 auto', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: containerWidth, height: containerHeight }}>
        <img
          src={heatExample}
          alt="Fondo con zonas de calor"
          style={{
            width: '800px',
            height: '704px',
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'contain',
            zIndex: 1,
          }}
        />

        <HeatMapLayer
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          heatZones={heatZonesRef.current}
        />

        <RectangleLayer
          heatZones={heatZonesRef.current}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        />
      </div>

      <div style={{ maxHeight: `${780 - containerHeight}px`, overflowY: 'auto', marginTop: '10px', color: '#000', zIndex: 4 }}>
        <h3>Información captada por los rectángulos:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Rectángulo</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Posición (x, y)</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Intensidad</th>
            </tr>
          </thead>
          <tbody>
            {heatZonesRef.current.map((zone, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{index + 1}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  ({Math.round(zone.x)}, {Math.round(zone.y)})
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{zone.intensity.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
