import { useEffect, useRef } from 'react';

export interface HeatZone {
  x: number;
  y: number;
  radius: number;
}

export const HeatMapLayer = ({
  heatZones,
}: {
  heatZones: HeatZone[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = 800;
        canvas.height = 475; // Limitar a 475 de altura
        ctx.clearRect(0, 0, 800, 475);

        ctx.fillStyle = 'rgba(0, 0, 255, 0.35)';
        ctx.fillRect(0, 0, 800, 475);

        ctx.globalCompositeOperation = 'lighter';

        heatZones.forEach((zone) => {
          // Limitar las coordenadas y el radio para mantenerse dentro del área visible
          const x = Math.max(zone.radius, Math.min(zone.x, 800 - zone.radius));
          const y = Math.max(zone.radius, Math.min(zone.y, 475 - zone.radius));
          const radius = Math.min(zone.radius, Math.min(800 - x, 475 - y));

          // Crear el gradiente
          const gradient = ctx.createRadialGradient(
            x,
            y,
            radius * 0.1,
            x,
            y,
            radius
          );

          gradient.addColorStop(0, 'rgba(255, 0, 0, 0.9)');
          gradient.addColorStop(0.2, 'rgba(255, 165, 0, 0.8)');
          gradient.addColorStop(0.4, 'rgba(255, 255, 0, 0.7)');
          gradient.addColorStop(0.6, 'rgba(0, 255, 0, 0.6)');
          gradient.addColorStop(0.8, 'rgba(0, 0, 255, 0.5)');
          gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');

          // Dibujar la zona de calor
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = gradient;
          ctx.fill();
        });

        ctx.globalCompositeOperation = 'source-over';
      }
    }
  }, [heatZones]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 800,
        height: 475, // Limitar a 475 de altura
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
