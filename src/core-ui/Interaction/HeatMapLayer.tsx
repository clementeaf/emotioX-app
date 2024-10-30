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
        canvas.height = 704;
        ctx.clearRect(0, 0, 800, 704);

        ctx.fillStyle = 'rgba(0, 0, 255, 0.35)';
        ctx.fillRect(0, 0, 800, 704);

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
  }, [heatZones]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 800,
        height: 475,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
